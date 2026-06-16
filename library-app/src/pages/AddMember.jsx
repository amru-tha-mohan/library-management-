import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./AddMember.css";

function AddMember() {
  const navigate = useNavigate();

  const [member, setMember] = useState({
    name: "",
    email: "",
    regNo: "",
    membership: "Standard"
  });

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/members", member);

      alert("✅ Member Added Successfully");
      navigate("/members");

    } catch (err) {
      console.log(err);
      alert("Failed to add member");
    }
  };

  return (
    <div className="add-member-container">

      <div className="add-member-card">

        <h1>👤 Add New Member</h1>
        <p className="subtitle">
          Register a new library member
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter member name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Registration Number</label>
            <input
              type="text"
              name="regNo"
              placeholder="Enter registration number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Membership Type</label>
            <select
              name="membership"
              onChange={handleChange}
            >
              <option value="Standard">
                Standard
              </option>

              <option value="Premium">
                Premium
              </option>
            </select>
          </div>

          <div className="button-group">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/members")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Add Member
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddMember;