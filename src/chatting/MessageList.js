import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessageList = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('/api/received/');
                setMessages(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке сообщений:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div>
            <h2>Список сообщений</h2>
            {messages.length === 0 ? (
                <p>Нет сообщений</p>
            ) : (
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>
                            <strong>Отправитель:</strong> {message.sender}<br />
                            <strong>Сообщение:</strong> {message.text}<br />
                            <small>Дата и время: {message.timestamp}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MessageList;
