const express = require("express");
const { createPublisher, getPublishers, getPublisherById, updatePublisher, deletePublisher } = require("../controllers/PublisherController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createPublisher);
router.get("/", authMiddleware, getPublishers);
router.get("/:id", authMiddleware, getPublisherById);
router.put("/:id", authMiddleware, updatePublisher);
router.delete("/:id", authMiddleware, deletePublisher);

module.exports = router; 
