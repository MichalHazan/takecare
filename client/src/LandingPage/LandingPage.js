import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import LoginForm from '../components/LoginForm';
import Login from '../components/GoogleLogin';

const LandingPage = () => {
    const navigate = useNavigate();  // Hook for navigation

    // Function to handle the button click and navigate to AddUser page
    const handleAddUserClick = () => {
        navigate('/AddUser');
    };

    return (
        <div className="landing-page">
            <div className="login-container">
                <Login/>
                <LoginForm/>
                {/* Button to navigate to AddUser page */}
                <button className="add-user-button" onClick={handleAddUserClick}>
                    Register New User
                </button>
            </div>

            <header className="header">
                <h1>Welcome to Our Website</h1>
                <p>Discover our product or service in the best way possible!</p>
                {/* Search Bar */}
                <input type="text" className="search-bar" placeholder="Search..."/>
            </header>

            {/* Features Section */}
            <section className="features">
                <div className="feature">
                    <h2>Professional</h2>
                    <p>Description of the first feature of the product.</p>
                </div>
                <div className="feature">
                    <h2>Client</h2>
                    <p>Description of the second feature of the product.</p>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <p>© 2024 All rights reserved</p>
            </footer>
        </div>
    );
};

export default LandingPage;
