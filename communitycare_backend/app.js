// Import dependencies
const express = require('express');
const cors = require('cors');
const userAuth = require('./controllers/userAuth')
// Initialize the app
const app = express();

// Enable CORS with default settings
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});
// Route to register a user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }
  
    const result = await userAuth.addUser(username, password);
    return res.status(result.success ? 201 : 400).json(result);
  });
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }
  
    const result = await userAuth.loginUser(username, password);
    return res.status(result.success ? 200 : 400).json(result);
  });
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
