import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import '../css/ChatWindow.css';

const ChatWindow = ({ selectedUser }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const accessToken = localStorage.getItem('accessToken')
    const socketRef = useRef(null);


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
                      chat.participants.includes(selectedUser.id)
                    )
                   if (chat) {
                       const response = await axios.get(
                            `http://localhost:8000/chat/private-chats/${chat.id}/messages/`,
                            {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            }
                        );
                       setMessages(response.data);
                   } else {
                      setMessages([]);
                   }

                } catch (error) {
                    console.error("Ошибка при загрузке сообщений:", error);
                }
            }
        };

        fetchMessages();
    }, [selectedUser, accessToken]);

    useEffect(() => {
        if (selectedUser && accessToken){
          const token = accessToken;
           const wsUrl = `ws://localhost:8000/ws/chat/?token=${token}`;

              socketRef.current = new WebSocket(wsUrl);

              socketRef.current.onopen = () => {
                console.log("WebSocket соединение открыто");
              };

              socketRef.current.onmessage = (event) => {
                  const message = JSON.parse(event.data);
                  setMessages((prevMessages) => [...prevMessages, message]);
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

    const handleSendMessage = async () => {
        if (!newMessage.trim()) {
            alert('Введите сообщение перед отправкой.');
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
              chat.participants.includes(selectedUser.id)
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
             }else{
               chatId = chat.id;
            }


             if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                 socketRef.current.send(JSON.stringify({
                   message: newMessage,
                   chatId: chatId
                 }));
             }
              setNewMessage('');

        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
            alert('Сообщение не отправлено. Попробуйте позже.');
        }
    };

    return (
        <div className="chat-window">
            {selectedUser ? (
                <>
                    <h2>Чат с {selectedUser.username}</h2>
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
                            <Button type="submit" variant="primary">
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