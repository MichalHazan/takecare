// useAuth.js
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

const useAuth = () => {
    const [cookies] = useCookies(['authToken']);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (cookies.authToken) {
            try {
                // Decode the token (simulated as JSON object)
                const decodedToken = JSON.parse(cookies.authToken);
                setUser(decodedToken);
            } catch (error) {
                console.error('Invalid token');
                setUser(null);
            }
        }
    }, [cookies]);

    return user;
};

export default useAuth;
