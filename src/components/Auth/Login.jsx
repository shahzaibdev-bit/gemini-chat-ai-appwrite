// src/components/Auth/Login.jsx
import React, { useState } from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Assuming you have a CSS file for styling

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await authService.login({ email, password });
      const user = await authService.getCurrentUser();
      dispatch(login({ userData: user }));
      navigate("/home"); // Redirect to home page on successful login
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-form-container">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
}

export default Login;
