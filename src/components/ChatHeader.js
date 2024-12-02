import React, {useState} from 'react';
import defaultProfilePic from '../assets/Cat_logo_by_khngldi.png';
import '../css/chat.css';
import '../css/header.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";


const ChatHeader = ({username, communityname}) => {
    const [profilePic, setProfilePic] = useState(defaultProfilePic);

    const navigate = useNavigate();
        const handleProfilePic = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                setProfilePic(reader.result);
                try {
                    // Отправка новой картинки на сервер
                    await axios.post('http://localhost:8000/api/updateProfilePic/', {
                        profilePic: reader.result
                    }, {
                        withCredentials: true,
                    });
                } catch (error) {
                    console.error('Error updating profile picture:', error);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRedirectChange = () => {
        navigate('/changeprofilepassword')
    }

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/logout/', {}, {
                withCredentials: true
            });
            if (response.status === 200) {
                // Clear tokens from local storage or cookies
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                navigate("/login");
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
                    <button>
                        <label style={{ cursor: 'pointer'}}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePic}
                                style={{ display: 'none'}}
                            />
                            Сменить картинку
                        </label>
                    </button>
                    <button onClick={handleRedirectChange}>Сменить пароль</button>
                    <button onClick={handleLogout}>Выход</button>
                </div>
            </div>
        </header>
    );
};

export default ChatHeader;


