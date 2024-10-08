require("dotenv").config(); // Load environment variables from .env
const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcrypt"); // For password hashing
const { ObjectId } = require("mongodb"); // or from mongoose if you're using it
// Get MongoDB URI and DB name from environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const collectionName = process.env.MONGODB_COLLECTION;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tlsInsecure: true, // Only for testing, not for production
});


// Add user function
async function addUser(firstName, lastName,email,password,phoneNumber) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection(collectionName);

    // Check if the username already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      console.log("Email already exists.");
      return false;
    }

    // Hash the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store the new user's data in MongoDB
    const result = await usersCollection.insertOne({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    console.log("User added successfully:", result);
    return result.insertedId;
  } catch (error) {
    console.error("Error adding user:", error);
  } finally {
    await client.close();
  }
}

// Login user function
async function loginUser(username, password) {
  try {
    await client.connect(); // Connect to the MongoDB server
    console.log(dbName);
    const db = client.db(dbName);
    const usersCollection = db.collection(collectionName);

    console.log(`Fetching user with username: ${username}`);
    const user = await usersCollection.findOne({ username });

    if (!user) {
      console.log("User not found.");
      return false;
    }

    console.log("Comparing passwords...");
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      console.log("Login successful!");
      return user._id;
    } else {
      console.log("Incorrect password.");
      return false;
    }
  } catch (error) {
    console.error("Error logging in user:", error.message, error.stack);
  } finally {
    console.log("Closing database connection...");
    await client.close();
  }
}


async function addRequestHelp(
  userId,
  title,
  type,
  description,
  financialAssistance,
  latitude,
  longitude
) {
  await client.connect();
  const db = client.db(dbName);
  const requestsCollection = db.collection("requests");

  const request = {
    userId: new ObjectId(userId), // Store user ID
    title,
    type,
    description,
    financialAssistance,
    latitude,
    longitude
  };

  const result = await requestsCollection.insertOne(request);
  console.log("Request added successfully:", result);
  return result.insertedId;
}

// Fetch all requests
async function getAllRequests() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const requestsCollection = db.collection("requests"); // Ensure this matches your requests collection name

    // Fetch all requests
    const requests = await requestsCollection.find({}).toArray();
    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];
      const db = client.db(dbName);
      const requestsCollection = db.collection(collectionName);
      const user = await requestsCollection.findOne({ _id: request.userId });
      requests[i].user = user;
    }
    return requests;
  } catch (error) {
    console.error("Error fetching requests:", error);
  } finally {
    await client.close();
  }
}

module.exports = {
  addUser,
  loginUser,
  addRequestHelp,
  getAllRequests, // Export the new function
};
