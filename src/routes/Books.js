const express = require("express");
const { createBook, getBooks, getBookById, updateBook, deleteBook } = require("../controllers/BookController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createBook);
router.get("/", authMiddleware, getBooks);
router.get("/:id", authMiddleware, getBookById);
router.put("/:id", authMiddleware, updateBook);
router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;
