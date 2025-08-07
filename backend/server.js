// Import required modules
import express from "express"; // Express framework for building the server
import 'dotenv/config'; // Load environment variables from .env file
import swaggerUi from 'swagger-ui-express'; // Swagger UI for API documentation
import YAML from 'yamljs'; // YAML parser for Swagger configuration

import connectDB from "./config/db.js" // MongoDB connection logic
import urlRoutes from "./routes/urls.js"; // Import URL routes
import indexRoutes from "./routes/index.js"; // Import index routes
import authRoutes from "./routes/auth.js"; // Import authentication routes
import linkRoutes from "./routes/links.js"; // Import link routes

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
app.use("/api/links", linkRoutes); // Use link routes under /api/links path

// Swagger configuration
const swaggerDocument = YAML.load('./swagger.yml'); // Load Swagger configuration from YAML file
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Serve Swagger UI at /api-docs path

// Start the server on the specified port
app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running at URL\n\nhttp://localhost:${process.env.PORT}`);
})
