import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./BorrowedBooks.css";

function BorrowedBooks() {
  const navigate = useNavigate();

  const [borrowedBooks, setBorrowedBooks] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // Fetch Issued Books
  const fetchBorrowedBooks = async () => {
    try {
      const res = await API.get("/borrow");
      setBorrowedBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  // Search Filter
  const filteredBooks =
    borrowedBooks.filter((item) =>
      item.book
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  // Fine Calculation
  const calculateFine = (dueDate) => {
    if (!dueDate) return 0;

    const today = new Date();
    const due = new Date(dueDate);

    const diff =
      today.getTime() -
      due.getTime();

    const daysLate = Math.ceil(
      diff /
        (1000 * 60 * 60 * 24)
    );

    return daysLate > 0
      ? daysLate * 10
      : 0;
  };

  // Return Book
  const handleReturn = async (item) => {
    try {
      const fine = calculateFine(
        item.dueDate
      );

      await API.post("/returns", {
        name: item.name,
        book: item.book,
        regNo: item.regNo,
        borrowDate: item.dateTime,
        dueDate: item.dueDate,
        returnDate: new Date()
          .toISOString()
          .split("T")[0],
        fine,
      });

      await API.delete(
        `/borrow/${item._id}`
      );

      alert(
        `✅ Book Returned Successfully\nFine: ₹${fine}`
      );

      fetchBorrowedBooks();

    } catch (err) {
      console.log(err);
      alert(
        "Failed to return book"
      );
    }
  };

  return (
    <div className="borrowed-page">

      <button
        className="back-btn"
        onClick={() =>
          navigate("/dashboard")
        }
      >
        ⬅ Back
      </button>

      <h1>
        📦 Issued Books Records
      </h1>

      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search Book..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Student</th>
            <th>Reg No</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredBooks.length ===
          0 ? (
            <tr>
              <td colSpan="6">
                No Issued Books Found
              </td>
            </tr>
          ) : (
            filteredBooks.map(
              (item) => (
                <tr
                  key={item._id}
                >
                  <td>
                    {item.book}
                  </td>

                  <td>
                    {item.name}
                  </td>

                  <td>
                    {item.regNo}
                  </td>

                  <td>
                    {item.dateTime?.split(
                      "T"
                    )[0]}
                  </td>

                  <td>
                    {item.dueDate ||
                      "N/A"}
                  </td>

                  <td>
                    <button
                      className="return-btn"
                      onClick={() =>
                        handleReturn(
                          item
                        )
                      }
                    >
                      🔄 Return
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>

    </div>
  );
}

export default BorrowedBooks;