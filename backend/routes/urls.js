import express from 'express';
import { shortenUrl } from '../controllers/urlController.js';
import { authMiddleware } from '../middleware/auth.js'; // Import authentication middleware

const router = express.Router();

/**
 * @route   POST /api/shorten
 * @desc    Create a new short URL
 * @access  Public
 */
router.post('/shorten', authMiddleware, shortenUrl);

export default router;