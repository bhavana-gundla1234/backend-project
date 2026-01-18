const Book = require("../models/Book");
const mongoose= require("mongoose");

exports.createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.getBookById = async (req, res) => {
  // 🔥 FIX: trim whitespace & newlines
  const id = req.params.id.trim();

  console.log("CLEAN ID:", JSON.stringify(id));

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Book ID format"
    });
  }

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  res.json(book);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!book)
    return res.status(404).json({ message: "Book not found" });

  res.json(book);
};

exports.deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book)
    return res.status(404).json({ message: "Book not found" });

  res.json({ message: "Book deleted successfully" });
};
