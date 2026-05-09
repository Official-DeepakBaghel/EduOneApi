const Banner = require("../models/Banner.js");

// Add Banner
exports.addBanner = async (req, res) => {
    try {
        const { imageUrl, description } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ message: "Image URL is required" });
        }

        const banner = await Banner.create({ imageUrl, description });

        res.status(201).json({
            message: "Banner added successfully",
            banner
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Banners
exports.getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
