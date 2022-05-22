import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import jwt_decode from 'jwt-decode';

export default function useAuthentication() {
    const token = localStorage.getItem('userToken');

    const history = useHistory();
    const [user, setUser] = useState(jwt_decode(token));

    useEffect(() => {
        try {
            if(!token) {
                history.push('/login');
                localStorage.removeItem('userToken');
            } 
        } catch (error) {
            history.push('/login');
            localStorage.removeItem('userToken');
        }
    }, [token])

    return {user, token};
}
