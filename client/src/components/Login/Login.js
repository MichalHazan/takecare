import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/user/${credentials.email}`);
      const user = response.data;
      if (user.password === credentials.password) {
        localStorage.setItem('user', JSON.stringify(user));
        alert('Login successful');
      } else {
        alert('Password is incorrect');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('Error logging in');
    }
  };

  return (
    <div className="login-container">
      <h1>LogIn</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
