// src/components/ProtectedPage.js
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
    const [cookies] = useCookies(['token']);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the token exists
        if (cookies.token) {
            setIsAuthenticated(true);
        } else {
            navigate('/');  // If no token, redirect to login page
        }
        setLoading(false);
    }, [cookies, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? (
        <div>
            <h1>Welcome to the Protected Page!</h1>
        </div>
    ) : null;
};

export default ProtectedPage;
