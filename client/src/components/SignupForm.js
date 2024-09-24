import React, { useState } from 'react';
import axios from 'axios';
import './SignupForm.css';

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
        profile: {
            description: '',
            profession: '',
            price: 0,
        },
    });

    const [showProfessionType, setShowProfessionType] = useState(false); // State to control the display of professionType

    // Function to handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if the input is for profile fields
        if (name === 'profession') {
            setFormData((prevState) => ({
                ...prevState,
                profile: {
                    ...prevState.profile,
                    profession: value, // Update profession inside profile
                },
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

        // Show professionType field only if the role is professional
        if (name === 'role') {
            setShowProfessionType(value === 'professional');
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('formData:', formData);
            const response = await axios.post('http://localhost:3000/registration', formData);  // Send form data to server
            alert('User signed up successfully');

            // Reset formData after successful signup
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                birthDate: '',
                role: '',
                password: '',
                profile: {
                    description: '',
                    profession: '',
                    price: 0,
                },
            });
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
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                value={formData.firstName}
                required
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                value={formData.lastName}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
                required
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                value={formData.phone}
            />
            <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                value={formData.address}
            />
            <input
                type="date"
                name="birthDate"
                onChange={handleChange}
                value={formData.birthDate}
            />

            <select name="role" onChange={handleChange} value={formData.role} required>
                <option value="">Select Role</option>
                <option value="professional">Professional</option>
                <option value="client">Client</option>
                <option value="management">Management</option>
            </select>
            {showProfessionType && ( // Show professionType input only if role is professional
                <input
                    type="text"
                    name="profession"
                    placeholder="Profession Type"
                    onChange={handleChange}
                    value={formData.profile.profession}
                    required
                />
            )}
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                required
            />

            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;
