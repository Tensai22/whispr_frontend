import React, { useEffect, useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);



    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
        console.log('Message received:', data.message);
    };

    socket.onclose = () => {
        console.log('WebSocket closed');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };


    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/chat/`);
        setSocket(socket);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        socket.onclose = () => {
            console.error('WebSocket closed');
        };

        return () => socket.close();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get_messages/');
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
