import express from 'express';
import { redirectToUrl } from '../controllers/urlController.js';

const router = express.Router();

/**
 * @route   GET /:code
 * @desc    Redirect to the original URL
 * @access  Public
 */
router.get('/:code', redirectToUrl);

export default router;  