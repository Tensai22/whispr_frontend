import React, {useEffect, useState} from 'react';
import '../css/chat.css';
import {Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import axios from "axios";

const ChatWindow = () => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/get_messages/', {
                withCredentials: true  // Включение сессионных куки
            });
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/send_message/', {
                text: newMessage
            }, {
                withCredentials: true  // Включение сессионных куки
            });
            setMessages([response.data, ...messages]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    return (
        <div className="chat-window">
            <div className="messages">
                {messages.map((msg) => (
                    <div key={msg.id} className="message">
                        <img src={require("../assets/default_profile_image.jpeg")} alt="pfp" className="avatar"/>
                        <strong className="sender">{msg.sender}:{msg.text}</strong>
                            <em className="send_time">{new Date(msg.timestamp).toLocaleTimeString()}</em>

                    </div>
                ))}
            </div>
            <Form className="message-input">
                <InputGroup>
                    <FormControl type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Напишите сообщение..."/>
                    <Button className="btn-custom" type="submit" variant="primary" onClick={handleSendMessage}>Отправить</Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default ChatWindow;
