import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    role: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user', formData);
      alert('User signed up successfully');
    } catch (error) {
      console.error('There was an error signing up!', error);
      alert('Error signing up');
    }
  };

  return (
    <div className="signup-container">
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <input type="date" name="birthDate" onChange={handleChange} />
        <select name="role" onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="professional">Professional</option>
          <option value="client">Client</option>
        </select>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
