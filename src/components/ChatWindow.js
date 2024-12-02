import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

const ChatWindow = ({ selectedUser }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState(localStorage.getItem('username') || 'guest');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!selectedUser) return;

        const ws = new WebSocket(`ws://localhost:8000/ws/chat/${selectedUser.id}/`);
        setSocket(ws);

        ws.onopen = () => {
            console.log(`Connected to WebSocket with user ${selectedUser.username}`);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket!');
            setSocket(null);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [selectedUser]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser) return;

            try {
                const response = await axios.get(`http://localhost:8000/chat/messages/${selectedUser.id}/`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [selectedUser]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (newMessage.trim() !== '' && socket) {
            const messageData = {
                sender: username,
                receiver: selectedUser.username,
                message: newMessage,
            };
            socket.send(JSON.stringify(messageData));
            setMessages((prev) => [...prev, messageData]);
            setNewMessage('');
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
                <div ref={messagesEndRef} />
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
