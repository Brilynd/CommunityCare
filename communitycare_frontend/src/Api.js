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
