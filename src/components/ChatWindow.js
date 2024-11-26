import React, { useEffect, useState } from 'react';
import '../css/chat.css';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from "axios";

const ChatWindow = ({userName, selectedChat}) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (selectedChat) fetchMessages();
    }, [selectedChat]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/get_messages/', {
                withCredentials: true
            });
            setMessages(response.data.messages.reverse());
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/send_message/', {
                text: newMessage
            }, {
                withCredentials: true
            });
            setNewMessage('');
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className={`chat-window ${!selectedChat ? 'welcome-mode' : ''}`}>
            {selectedChat ? (
                <>
                    <div className="messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className="message">
                                <img
                                    src={require('../assets/Cat_logo_by_khngldi.png')}
                                    alt="pfp"
                                    className="avatar"
                                />
                                <strong className="sender">
                                    {msg.sender}: {msg.text}
                                </strong>
                                <em className="send_time">
                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                </em>
                            </div>
                        ))}
                    </div>
                    <Form className="message-input" onSubmit={handleSendMessage}>
                        <InputGroup>
                            <FormControl
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Напишите сообщение..."
                            />
                            <Button
                                className="btn-custom"
                                type="submit"
                                variant="primary"
                            >
                                Отправить
                            </Button>
                        </InputGroup>
                    </Form>
                </>
            ) : (
                <div className="welcome-message">
                    <img
                        src={require('../assets/Whispr_logo_White.png')}
                        alt="Whispr Logo"
                        className="logo"
                    />
                    <h1>Добро пожаловать в Whispr, {userName}!</h1>
                    <p>Присоединяйтесь к сообществу, находите группы по интересам и общайтесь в чате.</p>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
