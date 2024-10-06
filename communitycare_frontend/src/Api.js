import axios from 'axios';
const API_URL = 'http://localhost:5000';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        return null;
    }
};
