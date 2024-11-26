import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

const ChatWindow = () => {
    const { roomName } = useParams(); // roomName из маршрута
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null); // Для хранения WebSocket

    useEffect(() => {
        // Создание WebSocket соединения
        const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
        setSocket(newSocket);

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        newSocket.onclose = () => {
            console.error('WebSocket closed');
        };

        return () => newSocket.close(); // Закрытие соединения при размонтировании
    }, [roomName]);

    useEffect(() => {
        // Загрузка сообщений через REST API
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/get_messages/${roomName}/`);
                setMessages(response.data.messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [roomName]);

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
