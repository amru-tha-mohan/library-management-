import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">

      <h1>📚 Welcome to BookVerse</h1>
      <p>
        Your digital gateway to explore, borrow and manage books effortlessly.
      </p>

      <div className="cards">

  <div
    className="card"
    onClick={() =>
      navigate("/login", {
        state: { role: "Admin" },
      })
    }
  >
    <span>👨‍💼</span>
    <h2>Admin</h2>
    <p>Manage books, members and reports</p>
  </div>

  <div
    className="card"
    onClick={() =>
      navigate("/login", {
        state: { role: "Library Incharge" },
      })
    }
  >
    <span>📚</span>
    <h2>Library Incharge</h2>
    <p>Issue and return books efficiently</p>
  </div>

  <div
    className="card"
    onClick={() =>
      navigate("/login", {
        state: { role: "Teacher" },
      })
    }
  >
    <span>👩‍🏫</span>
    <h2>Teacher</h2>
    <p>Browse and borrow books</p>
  </div>

  <div
    className="card"
    onClick={() =>
      navigate("/login", {
        state: { role: "Student" },
      })
    }
  >
    <span>🎓</span>
    <h2>Student</h2>
    <p>Explore and reserve books</p>
  </div>

</div>
    </div>
  );
}

export default Welcome;