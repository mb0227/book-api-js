const Author = require("../models/Author");

// Get all authors
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single author by ID
const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new author
const createAuthor = async (req, res) => {
  try {
    const { name, birthDate, nationality, biography } = req.body;
    const newAuthor = new Author({ name, birthDate, nationality, biography });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });  
    }
    res.status(400).json({ error: error.message });
  }
};

// Update an author by ID
const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an author by ID
const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor };
