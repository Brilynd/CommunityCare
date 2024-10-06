import axios from 'axios';
const API_URL = 'http://localhost:5001';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error logging in user:", error);
        return null;
    }
};
export const signUpUser = async (firstName, lastName, email, password, phoneNumber) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            firstName,
            lastName,
            email,
            password,
            phoneNumber
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error signing up user:", error);
        return null;
    }
}

export const addRequestHelp = async (userId, title, type, description, financialAssistance,latitude,longitude) => {
    try {
        const response = await axios.post(`${API_URL}/requestHelp`, {
            userId,
            title,
            type,
            description,
            financialAssistance,
            latitude,
            longitude
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error adding request for help:", error);
        return null;
    }
}

export const getAllRequest = async () => {
    try {
        const response = await axios.get(`${API_URL}/requests`);
        console.log(response);
        return response.data.requests;
    } catch (error) {
        console.error("Error getting all requests:", error);
        return null;
    }
}
