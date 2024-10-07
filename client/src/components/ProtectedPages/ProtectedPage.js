// ProtectedPage.js
import React from 'react';
import { Link } from 'react-router-dom';


const ProtectedPage = () => {
    return (
        <div>
            <h1>Login was successful!</h1>
              <h1> Welcome!</h1>
            <h1>Welcome to the Protected Page!</h1>
            <Link to="/">Go back to Home</Link>
        </div>
    )
};

export default ProtectedPage;
