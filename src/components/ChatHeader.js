import React from 'react';
import profilePic from '../HTML_CSS_JavaScript/login_registration/Cat_logo_by_khngldi.png';
import '../css/log_reg.css';

const ChatHeader = ({username}) => {
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
                    <button>Сменить картинку</button>
                    <button>Выход</button>
                </div>
            </div>
        </header>
    );
};

export default ChatHeader;
