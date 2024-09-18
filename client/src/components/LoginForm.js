// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'

const LoginForm = () => {
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
      const response = await axios.post('http://localhost:3000/auth', credentials); // Assuming you have a login route
      alert('Login successful');
      console.log(response);
      // Handle login response, e.g., store token, redirect, etc.
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('Error logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
