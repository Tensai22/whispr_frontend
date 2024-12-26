// ChatMessage.js
import React from 'react';
import '../css/ChatMessage.css';

function ChatMessage({ message }) {
    const timestamp = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const renderMedia = () => {
        if (!message.file) {
            return null;
        }

        const fileUrl = message.file.startsWith('http') ? message.file : `http://localhost:8000${message.file}`;
        const fileName = message.file.split('/').pop();
        const urlParts = fileUrl.split('/');
        const encodedFileName = urlParts[urlParts.length - 1];
        const fileExtension = fileName.split('.').pop().toLowerCase();
        const decodedFileName = decodeURIComponent(encodedFileName);
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            return (
                <div className="message-file">
                    <img src={fileUrl} alt={fileName} />
                </div>
            );
        } else if (['mp4', 'webm', 'ogg', 'mkv', 'mov'].includes(fileExtension)) {
            return (
                <div className="message-file">
                    <video src={fileUrl} controls />
                </div>
            );
        } else if (['mp3', 'wav', 'aac', 'flac'].includes(fileExtension)){
           return (
                 <div className="message-file">
                     <audio src={fileUrl} controls />
                 </div>
              );
        } else {
            return (
                <div className="message-file">
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                        <img src={require("../assets/folder.png")} alt="Вложение" />
                        {decodedFileName}
                    </a>
                </div>
            );
        }
    };


    return (
        <div className="chat-message">
            {message.user && message.user.avatar_url && (
                <img className="avatar" src={`http://localhost:8000${message.user.avatar_url}`} alt={`${message.user.username}'s avatar`} />
            )}
            <span className="username">{message.user ? message.user.username : 'Unknown'}</span>
            <span className="timestamp">{timestamp}</span>
            <div className="message-text"><div>{renderMedia()}</div> {message.content}</div>

        </div>
    );
}

export default ChatMessage;