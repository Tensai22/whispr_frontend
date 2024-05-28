import React from "react";
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";

const Chat = () => {
    return (
        <div>
            <MessageList/>
            <SendMessage/>
        </div>
    )
}

export default Chat;