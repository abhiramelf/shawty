// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
    userId: {
        type: String, // Unique user identifier
        required: true,
        unique: true,
    },
    name: {
        type: String, // User's name
        required: true,
    },
    email: {
        type: String, // User's email address
        required: [true, 'Email is required'],
        unique: true,
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
        ],
    },
    password: {
        type: String, // Hashed password
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'], 
        select: false, // Do not return password by default 
    }
},
{
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Export the User model
export default mongoose.model("User", userSchema);