const express = require("express");
const { createAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor } = require("../controllers/AuthorController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createAuthor);
router.get("/", authMiddleware, getAuthors);
router.get("/:id", authMiddleware, getAuthorById);
router.put("/:id", authMiddleware, updateAuthor);
router.delete("/:id", authMiddleware, deleteAuthor);

module.exports = router;
