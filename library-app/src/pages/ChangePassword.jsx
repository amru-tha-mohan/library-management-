function ChangePassword() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>🔒 Change Password</h1>

      <input
        type="password"
        placeholder="New Password"
      />

      <br /><br />

      <button
        onClick={() =>
          alert("✅ Password Changed Successfully")
        }
      >
        Update Password
      </button>
    </div>
  );
}

export default ChangePassword;