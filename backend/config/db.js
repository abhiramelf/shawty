// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Function to connect to MongoDB using the URI from environment variables
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connect at - ${conn.connection.host}`);
    } catch (error) {
        // Log error and exit process if connection fails
        console.error(`MongoDB failed to connect - ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;