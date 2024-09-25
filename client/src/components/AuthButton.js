import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './AuthButton.css'

const AuthButton = () => {
    const [cookies, , removeCookie] = useCookies(['token']);
    const navigate = useNavigate();

    const handleLogout = () => {
        removeCookie('token', { path: '/' }); // Remove token from cookies
        console.log('User logged out, token removed');
        navigate('/login'); // Redirect to login page
    };

    const handleLogin = () => {
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="auth-button-container"> {/* Container with class */}
            {cookies.token ? (
                <button className="auth-button" onClick={handleLogout}>
                    Logout
                </button>
            ) : (
                <button className="auth-button" onClick={handleLogin}>
                    Login
                </button>
            )}
        </div>
    );
};

export default AuthButton;