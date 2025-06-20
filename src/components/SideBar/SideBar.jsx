import React from "react";
import "./sideBar.css";
import { assets } from "../../assets/assets.js";
import { useState, useContext } from "react";
import { Context } from "../../context/Context.jsx";

function SideBar() {
  const [extended, setExtended] = useState(false);
  const { prevPrompt, onSent, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt); // ✅ FIXED: Properly called setRecentPrompt
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          onClick={() => setExtended(!extended)}
          src={assets.menu_icon}
          alt=""
        />

        <div onClick={newChat} className="newChat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {(prevPrompt || []).slice(0, 5).map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="" />
                <p>{item}</p> {/* ✅ FIXED: show prompt text directly */}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>setting</p> : null}
        </div>
      </div> */}
    </div>
  );
}

export default SideBar;
