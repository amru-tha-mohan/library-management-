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
          onClick={() => navigate("/login")}
        >
          <span>👨‍💼</span>
          <h2>Admin Login</h2>
          <p>Manage books, members and reports</p>
        </div>

        <div
          className="card"
          onClick={() => navigate("/register")}
        >
          <span>📝</span>
          <h2>Register</h2>
          <p>Create your library account</p>
        </div>

      </div>

    </div>
  );
}

export default Welcome;