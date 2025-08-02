import express from 'express';
import { shortenUrl } from '../controllers/urlController.js';

const router = express.Router();

/**
 * @route   POST /api/shorten
 * @desc    Create a new short URL
 * @access  Public
 */
router.post('/shorten', shortenUrl);

export default router;