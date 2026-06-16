import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import "./Members.css";

function Members() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchMembers = async () => {
    try {
      const res = await API.get("/members");
      setMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/members/${id}`);

      alert("✅ Member Deleted Successfully");

      fetchMembers();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      member.regNo
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="members-page">
      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ⬅ Back
      </button>

      <h1>👥 Library Members</h1>

      <button
        className="add-member-btn"
        onClick={() => navigate("/add-member")}
      >
        ➕ Add Member
      </button>

      <input
        type="text"
        placeholder="🔍 Search Member..."
        className="member-search"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="members-grid">
        {filteredMembers.length === 0 ? (
          <h3>No Members Found</h3>
        ) : (
          filteredMembers.map((member) => (
            <div
              className="member-card"
              key={member._id}
            >
              <h2>{member.name}</h2>

              <p>📧 {member.email}</p>

              <p>🆔 {member.regNo}</p>

              <p>
                📚 {member.membership}
              </p>

              <span
                className={
                  member.status === "Active"
                    ? "active"
                    : "inactive"
                }
              >
                {member.status}
              </span>

              <div className="member-actions">
                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(
                      `/edit-member/${member._id}`
                    )
                  }
                >
                  ✏ Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(member._id)
                  }
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Members;