import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [books, setBooks] = useState([]);
  const [membersData, setMembersData] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
const [borrowData, setBorrowData] = useState([]);

const fetchAnalytics = async () => {
  try {
    const res = await API.get("/borrow");

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyData = {};

    res.data.forEach((item) => {
      const date = new Date(item.dateTime);
      const month =
        monthNames[date.getMonth()];

      monthlyData[month] =
        (monthlyData[month] || 0) + 1;
    });

    const chartData =
      Object.keys(monthlyData).map(
        (month) => ({
          month,
          books:
            monthlyData[month],
        })
      );

    setBorrowData(chartData);
  } catch (err) {
    console.log(err);
  }
};
  const [stats, setStats] = useState({
    books: 0,
    members: 0,
    issued: 0,
    returned: 0,
    fine: 0,
  });
   useEffect(() => {
  fetchStats();
  fetchNotifications();
  fetchAnalytics();
}, []);

  const fetchStats = async () => {
    try {
      const booksRes = await API.get("/books");
      const membersRes = await API.get("/members");
      const borrowRes = await API.get("/borrow");
      const returnsRes = await API.get("/returns");

      setBooks(booksRes.data);
      setMembersData(membersRes.data);
      setIssuedBooks(borrowRes.data);

      const totalFine = returnsRes.data.reduce(
        (sum, item) => sum + (item.fine || 0),
        0
      );

      setStats({
        books: booksRes.data.length,
        members: membersRes.data.length,
        issued: borrowRes.data.length,
        returned: returnsRes.data.length,
        fine: totalFine,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/borrow");

      const today = new Date();

      const dueBooks = res.data.filter((book) => {
        if (!book.dueDate) return false;

        const due = new Date(book.dueDate);

        const diff = Math.ceil(
          (due - today) / (1000 * 60 * 60 * 24)
        );

        return diff <= 2;
      });

      setNotifications(dueBooks);
    } catch (err) {
      console.log(err);
    }
  };


  const filteredBooks = books.filter((book) =>
    book.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredMembers = membersData.filter(
    (member) =>
      member.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const filteredIssued = issuedBooks.filter(
    (item) =>
      item.book
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );
  return (
    <div
      className={
        darkMode
          ? "dashboard-container dark"
          : "dashboard-container"
      }
    >
      {/* Sidebar */}
      <div className="sidebar">
        <h2>📚 BookVerse</h2>

        <ul>
          <Link to="/dashboard">
            <li>🏠 Dashboard</li>
          </Link>

          <Link to="/books">
            <li>📖 Books</li>
          </Link>

          <Link to="/members">
            <li>👥 Members</li>
          </Link>

          <Link to="/issue-book">
            <li>📕 Issue Book</li>
          </Link>

          <Link to="/borrowed-books">
            <li>📦 Issued Books</li>
          </Link>

          <Link to="/returns">
            <li>🔄 Return Books</li>
          </Link>

          <Link to="/reports">
            <li>📊 Reports</li>
          </Link>

          <Link to="/">
            <li>🚪 Logout</li>
          </Link>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* Top Navbar */}
        <div className="top-navbar">
          <div className="welcome-section">
            <h2>Welcome Back, Amrutha 👋</h2>
            <p>{new Date().toDateString()}</p>
          </div>

          <div className="navbar-right">
            <div className="notification">
              🔔
              <span className="notification-badge">
                {notifications.length}
              </span>
            </div>

            <div className="admin-profile">
              <img
                src="https://i.pravatar.cc/50"
                alt="admin"
              />

              <div>
                <h4>Amrutha K</h4>
                <p>Library Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="notification-box">
          <h3>🔔 Notifications</h3>

          {notifications.length === 0 ? (
            <p>No books due.</p>
          ) : (
            notifications.map((book) => (
              <p key={book._id}>
                📕 {book.book} is due on {book.dueDate}
              </p>
            ))
          )}
        </div>

        {/* Hero */}
        <div className="hero-banner">
          <h1>📚 Welcome to BookVerse</h1>

          <p>
            Explore books, manage members and track
            library activities.
          </p>

          <div className="hero-buttons">
            <Link to="/issue-book">
              <button>📕 Issue Book</button>
            </Link>

            <Link to="/members">
              <button>👥 Add Member</button>
            </Link>

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              🌙 Dark Mode
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="dashboard-search">
  <input
    type="text"
    placeholder="🔍 Search books, members, issued books..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />
</div>
  {search && (
  <div className="search-results">
    <h3>📚 Books</h3>
    {filteredBooks.map((book) => (
      <p key={book._id}>📖 {book.title}</p>
    ))}

    <h3>👥 Members</h3>
    {filteredMembers.map((member) => (
      <p key={member._id}>👤 {member.name}</p>
    ))}

    <h3>📦 Issued Books</h3>
    {filteredIssued.map((item) => (
      <p key={item._id}>📕 {item.book}</p>
    ))}
  </div>
)}
        {/* Statistics */}
        <div className="stats-grid">

          <div className="stat-card">
            <span>📚</span>
            <h3>{stats.books}</h3>
            <p>Total Books</p>
          </div>

          <div className="stat-card">
            <span>👥</span>
            <h3>{stats.members}</h3>
            <p>Total Members</p>
          </div>

          <div className="stat-card">
            <span>📕</span>
            <h3>{stats.issued}</h3>
            <p>Issued Books</p>
          </div>

          <div className="stat-card">
            <span>🔄</span>
            <h3>{stats.returned}</h3>
            <p>Returned Books</p>
          </div>

          <div className="stat-card">
            <span>💰</span>
            <h3>₹{stats.fine}</h3>
            <p>Fine Collected</p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>⚡ Quick Actions</h2>

          <div className="action-buttons">
            <Link to="/books">
              <button>📚 View Books</button>
            </Link>

            <Link to="/members">
              <button>👥 Members</button>
            </Link>

            <Link to="/issue-book">
              <button>📕 Issue Book</button>
            </Link>

            <Link to="/borrowed-books">
              <button>📦 Issued Books</button>
            </Link>

            <Link to="/returns">
              <button>🔄 Returns</button>
            </Link>
          </div>
        </div>

        {/* AI Books */}
        <div className="ai-card">
          <h2>🤖 Recommended Books</h2>

          <ul>
            <li>📖 Atomic Habits</li>
            <li>📖 Deep Work</li>
            <li>📖 Clean Code</li>
            <li>📖 The Psychology of Money</li>
          </ul>
        </div>

        {/* Chart */}
        <div className="chart-section">
          <div className="chart-card">
            <h2>📈 Monthly Issue Analysis</h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={borrowData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="books"
                  fill="#4f46e5"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;