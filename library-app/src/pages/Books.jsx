

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import "./Books.css";

function Books() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      book.category === category;

    return matchesSearch && matchesCategory;
  });
const borrowBook = async (book) => {
  const memberName = prompt(
    "Enter member name:"
  );

  const returnDate = prompt(
    "Enter return date (YYYY-MM-DD):"
  );

  if (!memberName || !returnDate) {
    alert("Please enter details");
    return;
  }

  try {
await API.post("/borrow", {
  bookId: book._id,
  book: book.title,
  name: memberName,
  regNo,
  dueDate: returnDate,
});
  

    alert("📚 Book Borrowed Successfully!");
  } catch (err) {
    console.log(err);
    alert("Error borrowing book");
  }
};
  
return (
    <div className="books-page">

      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ⬅ Back to Dashboard
      </button>

      <div className="library-banner">
        <h1>📚 Digital Library</h1>
        <p>
          Explore 40+ Books Across Programming,
          Finance, History, Science, Biography,
          Self Help & Fantasy
        </p>
      </div>
<input
  type="text"
  placeholder="🔍 Search books..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>

      <div className="categories">
        <button onClick={() => setCategory("All")}>All</button>
        <button onClick={() => setCategory("Programming")}>Programming</button>
        <button onClick={() => setCategory("Fantasy")}>Fantasy</button>
        <button onClick={() => setCategory("Finance")}>Finance</button>
        <button onClick={() => setCategory("Self Help")}>Self Help</button>
        <button onClick={() => setCategory("Science")}>Science</button>
        <button onClick={() => setCategory("History")}>History</button>
        <button onClick={() => setCategory("Biography")}>Biography</button>
      </div>

      <h3 className="book-count">
        Total Books: {filteredBooks.length}
      </h3>

      <div className="book-grid">
        {filteredBooks.map((book) => (
        <motion.div
  key={book._id}
  className="book-card"
  onClick={() =>
    navigate(`/book/${book._id}`)
  }
  
  whileHover={{ y: -10 }}
>
            <img
              src={book.image}
              alt={book.title}
              className="book-image"
            />

            <h3>{book.title}</h3>

            <p>{book.author}</p>

            <span className="genre-tag">
              {book.category}
            </span>

            <p className="availability">
  {book.available
    ? "✅ Available"
    : "❌ Borrowed"}
</p>

<button
  className="borrow-btn"
  onClick={(e) => {
    e.stopPropagation(); // prevents opening BookDetails page
    borrowBook(book);
  }}
>
  📕 Borrow Book
</button>

          </motion.div>
        ))}
      </div>

    </div>
  );
}

export default Books;