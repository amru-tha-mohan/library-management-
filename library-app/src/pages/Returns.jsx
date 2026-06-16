import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Returns.css";

function Returns() {
  const navigate = useNavigate();

  const [returns, setReturns] = useState([]);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      const res = await API.get("/returns");
      setReturns(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalFine = returns.reduce(
    (sum, item) => sum + (item.fine || 0),
    0
  );

  return (
    <div className="returns-page">
      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ⬅ Back to Dashboard
      </button>

      <h1>🔄 Returns Management</h1>

      <div className="returns-grid">

        <div className="return-card">
          <h2>{returns.length}</h2>
          <p>Total Returns</p>
        </div>

        <div className="return-card">
          <h2>₹{totalFine}</h2>
          <p>Fine Collected</p>
        </div>

      </div>

      <div className="recent-returns">
        <h2>Recent Returns</h2>

        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Book</th>
              <th>Reg No</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Fine</th>
            </tr>
          </thead>

          <tbody>
            {returns.length === 0 ? (
              <tr>
                <td colSpan="7">
                  No Return Records Found
                </td>
              </tr>
            ) : (
              returns.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.book}</td>
                  <td>{item.regNo}</td>

                  <td>
                    {item.dateTime
                      ? item.dateTime.split("T")[0]
                      : "-"}
                  </td>

                  <td>
                    {item.dueDate || "-"}
                  </td>

                  <td>
                    {item.returnDate || "-"}
                  </td>

                  <td>
                    ₹{item.fine || 0}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Returns;