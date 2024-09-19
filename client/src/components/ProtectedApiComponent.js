// src/components/ProtectedComponent.js
import React, { useEffect, useState } from 'react';
import api from '../middlewares/authApi';// Import the configured axios instance

const ProtectedApiComponent = () => {
    const [data, setData] = useState(null);  // State to store the protected data
    const [error, setError] = useState(null);  // State to store any error message

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await api.get('/protected-route');  // Request with the token automatically sent
                setData(response.data);  // Save the returned data to state
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching data');  // Handle errors, if any
            }
        };

        fetchProtectedData();  // Call the function when the component mounts
    }, []);  // Empty dependency array ensures this runs only once when the component is mounted

    if (error) {
        return <div>Error: {error}</div>;  // Display error message if an error occurred
    }

    if (!data) {
        return <div>Loading...</div>;  // Show a loading message while waiting for the data
    }

    return <div>Protected Data: {JSON.stringify(data)}</div>;  // Display the fetched protected data
};

export default ProtectedApiComponent;
