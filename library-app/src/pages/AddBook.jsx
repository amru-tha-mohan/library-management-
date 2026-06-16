import { useState } from "react";
import API from "../services/api";
import "./AddBook.css";

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/books", book);

      alert("📚 Book Added Successfully!");

      setBook({
        title: "",
        author: "",
        category: "",
        image: "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to add book");
    }
  };

  return (
    <div className="addbook-container">

      <div className="addbook-left">
        <h1>📚 Add New Book</h1>
        <p>
          Expand your digital library by adding books
          from all genres.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
          alt="library"
        />
      </div>

      <div className="addbook-right">

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={book.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={book.author}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={book.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option>Programming</option>
            <option>Fantasy</option>
            <option>Finance</option>
            <option>Science</option>
            <option>History</option>
            <option>Biography</option>
            <option>Self Help</option>
          </select>

          <input
            type="text"
            name="image"
            placeholder="Book Cover Image URL"
            value={book.image}
            onChange={handleChange}
          />

          <button type="submit">
            ➕ Add Book
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddBook;