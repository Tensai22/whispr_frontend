import React, { useEffect, useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

const ChatWindow = ({ selectedUser }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const username = localStorage.getItem('username') || 'guest';

    useEffect(() => {
        if (!selectedUser) return;

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/chat/messages/${selectedUser.id}/`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [selectedUser]);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (newMessage.trim() === '') return;

        const messageData = {
            sender: username,
            receiver: selectedUser.username,
            message: newMessage,
        };

        try {
            await axios.post('http://localhost:8000/chat/messages/', messageData);
            setMessages((prev) => [...prev, messageData]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    if (!selectedUser) {
        return <div>Выберите пользователя для начала диалога.</div>;
    }

    return (
        <div className="chat-window">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.sender}: </strong>
                        <span>{msg.message}</span>
                    </div>
                ))}
            </div>
            <Form onSubmit={handleSendMessage}>
                <InputGroup>
                    <FormControl
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Введите сообщение..."
                    />
                    <Button type="submit">Отправить</Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default ChatWindow;
