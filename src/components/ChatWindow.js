import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState(localStorage.getItem('username') || 'guest');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/chat/');
        setSocket(ws);

        ws.onopen = () => {
            console.log('Connected to WebSocket!');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, data.message]);
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
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/chat/get_messages/');
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (newMessage.trim() !== '' && socket) {
            socket.send(JSON.stringify({
                username: username,
                message: newMessage
            }));
            setNewMessage('');
        }
    };

    return (
        <div className="chat-window">
            <div className="messages">
                {messages.map(msg => (
                    <div key={msg.id} className="message">
                        <strong>{msg.username}: </strong>
                        <span>{msg.message}</span>
                        <em> {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</em>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <Form onSubmit={handleSendMessage}>
                <InputGroup>
                    <FormControl
                        type="text"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Введите сообщение..."
                    />
                    <Button type="submit">Отправить</Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default ChatWindow;