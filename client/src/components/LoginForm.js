import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';  // Import the function as a named export
import { useNavigate } from 'react-router-dom';
import AuthButton from './AuthButton';
import axios from 'axios';
import useLocalStorageState from 'use-local-storage-state';

const LoginForm = () => {
    // State to hold the email and password values
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [cookies, setCookie] = useCookies(['token']);
    const [role, setRole] = useLocalStorageState('userRole', null);  // Store user role in localStorage
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

            // Decode the token directly from the response (not from cookies yet)
            const decodedToken = jwtDecode(response.data.token);
            const userRole = decodedToken.role;

            // Store the user role in localStorage
            setRole(userRole);

            console.log('======================');
            console.log('Store the user role in localStorage');
            console.log('role:  ' + userRole);
            console.log('======================');

            // Navigate to protected page upon successful login
            navigate('/ProtectedPage');
        } catch (error) {
            // If login fails, alert the user and navigate back to the login page
            alert('Invalid credentials');
            navigate('/');
        }
    };

    return (
        <form className="inputPass" onSubmit={handleSubmit}>
            {/* Email input field */}
            <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                style={{ textAlign: "left", direction: "ltr" }}
            />

            {/* Password input field */}
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                style={{ textAlign: "left", direction: "ltr" }}
            />
            <AuthButton />
        </form>
    );
};

export default LoginForm;