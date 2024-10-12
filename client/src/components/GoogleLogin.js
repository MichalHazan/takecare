import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';  // Import axios to send HTTP requests
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';  // Correct named import for jwtDecode
import { useNavigate } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';

const CLIENT_ID = '904178586203-j6aqt6j4son39ir2rh616os5do6g846p.apps.googleusercontent.com';
const Login = () => {
    const [cookies, setCookie] = useCookies(['token']);
    const [role, setRole] = useLocalStorageState('userRole', null);  // Store user role in localStorage
    const navigate = useNavigate();

    // Function that handles successful login and sends the JWT to the server
    const handleLoginSuccess = async (response) => {
        const tokenGoogle = response.credential;  // Extract the JWT received from Google
        
        try {
            console.log('tokenGoogle:  '+tokenGoogle)
          // Send the JWT to the server for authentication
          const res = await axios.post('http://localhost:3000/authGoogle', { tokenGoogle });

          console.log('User authenticated successfully:', res.data);
          setCookie('token', res.data.token, { path: '/', maxAge: 3600 });

          // Decode the token directly from the response (not from cookies yet)
          const decodedToken = jwtDecode(res.data.token);
          const userRole = decodedToken.role;

          // Store the user role in localStorage
          setRole(userRole);

          // Navigate to protected page upon successful login
          navigate('/ProtectedPage');
        } catch (error) {
          console.error('Error during authentication:', error);
          navigate('/');
        }
    };

    // Handle successful login
    const onSuccess = (response) => {
        handleLoginSuccess(response);  // Call the function to handle success
    };

    // Handle login failure
    const onError = () => {
        console.log('Login Failed');
    };

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <div>
                <h2>Login with Google</h2>
                <GoogleLogin
                    onSuccess={onSuccess}  // Call the function on success
                    onError={onError}  // Call the function on error
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
