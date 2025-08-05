import axios from "axios";

const registerUser = async (userData) => {
    try {
        const response = await axios.post('/api/auth/register', { name: userData.name, email: userData.email, password: userData.password });
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to register user', error);

        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred. Please try again.');
        }
    }
};

const loginUser = async (userData) => {
    try {
        const response = await axios.post('/api/auth/login', { email: userData.email, password: userData.password });
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to login user', error);

        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred. Please try again.');
        }
    }
};

export { registerUser, loginUser };