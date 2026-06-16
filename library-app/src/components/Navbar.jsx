import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">📚 BookVerse</div>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>

        <NavLink to="/books" className={({ isActive }) => isActive ? "active" : ""}>
          Books
        </NavLink>

        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
          About
        </NavLink>

        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
          Contact
        </NavLink>
      </div>

      <div className="auth-buttons">
        <NavLink to="/login">
          <button>Login</button>
        </NavLink>

        <NavLink to="/register">
          <button className="register">Register</button>
        </NavLink>
      </div>

    </nav>
  );
}

export default Navbar;