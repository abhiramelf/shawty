/**
 * @desc   Controller to handle URL shortening. It will handle the business 
 *         logic of validating the long URL, checking for its existence, 
 *         generating a short code, and saving it to the database.
 * @route  POST /api/shorten
 * @access Public
 */
const shortenUrl = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Shorten URL endpoint hit',
    });
}

export { shortenUrl };