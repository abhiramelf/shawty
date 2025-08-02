// Import required modules
import express from "express"; // Express framework for building the server
import 'dotenv/config'; // Load environment variables from .env file
import connectDB from "./backend/config/db.js" // MongoDB connection logic
import urlRoutes from "./backend/routes/urls.js"; // Import URL routes
import indexRoutes from "./backend/routes/index.js"; // Import index routes
import authRoutes from "./backend/routes/auth.js"; // Import authentication routes

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// Root route for health check
app.get("/", (req, res) => {
    res.send("App is running!");
})

app.use("/api", urlRoutes); // Use URL routes under /api path
app.use("/", indexRoutes); // Use index routes for short URL code handling
app.use("/api/auth", authRoutes); // Use authentication routes under /api/auth path

// Start the server on the specified port
app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running at URL\n\nhttp://localhost:${process.env.PORT}`);
})