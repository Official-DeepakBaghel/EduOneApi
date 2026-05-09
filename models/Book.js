const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    bookNumber: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    coverUrl: { type: String },
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
