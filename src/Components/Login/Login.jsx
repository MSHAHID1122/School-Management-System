import React, { useState } from "react";
import "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use fetch to make a POST request
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indicate that we're sending JSON data
      },
      body: JSON.stringify({
        name,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid name or password");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        alert("login successful"); // Display the login response or success message
        navigate("/");
      })
      .catch((error) => {
        alert(error.message); // Show the error message if login fails
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      <Link to="/signup">
        <p>Create an account</p>
      </Link>
    </form>
  );
}

export default Login;
