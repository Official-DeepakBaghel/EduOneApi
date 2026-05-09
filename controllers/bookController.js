const Book = require("../models/Book");

exports.addBook = async (req, res) => {
    try {
        const { title, bookNumber, author, category, description, coverUrl } = req.body;

        const book = new Book({
            title,
            bookNumber,
            author,
            category,
            description,
            coverUrl
        });

        await book.save();
        res.status(201).json({ message: "Book added successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Error adding book", error: error.message });
    }
};

exports.getBooks = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 10 } = req.query;
        const query = {};

        if (category) query.category = category;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } },
                { bookNumber: { $regex: search, $options: 'i' } }
            ];
        }

        const books = await Book.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Book.countDocuments(query);

        res.json({
            books,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
};
