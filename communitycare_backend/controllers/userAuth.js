require('dotenv').config(); // Load environment variables from .env
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt'); // For password hashing

// Get MongoDB URI and DB name from environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const collectionName = process.env.MONGODB_COLLECTION;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Add user function
 async function addUser(username, password) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection(collectionName);

    // Check if the username already exists
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      console.log("Username already exists.");
      return false;
    }

    // Hash the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store the new user's data in MongoDB
    const result = await usersCollection.insertOne({
      username,
      password: hashedPassword
    });

    console.log("User added successfully:", result);
    return true;
  } catch (error) {
    console.error("Error adding user:", error);
  } finally {
    await client.close();
  }
}

// Login user function
 async function loginUser(username, password) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection(collectionName);

    // Find the user by username
    const user = await usersCollection.findOne({ username });
    if (!user) {
      console.log("User not found.");
      return false;
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      console.log("Login successful!");
      return true;
    } else {
      console.log("Incorrect password.");
      return false;
    }
  } catch (error) {
    console.error("Error logging in user:", error);
  } finally {
    await client.close();
  }
}
module.exports = { addUser, loginUser };
// Example usage:
// addUser('testUser', 'password123').then(result => console.log(result));
// loginUser('testUser', 'password123').then(result => console.log(result));

