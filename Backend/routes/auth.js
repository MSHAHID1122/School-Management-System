const express = require("express");
const router = express.Router();

let users = [];

// Signup route
router.post("/signup", (req, res) => {
  const { name, email, phone, password } = req.body;

  // Checking the user if it  already exists or not
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }

  // Store new user data
  const newUser = { name, email, phone, password };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully!" });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if user exists and password matches
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  res.status(200).json({ message: `Welcome back, ${user.name}!` });
});

module.exports = router;
