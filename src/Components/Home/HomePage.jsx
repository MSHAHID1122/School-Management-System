// src/components/HomePage.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="homepage-container">
      <nav className="navbar">
        <h1 className="navbar-title">School Management System</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="content">
        <h2>Welcome to the School Management System</h2>
        <p>Manage students, courses, and more efficiently.</p>
      </div>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} School Management System</p>
      </footer>
    </div>
  );
};

export default HomePage;
