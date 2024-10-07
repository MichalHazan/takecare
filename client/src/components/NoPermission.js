import React from 'react';
import { Link } from 'react-router-dom';

const NoPermission = () => {
    return (
        <div>
            <h1>You do not have permission for this page</h1>
            <Link to="/">Go back to Home</Link>
        </div>
    );
};

export default NoPermission;
