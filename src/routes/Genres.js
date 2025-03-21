const express = require("express");
const { createGenre, getGenres, getGenreById, updateGenre, deleteGenre } = require("../controllers/GenreController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createGenre);
router.get("/", authMiddleware, getGenres);
router.get("/:id", authMiddleware, getGenreById);
router.put("/:id", authMiddleware, updateGenre);
router.delete("/:id", authMiddleware, deleteGenre);

module.exports = router;
