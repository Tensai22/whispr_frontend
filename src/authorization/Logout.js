import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/logout/', {}, {
                withCredentials: true
            });
            if (response.status === 200) {
                // Clear tokens from local storage or cookies
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                navigate("/login'");
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
