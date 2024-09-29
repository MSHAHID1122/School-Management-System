// src/components/SignUp.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.module.css"; // Assuming you're using the same CSS file for both pages

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error messages

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", formData);

    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(formData);
          return response.text().then((errorMessage) => {
            setError(errorMessage); // Set error message to state
            throw new Error(errorMessage); // Throw an error to be caught below
          });
        }
        console.log("Sign-up successful!");
        setFormData({ name: "", email: "", password: "" });
        setError(""); // Clear error if sign-up is successful
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An unexpected error occurred."); // Generic error message
      });
  };
  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
