const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true },
    publicationDate: { type: Date },
    publisher: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher", required: true },
    isbn: { type: String, unique: true },
    pages: { type: Number },
    summary: { type: String }
});

module.exports = mongoose.model("Book", bookSchema);
