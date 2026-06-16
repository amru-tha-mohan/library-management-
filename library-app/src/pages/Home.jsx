import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Floating Books */}
      <div className="floating b1">📚</div>
      <div className="floating b2">📖</div>
      <div className="floating b3">📕</div>
      <div className="floating b4">📘</div>
      <div className="floating b5">📗</div>

      {/* Stars */}
      <div className="star s1"></div>
      <div className="star s2"></div>
      <div className="star s3"></div>
      <div className="star s4"></div>
      <div className="star s5"></div>

      {/* Main Card */}
      <div className="hero-card">
        <h1 className="title">📚 BookVerse Library</h1>

        <h2 className="subtitle">
          Knowledge Beyond Shelves
        </h2>

        <p>
          Explore, Borrow and Discover thousands of books
          in one intelligent digital library.
        </p>

        <button
          className="hero-btn"
          onClick={() => navigate("/welcome")}
        >
          🚀 Explore Me
        </button>
      </div>
    </div>
  );
}

export default Home;