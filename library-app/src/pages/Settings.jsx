import { useState } from "react";
import "./Settings.css";
import { useNavigate } from "react-router-dom";
function Settings() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const [profile, setProfile] = useState({
    name: "Amrutha",
    email: "amrutha@gmail.com"
  });

  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleDarkMode = () => {
  setDarkMode(!darkMode);
  document.body.classList.toggle("dark");
};
  return (
    <div className="settings-page">

      <h1>⚙ Settings</h1>

      {/* Profile */}
      <div className="settings-card">
        <h3>👤 Profile Settings</h3>

        <button
  onClick={() => navigate("/edit-profile")}
  className="settings-btn"
>
                 Edit Profile
        </button>

        {showProfile && (
          <div style={{ marginTop: "15px" }}>
            <p><b>Name:</b> {profile.name}</p>
            <p><b>Email:</b> {profile.email}</p>
          </div>
        )}
      </div>

      {/* Dark Mode */}
      <div className="settings-card">
        <h3>🌙 Dark Mode</h3>

        <button
          onClick={toggleDarkMode}
          className="settings-btn"
        >
          {darkMode ? "Disable" : "Enable"}
        </button>
      </div>

      {/* Password */}
      <div className="settings-card">
        <h3>🔒 Change Password</h3>

        
          <button
  onClick={() => navigate("/change-password")}
  className="settings-btn"
>
  Update Password
</button>
        {showPassword && (
          <div style={{ marginTop: "15px" }}>
            <input
              type="password"
              placeholder="New Password"
            />
          </div>
        )}
      </div>

    </div>
  );
}

export default Settings;