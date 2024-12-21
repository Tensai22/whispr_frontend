import React from 'react';
import '../css/ChatMessage.css'; // Убедитесь, что путь к вашему CSS файлу верный

function ChatMessage({ message }) {
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="chat-message">
      {message.user && message.user.avatar_url && (
        <img className="avatar" src={`http://localhost:8000${message.user.avatar_url}`} alt={`${message.user.username}'s avatar`} />
      )}
      <span className="username">{message.user ? message.user.username : 'Unknown'}</span>
      <span className="timestamp">{timestamp}</span>
      <p className="message-text">{message.content}</p>
    </div>
  );
}

export default ChatMessage;