const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    founded: { type: Number },
    headquarters: { type: String },
    website: { type: String }
});

module.exports = mongoose.model("Publisher", publisherSchema);
