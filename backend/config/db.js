import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connect at - ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB failed to connect - ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;