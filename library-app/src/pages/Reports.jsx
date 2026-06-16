import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Reports.css";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Reports() {
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    books: 0,
    members: 0,
    issued: 0,
    returned: 0,
    fine: 0,
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const books = await API.get("/books");
      const members = await API.get("/members");
      const borrow = await API.get("/borrow");
      const returns = await API.get("/returns");

      const totalFine = returns.data.reduce(
        (sum, item) => sum + (item.fine || 0),
        0
      );

      setStats({
        books: books.data.length,
        members: members.data.length,
        issued: borrow.data.length,
        returned: returns.data.length,
        fine: totalFine,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const reportData = [
    {
      name: "Books",
      count: stats.books,
    },
    {
      name: "Members",
      count: stats.members,
    },
    {
      name: "Issued",
      count: stats.issued,
    },
    {
      name: "Returned",
      count: stats.returned,
    },
  ];

  const downloadReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("BookVerse Library Report", 20, 20);

    autoTable(doc, {
      startY: 35,
      head: [["Category", "Count"]],
      body: [
        ["Total Books", stats.books],
        ["Members", stats.members],
        ["Issued Books", stats.issued],
        ["Returned Books", stats.returned],
        ["Fine Collected", `₹${stats.fine}`],
      ],
    });

    doc.text(
      `Generated On: ${new Date().toLocaleString()}`,
      20,
      doc.lastAutoTable.finalY + 20
    );

    doc.save("LibraryReport.pdf");
  };

  return (
    <div className="reports-page">
      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ⬅ Back
      </button>

      <h1>📊 Library Reports</h1>

      <div className="reports-grid">
        <div className="report-card">
          <h2>📚 Total Books</h2>
          <h3>{stats.books}</h3>
        </div>

        <div className="report-card">
          <h2>👥 Members</h2>
          <h3>{stats.members}</h3>
        </div>

        <div className="report-card">
          <h2>📕 Issued Books</h2>
          <h3>{stats.issued}</h3>
        </div>

        <div className="report-card">
          <h2>🔄 Returned Books</h2>
          <h3>{stats.returned}</h3>
        </div>

        <div className="report-card">
          <h2>💰 Fine Collected</h2>
          <h3>₹{stats.fine}</h3>
        </div>
      </div>

      <div className="chart-card">
        <h2>📊 Library Analytics</h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={reportData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#4f46e5"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <button
        className="download-btn"
        onClick={downloadReport}
      >
        ⬇ Download Report
      </button>
    </div>
  );
}

export default Reports;