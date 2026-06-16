import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./EditMember.css";
function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState({
    name: "",
    email: "",
    regNo: "",
    membership: ""
  });

  useEffect(() => {
    fetchMember();
  }, []);

  const fetchMember = async () => {
    try {
      const res = await API.get("/members");

      const found = res.data.find(
        (m) => m._id === id
      );

      if (found) {
        setMember(found);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/members/${id}`,
        member
      );

      alert("✅ Member Updated");

      navigate("/members");

    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="edit-member-container">

    <div className="edit-header">
      <h1>✏ Edit Member</h1>
      <p>Manage member profile information</p>
    </div>

    <div className="edit-layout">

      {/* LEFT SIDE */}

      <div className="profile-card">

        <div className="avatar">
          👤
        </div>

        <h2>{member.name}</h2>

        <span className="badge">
          {member.membership}
        </span>

        <div className="profile-info">
          <p>📚 Books Borrowed: 5</p>
          <p>📅 Joined: 2026</p>
          <p>⭐ Active Member</p>
        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={member.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={member.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Registration No</label>
              <input
                type="text"
                name="regNo"
                value={member.regNo}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Membership</label>
              <select
                name="membership"
                value={member.membership}
                onChange={handleChange}
              >
                <option>Standard</option>
                <option>Premium</option>
              </select>
            </div>

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
              className="update-btn"
            >
              Update Member
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>
);
}
export default EditMember;