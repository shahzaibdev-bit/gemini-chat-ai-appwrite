import React from "react";
import "./AuthOptions.css";
import { useNavigate } from "react-router-dom";

function AuthOptions() {
  const navigate = useNavigate();
  return (
    <div className="auth-options">
      <div className="auth-card">
        <h2>Welcome to Gemini</h2>
        <p>Please log in or create an account to continue.</p>
        <div className="auth-buttons">
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthOptions;
