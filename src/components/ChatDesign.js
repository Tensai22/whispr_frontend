import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/chat.css';
import ChatHeader from "./ChatHeader";
import ChatWindow from "./ChatWindow";
import Sidebar from "./Sidebar";

const ChatDesign = () => {
    return (
        <div className="chat-app">
            <ChatHeader />
            <div className="chat-body">
                {/*<Sidebar />*/}
                <ChatWindow />
            </div>
        </div>
    );
}

export default ChatDesign;
