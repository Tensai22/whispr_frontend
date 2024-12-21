import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import '../css/ChatWindow.css';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState(localStorage.getItem('username') || 'guest');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        let currentSocket = null;

        const connectWebSocket = () => {
            const ws = new WebSocket('ws://localhost:8000/ws/chat/');
            setSocket(ws);
            currentSocket = ws;

            ws.onopen = () => console.log('WebSocket connected');
            ws.onclose = () => console.log('WebSocket disconnected');
            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                addMessage(message);
            };
            ws.onerror = (error) => console.error('WebSocket error:', error);
        };

        const fetchInitialMessages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/chat/messages/');
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching initial messages:", error);
            }
        };

        fetchInitialMessages();
        connectWebSocket();

        return () => {
            if (currentSocket) {
                currentSocket.close();
            }
        };
    }, []);

    const addMessage = (message) => {
        setMessages(prevMessages => {
            if (!prevMessages.some(msg => msg.id === message.id)) {
                return [...prevMessages, message];
            }
            return prevMessages;
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN && newMessage.trim() !== '') {
            const messageToSend = { message: newMessage };
            socket.send(JSON.stringify(messageToSend));
            setNewMessage('');
        } else if (!newMessage.trim()) {
            alert('Введите сообщение перед отправкой.');
        } else {
            console.error('WebSocket неактивен. Сообщение не отправлено.');
            alert('Соединение с сервером отсутствует. Пожалуйста, перезагрузите страницу.');
        }
    };

    return (
        <div className="chat-window">
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
                    <Button type="submit" variant="primary" disabled={!socket || newMessage.trim() === ''}>
                        Отправить
                    </Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default ChatWindow;