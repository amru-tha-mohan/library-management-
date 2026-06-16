import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await API.get(`/books/${id}`);
      setBook(res.data);
    } catch (err) {
      console.log(err);
    }
  };
const borrowBook = async () => {
  try {
    await API.put(`/books/${book._id}`, {
      ...book,
      available: false,
    });

    alert("📖 Book Borrowed Successfully");

    fetchBook();
  } catch (err) {
    console.log(err);
  }
};
  if (!book) return <h2>Loading...</h2>;

  return (
    <div className="details-page">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>

      <div className="details-container">

        <motion.img
          src={book.image}
          alt={book.title}
          className="details-cover"
          initial={{ rotateY: -90 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 0.6 }}
        />

        <div className="details-content">

  <h1>{book.title}</h1>

  <h3>✍️ {book.author}</h3>

  <div className="rating-box">
    ⭐ {book.rating}
  </div>

  <p className="category-tag">
    {book.category}
  </p>
<p className="availability-status">
  {book.available
    ? "✅ Available"
    : "❌ Borrowed"}
</p>
  <h2>📖 About This Book</h2>

  <p>
    {book.description ||
      "A highly recommended book from our library collection."}
  </p>

  <h2>💬 Reader Reviews</h2>

<div className="review">
  ⭐⭐⭐⭐⭐ Excellent Book
</div>

<div className="review">
  ⭐⭐⭐⭐ Very Informative
</div>

<div className="review">
  ⭐⭐⭐⭐⭐ Highly Recommended
</div>

<h2>📚 Related Books</h2>

<div className="related-books">

  <div className="related-card">
    Deep Work
  </div>

  <div className="related-card">
    Think Like A Monk
  </div>

  <div className="related-card">
    Psychology of Money
  </div>

</div>

<button
  className="borrow-btn"
  onClick={() => navigate("/borrow")}
>
  📖 Borrow Book
</button>
</div>

      </div>

    </div>
  );
}

export default BookDetails;