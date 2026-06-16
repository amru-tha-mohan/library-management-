const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

/* Get all books */
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Get single book */
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Add book */
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Update book */
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
});

/* Delete book */
router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    res.json({
      message: "Book Deleted Successfully"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;