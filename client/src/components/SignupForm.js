import React, { useState } from 'react';
import axios from 'axios';
import './SignupForm.css'

const SignupForm = () => {
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
            const response = await axios.post('http://localhost:3000/registration', formData);
            alert('User signed up successfully');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                birthDate: '',
                role: '',
                password: '',
            })
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error', error.message);
            }
        }
    };
    return (
    <form onSubmit={handleSubmit}>
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
            <option value="management">management</option>
        </select>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
