const Genre = require("../models/Genre");

// Create a new genre
const createGenre = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        const existingGenre = await Genre.findOne({ name: req.body.name });
        if (existingGenre) {
            return res.status(400).json({ error: "Genre already exists" });
        }

        const newGenre = new Genre({ name, description });
        await newGenre.save();
        res.status(201).json(newGenre);
    } catch (error) {
        if (error.code === 11000) { 
            return res.status(400).json({ error: "Genre already exists" });
        }
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all genres
const getGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving genres", error });
    }
};

// Get a genre by ID
const getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).json({ message: "Genre not found" });
        res.json(genre);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving genre", error });
    }
};

// Update a genre by ID
const updateGenre = async (req, res) => {
    try {
        const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGenre) return res.status(404).json({ message: "Genre not found" });
        res.json(updatedGenre);
    } catch (error) {
        res.status(500).json({ message: "Error updating genre", error });
    }
};

// Delete a genre by ID
const deleteGenre = async (req, res) => {
    try {
        const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
        if (!deletedGenre) return res.status(404).json({ message: "Genre not found" });
        res.json({ message: "Genre deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting genre", error });
    }
};

module.exports = { createGenre, getGenres, getGenreById, updateGenre, deleteGenre };
