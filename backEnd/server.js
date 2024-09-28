const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for users
const users = [];

// Signup route (without password hashing)
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).send("User already exists");
  }

  // Store username and password (without hashing)
  users.push({ username, password });
  res.status(201).send("User registered successfully");
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Find the user by username and check password
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.status(200).send("Login successful");
  } else {
    res.status(400).send("Invalid username or password");
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
