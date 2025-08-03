import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { getUserLinks } from '../controllers/linkController.js';

const router = express.Router();

/**
 * @desc Get all links for the authenticated user
 * @route GET /api/links/my-links
 * @access Private
 */
router.get('/my-links', authMiddleware, getUserLinks);

export default router;