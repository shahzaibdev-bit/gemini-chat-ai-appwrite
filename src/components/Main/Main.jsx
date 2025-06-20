// ✅ Main.jsx – updated to include credit in bottom-info
import React, { useContext, useState, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context.jsx";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../../store/authSlice";
import authService from "../../appwrite/auth.js";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(Context);

  const {
    onSent = () => {},
    recentPrompt = "",
    showResult = false,
    loading = false,
    resultData = "",
    setInput = () => {},
    input = "",
    fetchUserPrompts = () => {},
  } = context || {};

  const { userData } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logoutAction());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed: " + (error?.message || "Unknown error"));
    }
  };

  useEffect(() => {
    if (userData?.$id) {
      fetchUserPrompts(userData.$id);
    }
  }, [userData, fetchUserPrompts]);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <div className="user-menu" onClick={() => setShowDropdown((p) => !p)}>
          <img src={assets.gemini_icon} alt="User" />
          {showDropdown && (
            <div className="dropdown">
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, {userData?.name || "User"}</span>
              </p>
              <p>How can I help you today?</p>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              {input && (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="Send"
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may produce inaccurate information about people, places, or
            facts. It is not intended to give advice.
            <br />
            <span style={{ fontWeight: 600 }}>
              Made by Shahzaib&nbsp;(shahzaibdev-bit)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
