import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome!</h1>
      <div className="button-container">
        <Link to="/login" className="button">LogIn</Link>
        <Link to="/signup" className="button">SignUp</Link>
      </div>
    </div>
  );
};

export default Home;
