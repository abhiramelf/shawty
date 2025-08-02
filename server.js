// Import required modules
import express from "express"; // Express framework for building the server
import 'dotenv/config'; // Load environment variables from .env file
import { connectDB } from "./backend/config/db.js" // MongoDB connection logic

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Root route for health check
app.get("/", (req, res) => {
    res.send("App is running!");
})

// Start the server on the specified port
app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running at URL\n\nhttp://localhost:${process.env.PORT}`);
})