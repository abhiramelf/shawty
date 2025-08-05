import React, { useState } from "react";
import { createShortUrl } from "../services/apiService";

const HomePage = () => {
    // State to hold the long URL input
    const [longUrl, setLongUrl] = useState("");

    // State to hold the shortened URL data
    const [shortUrlData, setShortUrlData] = useState(null);

    // State to hold any error messages
    const [error, setError] = useState(null);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!longUrl) {
            alert("Please enter a valid URL.");
            return;
        }

        try {
            setError('');

            const shortUrl = await createShortUrl(longUrl);
            setShortUrlData(shortUrl.data);

            console.log("Shortened URL:", shortUrl);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An unexpected error occurred.';
            setError(errorMessage);

            setShortUrlData(null);

            console.error('Error from API:', error);
        }
    }

    return (
        <div>
            <h2>URL Shortener</h2>
            <p>Enter a long URL to shorten it!</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="longUrl-input">Your Long URL:</label>
                    <input
                        id="longUrl-input"
                        type="url"
                        placeholder="Enter long URL"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        
                        required
                    />
                </div>
                <button type="submit">Shorten URL</button>
            </form>

            {error && (
                <div className="error-container" style={{ color: 'red', marginTop: '1rem' }}>
                <p><strong>Error:</strong> {error}</p>
                </div>
            )}

            {shortUrlData && (
                <div className="result-container" style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '5px' }}>
                <h3>Your Short URL is ready!</h3>
                <p>
                    <strong>Short Link:</strong> 
                    {/* We make the short URL a clickable link for a better user experience.
                        'target="_blank"' opens the link in a new tab.
                        'rel="noopener noreferrer"' is a security best practice for new tabs. */}
                    <a 
                    href={shortUrlData.shortUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: '#007bff' }}
                    >
                    {shortUrlData.shortUrl}
                    </a>
                </p>
                <p style={{ fontSize: '0.8rem', color: '#555' }}>
                    Original URL: {shortUrlData.longUrl.substring(0, 70)}...
                </p>
                </div>
            )}
        </div>
    );
};

export default HomePage;