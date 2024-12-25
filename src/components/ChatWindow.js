import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import '../css/ChatWindow.css';

const ChatWindow = ({ selectedUser }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const messagesEndRef = useRef(null);
    const accessToken = localStorage.getItem('accessToken');
    const socketRef = useRef(null);
    const [filePreviews, setFilePreviews] = useState({});

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedUser && accessToken) {
                try {
                    const chatResponse = await axios.get(
                        `http://localhost:8000/chat/private-chats/`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    const chat = chatResponse.data.find(chat =>
                        chat.participants.some(id => id === selectedUser.id)
                    );
                    if (chat) {
                        const response = await axios.get(
                            `http://localhost:8000/chat/private-chats/${chat.id}/messages/`,
                            {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            }
                        );
                         // Store file previews for initial messages
                        const initialPreviews = {};
                        response.data.forEach(msg => {
                           if (msg.file && msg.filename) {
                            initialPreviews[msg.id] = {
                                name: msg.filename,
                                type: msg.file.startsWith('data:image') ? 'image' : 'other',
                                dataUrl: msg.file
                               };
                            }
                         });
                       setFilePreviews(initialPreviews);
                        setMessages(response.data);
                    } else {
                        setMessages([]);
                         setFilePreviews({});
                    }

                } catch (error) {
                    console.error("Ошибка при загрузке сообщений:", error);
                }
            }
        };

        fetchMessages();
    }, [selectedUser, accessToken]);

    useEffect(() => {
        if (selectedUser && accessToken) {
            const token = accessToken;
            const wsUrl = `ws://localhost:8000/ws/chat/?token=${token}`;

            socketRef.current = new WebSocket(wsUrl);

            socketRef.current.onopen = () => {
                console.log("WebSocket соединение открыто");
            };

            socketRef.current.onmessage = (event) => {
                const message = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, message]);

                if (message.file && message.filename){
                   setFilePreviews(prevPreviews => ({
                     ...prevPreviews,
                     [message.id]: {
                         name: message.filename,
                        type: message.file.startsWith('data:image') ? 'image' : 'other',
                         dataUrl: message.file
                      }
                  }));
                }
            };

            socketRef.current.onclose = () => {
                console.log("WebSocket соединение закрыто");
            };

            socketRef.current.onerror = (error) => {
                console.error("Ошибка WebSocket:", error);
            };

            return () => {
                if (socketRef.current) {
                    socketRef.current.close();
                }
            }
        }
    }, [selectedUser, accessToken]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleRemoveSelectedFile = () => {
        setSelectedFile(null);
        document.getElementById('fileInput').value = ''; // Очистка значения инпута
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() && !selectedFile) {
            alert('Введите сообщение или выберите файл перед отправкой.');
            return;
        }

        try {
            const chatResponse = await axios.get(
                `http://localhost:8000/chat/private-chats/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const chat = chatResponse.data.find(chat =>
                chat.participants.some(id => id === selectedUser.id)
            );

            let chatId;

            if (!chat) {
                const createChatResponse = await axios.post(
                    `http://localhost:8000/chat/private-chats/`,
                    { participants: [selectedUser.id] },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )
                chatId = createChatResponse.data.id;
            } else {
                chatId = chat.id;
            }

             if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                let messageToSend = {
                    message: newMessage,
                    chatId: chatId
                };

                if (selectedFile) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64String = reader.result.split(',')[1];
                        messageToSend.file = base64String;
                        messageToSend.filename = selectedFile.name;
                        socketRef.current.send(JSON.stringify(messageToSend));
                        setNewMessage('');
                        setSelectedFile(null);
                        document.getElementById('fileInput').value = ''; // Очистка инпута файла
                    };
                    reader.readAsDataURL(selectedFile);
                } else {
                    socketRef.current.send(JSON.stringify(messageToSend));
                    setNewMessage('');
                }
            }

        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
            alert('Сообщение не отправлено. Попробуйте позже.');
        }
    };

    const renderSelectedFilePreview = () => {
        if (!selectedFile) {
            return null;
        }

        const fileURL = URL.createObjectURL(selectedFile);
        const fileType = selectedFile.type;

        return (
            <div className="selected-file-preview">
                {fileType.startsWith('image/') ? (
                    <img src={fileURL} alt={selectedFile.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                ) : (
                    <span>{selectedFile.name}</span>
                )}
                <Button variant="outline-danger" size="sm" onClick={handleRemoveSelectedFile}>
                    Удалить
                </Button>
            </div>
        );
    };

      const renderFilePreview = (message) => {
         if (!message.file || !message.filename || !filePreviews[message.id]) return null;

         const filePreview = filePreviews[message.id];

        if (filePreview.type === 'image') {
            return (
                <div className="file-preview">
                  <img src={filePreview.dataUrl} alt={filePreview.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </div>
             );
        } else {
            return (
                <div className="file-preview">
                    <span>{filePreview.name}</span>
                </div>
            );
        }
    };

    return (
        <div className="chat-window">
            {selectedUser ? (
                <>
                    <h2>{selectedUser.username}</h2>
                    <div className="messages">
                         {messages.map(message => (
                             <div key={message.id}>
                                <ChatMessage  message={message} />
                                {renderFilePreview(message)}
                              </div>
                         ))}
                        <div ref={messagesEndRef} />
                    </div>
                    {renderSelectedFilePreview()}
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
                            <label htmlFor="fileInput" className="btn btn-secondary">
                                Выбрать файл
                            </label>
                            <FormControl
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Введите сообщение..."
                            />
                            <Button type="submit" variant="primary" disabled={!socketRef.current}>
                                Отправить
                            </Button>
                        </InputGroup>
                    </Form>
                </>
            ) : (
                <h2>Выберите пользователя для чата</h2>
            )}
        </div>
    );
};

export default ChatWindow;