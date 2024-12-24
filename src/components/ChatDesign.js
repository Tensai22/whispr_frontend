// ChatDesign.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import ChatWindow from "./ChatWindow";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/chat.css';



const ChatDesign = () => {
    const [currentChatUser, setCurrentChatUser] = useState(null);

    return (
        <div className="chat-app">
            <ChatHeader />
            <div className="chat-body">
                <Sidebar onSelectUser={setCurrentChatUser} />
                <ChatWindow selectedUser={currentChatUser} />
            </div>
        </div>
    );
};

export default ChatDesign;