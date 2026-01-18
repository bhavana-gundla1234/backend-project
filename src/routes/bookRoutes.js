const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", protect, createBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;
