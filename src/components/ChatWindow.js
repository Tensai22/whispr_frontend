import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import '../css/ChatWindow.css';
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
            setMessages(prevMessages => {
                if (!prevMessages.some(msg => msg.id === data.id)) {
                    return [...prevMessages, data.message];
                }
                return prevMessages;
            });
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
        const fetchedMessages = response.data;

        setMessages(prevMessages => {
            const newMessages = fetchedMessages.filter(fetchedMsg =>
                !prevMessages.some(msg => msg.id === fetchedMsg.id)
            );
            return [...prevMessages, ...newMessages];
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
    };

    fetchMessages();  // Fetch messages once on component mount

}, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log('Отправка сообщения:', newMessage);
        socket.send(
            JSON.stringify({
                username: username,
                message: newMessage.trim()
            })
        );
        setNewMessage('');
    } else {
        console.error('WebSocket неактивен. Сообщение не отправлено.');
        alert('Соединение с сервером отсутствует. Пожалуйста, перезагрузите страницу.');
    }
};

     return (
        <div className="chat-window">
            <div className="messages">
                {messages.map((msg) => (
                    <div key={msg.id} className="message">
                        <strong>{msg.username}: </strong>
                        <span>{msg.message}</span>
                        <em> {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</em>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <Form
                onSubmit={(e) => {
                    e.preventDefault(); // Предотвращаем перезагрузку страницы
                    if (newMessage.trim() !== '') {
                        handleSendMessage();
                    } else {
                        alert('Введите сообщение перед отправкой.');
                    }
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