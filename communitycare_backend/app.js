// Import dependencies
const express = require('express');
const cors = require('cors');

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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
