import validurl from 'valid-url';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';

/**
 * @desc   Controller to handle URL shortening. It will handle the business 
 *         logic of validating the long URL, checking for its existence, 
 *         generating a short code, and saving it to the database.
 * @route  POST /api/shorten
 * @access Private
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

        if (req.user) {
            newUrl.user = req.user.id; // Attach the user ID if available
        }

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

/**
 * Redirect to the original URL
 * @desc This function retrieves the original URL from the database using the short code and redirects the user to that URL.
 * @route GET /:code
 * @access Public
 */
const redirectToUrl = async (req, res) => {
    const { code } = req.params;

    try {
        // Find the URL by its code
        const url = await Url.findOne({ urlCode: code });
        if (!url) {
            // Check if the client prefers HTML (browser)
            if (req.accepts('html')) {
                return res.status(404).send(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>404 Not Found</title>
                        <style>
                            body { font-family: Arial, sans-serif; background: #f8f8f8; color: #333; text-align: center; padding-top: 10%; }
                            .container { display: inline-block; background: #fff; padding: 2em 3em; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);}
                            h1 { font-size: 3em; margin-bottom: 0.2em; }
                            p { font-size: 1.2em; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>404</h1>
                            <p>Sorry, we couldn't find a URL for this code.</p>
                        </div>
                    </body>
                    </html>
                `);
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'No URL found for this code',
                });
            }
        }
        // Increment the click count for the URL
        url.clicks += 1;
        await url.save();

        // Redirect to the original URL
        return res.redirect(302, url.longUrl);
    } catch (error) {
        console.error('Error redirecting URL:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

export { shortenUrl, redirectToUrl };