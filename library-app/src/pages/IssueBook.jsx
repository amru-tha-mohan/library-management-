import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./IssueBook.css";

function IssueBook() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    regNo: "",
    book: "",
    category: "",
    dateTime: "",
    dueDate: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value
    };

    // Auto-generate due date (15 days)
    if (e.target.name === "dateTime") {
      const due = new Date(e.target.value);
      due.setDate(due.getDate() + 15);

      updatedForm.dueDate =
        due.toISOString().split("T")[0];
    }

    setForm(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.regNo ||
      !form.book ||
      !form.dateTime
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await API.post("/borrow", form);

      setSuccess(true);

      setTimeout(() => {
        navigate("/borrowed-books");
      }, 1500);

      setForm({
        name: "",
        regNo: "",
        book: "",
        category: "",
        dateTime: "",
        dueDate: ""
      });
    } catch (err) {
      console.log(err);
      alert("Failed to issue book.");
    }
  };

  return (
    <div className="issue-container">
      <div className="issue-card">

        <h1>📕 Issue Book</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="regNo"
            placeholder="Registration Number"
            value={form.regNo}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="book"
            placeholder="Book Name"
            value={form.book}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Book Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dateTime"
            value={form.dateTime}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            readOnly
          />

          <button type="submit">
            📕 Issue Book
          </button>

        </form>

        {success && (
          <p className="success-msg">
            ✅ Book Issued Successfully
          </p>
        )}

      </div>
    </div>
  );
}

export default IssueBook;