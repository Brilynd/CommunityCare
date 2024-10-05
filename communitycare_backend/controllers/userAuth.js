const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
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