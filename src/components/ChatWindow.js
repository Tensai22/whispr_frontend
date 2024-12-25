// ChatWindow.js
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput'; // Импорт MessageInput
import '../css/ChatWindow.css';

const ChatWindow = ({ selectedUser }) => {
    const [messages, setMessages] = useState([]);
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

    const handleSendMessage = async (newMessage, selectedFile) => {
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
                    };
                    reader.readAsDataURL(selectedFile);
                } else {
                    socketRef.current.send(JSON.stringify(messageToSend));
                }
            }

        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
            alert('Сообщение не отправлено. Попробуйте позже.');
        }
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
                    <MessageInput onSendMessage={handleSendMessage} disabled={!socketRef.current} />
                </>
            ) : (
                <h2>Выберите пользователя для чата</h2>
            )}
        </div>
    );
};

export default ChatWindow;