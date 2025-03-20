const Book = require("../models/Book");

// Create a new Book
const createBook = async (req, res) => {
    try {
        const { title, author, genre, publicationDate, publisher, isbn, pages, summary} = req.body;
        const newBook = new Book({ title , author, genre, publicationDate, publisher, isbn, pages, summary});
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message }); 
        }
        res.status(400).json({ error: error.message });
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all Books
const getBooks = async (req, res) => {
    try {
        const Books = await Book.find();
        res.json(Books);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Books", error });
    }
};

// Get an Book by ID
const getBookById = async (req, res) => {
    try {
        const Book = await Book.findById(req.params.id);
        if (!Book) return res.status(404).json({ message: "Book not found" });
        res.json(Book);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Book", error });
    }
};

// Update an Book by ID
const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: "Book not found" });
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: "Error updating Book", error });
    }
};

// Delete an Book by ID
const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: "Book not found" });
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Book", error });
    }
};

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };
