import React, {useState, useEffect} from 'react';
import defaultProfilePic from '../assets/Cat_logo_by_khngldi.png';
// import defaultCommunityPic from '../assets/communityPic.png';
import '../css/chat.css';
import '../css/header.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ChatHeader = ({ communityname }) => {
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState(defaultProfilePic);
    const [newAvatar, setNewAvatar] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/me/', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                });
                setUsername(response.data.username);
                if (response.data.avatar_url) {
                    setProfilePic(`http://localhost:8000${response.data.avatar_url}`);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleRedirectChange = () => {
        navigate('/changeprofilepassword');
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/logout/', {}, {
                withCredentials: true,
            });
            if (response.status === 200) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                navigate('/');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleAvatarChange = (event) => {
        setNewAvatar(event.target.files[0]);
    };

    const uploadAvatar = async () => {
        if (!newAvatar) return;

        const formData = new FormData();
        formData.append('avatar', newAvatar);

        try {
            const response = await axios.post('http://localhost:8000/api/update-avatar/', formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                setProfilePic(`http://localhost:8000${response.data.avatar_url}`);
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };

    return (
        <header>
            <div className="logo-container">
                <img src={require("../assets/Whispr_logo.png")} alt="Whispr" />
                <span className="logo-text">Whispr</span>
            </div>
            <div className="profile">
                <span className="username">{username}</span>
                <img src={profilePic} alt="Profile" className="profile-pic" />
                <div className="profile-menu">
                    <input
                        type="file"
                        onChange={handleAvatarChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="avatar-upload"
                    />
                    <button onClick={() => document.getElementById('avatar-upload').click()}>
                        Сменить картинку
                    </button>
                    <button onClick={uploadAvatar}>Сохранить картинку</button>
                    <button onClick={handleRedirectChange}>Сменить пароль</button>
                    <button onClick={handleLogout}>Выход</button>
                </div>
            </div>
        </header>
    );
};

export default ChatHeader;