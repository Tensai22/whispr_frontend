// import React from "react";
// import MessageList from "./MessageList";
// import SendMessage from "./SendMessage";
//
// const Chat = () => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//
//     useEffect(() => {
//         fetchMessages();
//         const interval = setInterval(fetchMessages, 5000);
//         return () => clearInterval(interval);
//     }, []);
//
//     const fetchMessages = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/get_messages/', {
//                 withCredentials: true  // Включение сессионных куки
//             });
//             setMessages(response.data.messages);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         }
//     };
//
//     const handleSendMessage = async () => {
//         try {
//             const response = await axios.post('http://localhost:8000/api/send_message/', {
//                 text: newMessage
//             }, {
//                 withCredentials: true  // Включение сессионных куки
//             });
//             setMessages([response.data, ...messages]);
//             setNewMessage('');
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };
//
//     return (
//         <div className="container">
//             <h2>Общий чат</h2>
//             <div className="chat-window">
//                 {messages.map((msg) => (
//                     <div key={msg.id}>
//                         <strong>{msg.sender}:</strong> {msg.text} <em>{new Date(msg.timestamp).toLocaleTimeString()}</em>
//                     </div>
//                 ))}
//             </div>
//             <div className="message-input">
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Напишите сообщение..."
//                 />
//                 <button onClick={handleSendMessage}>Отправить</button>
//             </div>
//         </div>
//     );
// };
//
// export default Chat;