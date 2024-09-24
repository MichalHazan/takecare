import axios from 'axios';
import { Cookies } from 'react-cookie';  // Import react-cookie for managing cookies

const cookies = new Cookies();  // Create an instance of Cookies

// Create an axios instance
const api = axios.create({
    baseURL: 'http://localhost:3000',  // Server base URL
});

// Interceptor to add the token to every request
api.interceptors.request.use(
    (config) => {
        const token = cookies.get('token');  // Get the token from cookies
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;  // Add the token to the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);  // Handle any request error
    }
);

export default api;
