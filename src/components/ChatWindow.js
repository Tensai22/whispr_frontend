import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import '../css/ChatWindow.css';

const ChatWindow = ({ selectedUser }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedUser) {
                try {
                    const response = await axios.get(
                        `http://localhost:8000/chat/messages/${selectedUser.id}/`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    );
                    setMessages(response.data);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        };

        fetchMessages();
    }, [selectedUser]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) {
            alert('Введите сообщение перед отправкой.');
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:8000/chat/messages/${selectedUser.id}/`,
                { text: newMessage },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setMessages(prevMessages => [...prevMessages, response.data]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Сообщение не отправлено. Попробуйте позже.');
        }
    };

    return (
        <div className="chat-window">
            {selectedUser ? (
                <>
                    <h2>Чат с {selectedUser.username}</h2>
                    <div className="messages">
                        {messages.map(message => (
                            <ChatMessage key={message.id} message={message} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                    >
                        <InputGroup>
                            <FormControl
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Введите сообщение..."
                                required
                                autoFocus
                            />
                            <Button type="submit" variant="primary">
                                Отправить
                            </Button>
                        </InputGroup>
                    </Form>
                </>
            ) : (
                <h2>Выберите пользователя для чата</h2>
            )}
        </div>
    );
};

export default ChatWindow;

