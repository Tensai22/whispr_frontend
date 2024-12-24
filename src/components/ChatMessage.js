import React from 'react';
import '../css/ChatMessage.css';

function ChatMessage({ message }) {
    const timestamp = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const renderMedia = () => {
        if (!message.file) {
            return null;
        }

        const fileUrl = `/media/${message.file}`;
        const fileName = message.file.split('/').pop();
        const fileExtension = fileName.split('.').pop().toLowerCase();
        console.log("message.file:", message.file); // Отладочный вывод
        console.log("fileUrl:", fileUrl); // Отладочный вывод

        return (
            <div className="message-file">
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                    <img src={require("../assets/folder.png")} alt="Вложение" />
                    {fileName}
                </a>
            </div>
        );
    };

    return (
        <div className="chat-message">
            {message.user && message.user.avatar_url && (
                <img className="avatar" src={`http://localhost:8000${message.user.avatar_url}`} alt={`${message.user.username}'s avatar`} />
            )}
            <span className="username">{message.user ? message.user.username : 'Unknown'}</span>
            <span className="timestamp">{timestamp}</span>
            {message.content && <p className="message-text">{message.content}</p>}
            {renderMedia()}
        </div>
    );
}

export default ChatMessage;