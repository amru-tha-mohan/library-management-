function EditProfile() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>👤 Edit Profile</h1>

      <input placeholder="Name" />
      <br /><br />

      <input placeholder="Email" />
      <br /><br />

      <button
        onClick={() =>
          alert("✅ Profile Updated Successfully")
        }
      >
        Save Changes
      </button>
    </div>
  );
}

export default EditProfile;