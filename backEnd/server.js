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
  const { name, email, password } = req.body;
  console.log(name, email, password);
  // Check if the user already exists
  const userExists = users.find((user) => user.name === name);
  if (userExists) {
    return res.status(400).send("User already exists");
  }

  // Store name and password (without hashing)
  users.push({ name, password });
  res.status(201).send("User registered successfully");
});

// Login route
app.post("/login", (req, res) => {
  const { name, password } = req.body;

  // Find the user by name and check password
  const user = users.find(
    (user) => user.name === name && user.password === password
  );
  console.log(name, password);
  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(400).send("Invalid name or password");
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
