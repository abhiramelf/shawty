import validurl from 'valid-url';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';

/**
 * @desc   Controller to handle URL shortening. It will handle the business 
 *         logic of validating the long URL, checking for its existence, 
 *         generating a short code, and saving it to the database.
 * @route  POST /api/shorten
 * @access Public
 */
const shortenUrl = async (req, res) => {

    // Check if the request body contains a long URL
    if (!req.body || !req.body.longUrl) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a long URL to shorten',
        });
    }

    // Extract the long URL from the request body
    const { longUrl } = req.body;

    // Validate the long URL format
    if (!validurl.isUri(longUrl)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid long URL format',
        });
    }

    // Check if the long URL already exists in the database
    try {
        // Find an existing URL with the same long URL
        let existingUrl = await Url.findOne({ longUrl });
        if (existingUrl) {
            return res.status(200).json({
                success: true,
                message: 'URL already exists',
                data: existingUrl,
            });
        }

        // If the URL does not exist, create a new short URL
        const urlCode = nanoid(7); // Generate a unique 8-character code
        const shortUrl = `${process.env.BASE_URL}/${urlCode}`;
        const newUrl = new Url({
            urlCode,
            longUrl,
            shortUrl,
        });

        // Save the new URL to the database
        await newUrl.save();
        
        return res.status(201).json({
            success: true,
            message: 'URL shortened successfully',
            data: newUrl,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error: Error checking existing URL',
            error: error.message,
        });
    }
}

export { shortenUrl };