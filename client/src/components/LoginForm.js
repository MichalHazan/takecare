// src/components/LoginForm.js
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth', credentials);
      setCookie('token', response.data.token, { path: '/', maxAge: 3600 });
      alert('navigateProtected')
      //navigate('/protected');
    } catch (error) {
      alert('Invalid credentials');
      navigate('/');
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
