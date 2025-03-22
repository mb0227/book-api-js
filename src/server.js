const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Import route files
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const authorRoutes = require("./routes/authors");
const genreRoutes = require("./routes/genres");
const publisherRoutes = require("./routes/publishers");

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// Connect to MongoD
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/publishers", publisherRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
module.exports = app