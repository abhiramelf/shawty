// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Define the URL schema for shortened URLs
const urlSchema = new mongoose.Schema({
    urlCode: {
        type: String, // Unique code for the short URL
        required: true,
        unique: true,
    },
    longUrl: {
        type: String, // Original long URL
        required: true,
    },
    shortUrl: {
        type: String, // Generated short URL
        required: true,
    },
    date: {
        type: Date, // Date of creation
        default: Date.now,
    },
    clicks: {
        type: Number, // Number of times the short URL was used
        required: true,
        default: 0,
    },
});

// Export the Url model
export default mongoose.model("Url", urlSchema);