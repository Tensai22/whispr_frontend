import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/chat.css';
import ChatHeader from './ChatHeader';
import ChatWindow from './ChatWindow';
import Sidebar from './Sidebar';

const ChatDesign = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className="chat-app">
            <ChatHeader />
            <div className="chat-body">
                <Sidebar onSelectUser={setSelectedUser} />
                <ChatWindow selectedUser={selectedUser} />
            </div>
        </div>
    );
};

export default ChatDesign;
