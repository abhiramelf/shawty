import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided. Please log in.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
        req.user = decoded; // Attach user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(400).json({ success: false, message: 'Invalid token.' });
    }
}

export { authMiddleware };