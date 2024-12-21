import React, {useState, useEffect} from 'react';
import defaultProfilePic from '../assets/Cat_logo_by_khngldi.png';
// import defaultCommunityPic from '../assets/communityPic.png';
import '../css/chat.css';
import '../css/header.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ChatHeader = ({communityname}) => {
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState(defaultProfilePic);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/me/', {
                    withCredentials: true
                });
                setUsername(response.data.username);
                if (response.data.avatar_url) {
                    setProfilePic(`http://localhost:8000${response.data.avatar_url}`);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleRedirectChange = () => {
        navigate('/changeprofilepassword')
    }

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/logout/', {}, {
                withCredentials: true
            });
            if (response.status === 200) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                navigate("/");
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <header>
            <div className="logo-container">
                <img src={require("../assets/Whispr_logo.png")} alt="Whispr"/>
                <span className="logo-text">Whispr</span>
            </div>
            <div className="profile">
                <span className="username">{username}</span>
                <img src={profilePic} alt="Profile" className="profile-pic"/>
                <div className="profile-menu">
                    <button>Сменить картинку</button>
                    <button onClick={handleRedirectChange}>Сменить пароль</button>
                    <button onClick={handleLogout}>Выход</button>
                </div>
            </div>
        </header>
    );
};

export default ChatHeader;