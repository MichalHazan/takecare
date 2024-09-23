// Logout.js
import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Logout = () => {
    const [, , removeCookie] = useCookies(['token']);
    const navigate = useNavigate(); // useNavigate hook

    const handleLogout = () => {
        removeCookie('token', { path: '/' });
        console.log('User logged out, token removed');
        navigate('/login'); // Use navigate instead of history.push
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
