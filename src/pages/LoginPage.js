import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username, password }
      );

      console.log("Token here:", response.data.token);

      // Store token
      localStorage.setItem("token", response.data.token);
      login(response.data.token); // Set token

      // Redirect to home page after login

      navigate("/");
    } catch (err) {
      if (err.response) {
        // If the server responded with an error
        setError(err.response.data.message || "Invalid Credentials");
      } else if (err.request) {
        // If no response was received
        setError("No response from server");
      } else {
        // Any other errors (e.g., network errors)
        setError("An error occurred");
      }
    }
  };

  return (
    <div className="container-outer">
      <div className="login-container">
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
