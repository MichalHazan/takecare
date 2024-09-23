import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    // State to hold the email and password values
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    // Handle input changes and update the credentials state
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Handle form submission and perform login request
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send login request to the server with user credentials
            const response = await axios.post('http://localhost:3000/auth', credentials, {
                withCredentials: true,  // Enable cookies
            });
            console.log('Response from server:', response);

            // Set the token in cookies with a 1-hour expiration
            setCookie('token', response.data.token, { path: '/', maxAge: 3600 });
            console.log('Login successful, navigating to protected page');

            // Navigate to protected page upon successful login
            navigate('/ProtectedPage');
        } catch (error) {
            // If login fails, alert the user and navigate back to the login page
            alert('Invalid credentials');
            navigate('/');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Email input field */}
            <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
            />

            {/* Password input field */}
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
            />

            {/* Submit button */}
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
