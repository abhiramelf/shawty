import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Import User model

/**
 * Register a new user
 * @desc This function handles user registration by validating input, hashing the password, and saving the user to the database.
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate typeof user input
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid input type' });
    }

    // Validate user input
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ userId: email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // TODO: Save user to database
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save(); // Save user to database

        // Respond with success message
        res.status(201).json({ success: true, message: 'User registered successfully', data: { 
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        } });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        // Check if user exists and compare password
        const user = await User.findOne({ email }).select('+password'); // Include password field for comparison
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiration time
        });

        // Respond with success message
        res.status(200).json({ success: true, message: 'User logged in successfully', token: token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export { registerUser, loginUser };