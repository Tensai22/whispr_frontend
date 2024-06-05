import React, { useState } from 'react';
import defaultProfilePic from '../assets/Cat_logo_by_khngldi.png';
import defaultCommunityPic from '../assets/communityPic.png';
import '../css/chat.css';
import '../css/header.css'

const ChatHeader = ({ username, communityname }) => {
    const [profilePic, setProfilePic] = useState(defaultProfilePic);
    const [communityPic, setCommunityPic] = useState(defaultCommunityPic);

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCommunityPicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCommunityPic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <header>
            <div className="logo-container">
                <img src={require("../assets/Whispr_logo.png")} alt="Whispr" />
                <span className="logo-text">Whispr</span>
            </div>
            <div className="community">
                <img src={communityPic} alt="Community" className="community-pic" />
                <span className="community-name">{communityname}</span>
                <input type="file" onChange={handleCommunityPicChange} accept="image/*" />
            </div>
            <div className="profile">
                <span className="username">{username}</span>
                <img src={profilePic} alt="Profile" className="profile-pic" />
                <input type="file" onChange={handleProfilePicChange} accept="image/*" />
                <div className="profile-menu">
                    <button>Сменить картинку</button>
                    <button>Выход</button>
                </div>
            </div>
        </header>
    );
};

export default ChatHeader;
