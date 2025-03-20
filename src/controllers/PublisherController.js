const Publisher = require("../models/Publisher");

// Create a new Publisher
const createPublisher = async (req, res) => {
    try {
        const { name, founded, headquarters, website } = req.body;
        const newPublisher = new Publisher({ name, founded, headquarters, website });
        await newPublisher.save();
        res.status(201).json(newPublisher);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message }); 
        }
        res.status(400).json({ error: error.message });
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all Publishers
const getPublishers = async (req, res) => {
    try {
        const Publishers = await Publisher.find();
        res.json(Publishers);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Publishers", error });
    }
};

// Get an Publisher by ID
const getPublisherById = async (req, res) => {
    try {
        const Publisher = await Publisher.findById(req.params.id);
        if (!Publisher) return res.status(404).json({ message: "Publisher not found" });
        res.json(Publisher);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Publisher", error });
    }
};

// Update an Publisher by ID
const updatePublisher = async (req, res) => {
    try {
        const updatedPublisher = await Publisher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPublisher) return res.status(404).json({ message: "Publisher not found" });
        res.json(updatedPublisher);
    } catch (error) {
        res.status(500).json({ message: "Error updating Publisher", error });
    }
};

// Delete an Publisher by ID
const deletePublisher = async (req, res) => {
    try {
        const deletedPublisher = await Publisher.findByIdAndDelete(req.params.id);
        if (!deletedPublisher) return res.status(404).json({ message: "Publisher not found" });
        res.json({ message: "Publisher deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Publisher", error });
    }
};

module.exports = { createPublisher, getPublishers, getPublisherById, updatePublisher, deletePublisher };
