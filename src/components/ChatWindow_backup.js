import React, { useEffect, useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);





    useEffect(() => {
        // Инициализация WebSocket
        const ws = new WebSocket(`ws://localhost:8000/ws/chat/`);
        setSocket(ws);

        // Обработчики событий
        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Очистка соединения при размонтировании компонента
        return () => ws.close();
    }, []);

    useEffect(() => {
        // Загрузка существующих сообщений через REST API
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/chat/get_messages/');
                setMessages(response.data.messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (newMessage.trim() !== '' && socket) {
            socket.send(JSON.stringify({ message: newMessage }));
            setNewMessage('');
        }
    };

    return (
        <div className="chat-window">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.text}</strong>
                        <em>{new Date(msg.timestamp).toLocaleTimeString()}</em>
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
                    <Button type="submit" variant="primary">Отправить</Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default ChatWindow;
