// PrivateRoute.js
import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom'; // Use Navigate instead of Redirect
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ element: Component, requiredRole }) => {
    const [cookies] = useCookies(['token']); // Retrieve token from cookies

    // Check if the user has the required role
    const checkUserRole = () => {
        if (cookies.token) {
            try {
                // Decode the token to extract the user role
                const decodedToken = jwtDecode(cookies.token);

                // Verify if the user role matches the required role
                return requiredRole.includes(decodedToken.role);
            } catch (error) {
                console.error('Error decoding token', error);
                return false;
            }
        }
        return false;
    };

    // Return the component if the user has the required role, otherwise redirect to login
    return checkUserRole() ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
