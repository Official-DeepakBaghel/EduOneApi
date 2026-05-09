const Note = require("../models/Note");

exports.uploadNote = async (req, res) => {
    try {
        const { title, description, course, subject } = req.body;
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

        if (!fileUrl) {
            return res.status(400).json({ message: "File is required" });
        }

        const note = new Note({
            title,
            description,
            course,
            subject,
            fileUrl,
            uploadedBy: req.user.id,
            onModel: req.user.role === 'teacher' ? 'Teacher' : 'Student'
        });

        await note.save();
        res.status(201).json({ message: "Note uploaded successfully", note });
    } catch (error) {
        res.status(500).json({ message: "Error uploading note", error: error.message });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const { course, subject, search, page = 1, limit = 10 } = req.query;
        const query = {};

        if (course) query.course = course;
        if (subject) query.subject = subject;
        if (search) {
            query.$text = { $search: search };
        }

        const notes = await Note.find(query)
            .populate('uploadedBy', 'name email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Note.countDocuments(query);

        res.json({
            notes,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching notes", error: error.message });
    }
};
