import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import '../css/ChatWindow.css';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        let currentSocket = null;
        const accessToken = localStorage.getItem('accessToken');

        const connectWebSocket = () => {
            const ws = new WebSocket(`ws://localhost:8000/ws/chat/?token=${accessToken}`);
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

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSendMessage = async () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            // Изменено: Отправляем сообщение, если есть текст ИЛИ файл
            if (newMessage.trim() !== '' || selectedFile) {
                const reader = new FileReader();
                if (selectedFile) {
                    reader.readAsDataURL(selectedFile);
                    reader.onload = () => {
                        const base64File = reader.result.split(',')[1];
                        const messageToSend = {
                            message: newMessage,
                            file: base64File,
                            filename: selectedFile.name
                        };
                        socket.send(JSON.stringify(messageToSend));
                        setNewMessage('');
                        setSelectedFile(null);
                        document.getElementById('fileInput').value = ''; // Очистка инпута файла
                    };
                    reader.onerror = (error) => {
                        console.error('Error reading file:', error);
                        alert('Ошибка при чтении файла.');
                    };
                } else {
                    const messageToSend = { message: newMessage };
                    socket.send(JSON.stringify(messageToSend));
                    setNewMessage('');
                }
            } else {
                alert('Введите сообщение или выберите файл для отправки.');
            }
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
                        type="file"
                        id="fileInput"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="fileInput" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>
                        Выбрать файл
                    </label>
                    <FormControl
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Введите сообщение..."
                        required
                        autoFocus
                    />
                    <Button type="submit" variant="primary" disabled={!socket}>
                        Отправить
                    </Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default ChatWindow;