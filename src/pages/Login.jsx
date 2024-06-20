import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseApiService from "../services/BaseApiService";
import { jwtDecode } from "jwt-decode";
import "./Login.css"; // Import your CSS file for Login styles

const apiService = new BaseApiService();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(`${apiService.baseURL}/accounts/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const decodedToken = jwtDecode(data.token);

      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(decodedToken));

      if (decodedToken.role === "Admin") {
        navigate("/admin/dashboard");
      } else if (decodedToken.role === "Mechanic") {
        // Corrected role check
        navigate("/mechanic/dashboard");
      } else {
        navigate("/");
      }
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
