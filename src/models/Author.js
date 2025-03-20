const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    birthDate: { type: Date },
    nationality: { type: String },
    biography: { type: String }
});

module.exports = mongoose.model("Author", authorSchema);
