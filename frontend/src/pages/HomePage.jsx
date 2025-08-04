import React, { useState } from "react";
import createShortUrl from "../services/apiService";

const HomePage = () => {
    const [longUrl, setLongUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!longUrl) {
            alert("Please enter a valid URL.");
            return;
        }

        try {
            const shortUrl = await createShortUrl(longUrl);
            console.log("Shortened URL:", shortUrl);
        } catch (error) {
            alert(error.message);
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
        </div>
    );
};

export default HomePage;