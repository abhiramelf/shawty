import Url from "../models/Url.js";

// Controller to get all links for a user
const getUserLinks = async (req, res) => {

    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized access. Please log in.' });
    }

    const userId = req.user.id; // Get user ID from the request
    try {
        const links = await Url.find({ user: userId }).sort({ date : -1 }); // Find all links created by the user, sorted by date
        return res.status(200).json({ success: true, count: links.length, data: links });
    } catch (error) {
        console.error('Error fetching user links:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export { getUserLinks };