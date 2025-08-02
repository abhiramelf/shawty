import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        required: true,
        unique: true,
    },
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
});

export default mongoose.model("Url", urlSchema);