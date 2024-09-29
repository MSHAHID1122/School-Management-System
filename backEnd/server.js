const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, // You should hash passwords in a real-world app
});

// Create the User Model
const User = mongoose.model("User", userSchema);

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  User.findOne({ name })
    .then((userExists) => {
      if (userExists) {
        return res.status(400).send("User already exists"); // Return here to prevent further execution
      }

      // Create a new user and save to MongoDB
      const newUser = new User({ name, email, password });
      return newUser.save();
    })
    .then(() => {
      return res.status(201).send("User registered successfully"); // Return here as well
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send("An error occurred during signup"); // Return here as well
    });
});
// Login route
app.post("/login", (req, res) => {
  const { name, password } = req.body;

  // Find the user by name and password
  User.findOne({ name, password })
    .then((user) => {
      if (user) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(400).send("Invalid name or password");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred during login");
    });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
