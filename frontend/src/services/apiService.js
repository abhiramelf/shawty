import axios from 'axios';

const createShortUrl = async (longUrl) => {
    try {
      const response = await axios.post('/api/shorten', { longUrl });
      return response.data;
    } catch (error) {
        console.error('API Error: Failed to create short URL', error);

        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
      // If it's a network error or something else, throw a generic error.
            throw new Error('An unexpected error occurred. Please try again.');
        }
    }
};

export default createShortUrl;
