const express = require("express");
const path = require("path");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend/public")));

// Our Routes
app.use("/api/auth", authRoutes);
// Serve HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/public", "Signup.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/public", "Login.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
