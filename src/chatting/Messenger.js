import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/chat.css';

const Messenger = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');

    const searchUsers = async (query) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/search_users/?q=${query}`);
            console.log('Search response:', response.data); // Debugging line
            const results = Array.isArray(response.data) ? response.data : [];
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching users:', error);
            setSearchResults([]);
        }
    };

    const sendMessage = async (data) => {
        if (!selectedUser) return;
        try {
            const response = await axios.post('http://localhost:8000/api/send_message/', {
                recipient: selectedUser.id,
                text: data.text
            });
            console.log('Message sent:', response.data);
            reset();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <div style={{
                marginBottom: '15px', position: 'relative'
            }}>
                <input
                    type="text"
                    style={{
                        width: '375px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        outline: 'none',
                        fontSize: '16px'
                    }}
                    placeholder="Поиск..."
                    onChange={(e) => searchUsers(e.target.value)}
                />
            <ul style={{ listStyle: 'none', padding: 0 }}>
                    {searchResults.map(user => (
                        <li key={user.id}
                        style={{
                            padding: '10px',
                            borderBottom: '1px solid #eee',
                            cursor: 'pointer',
                            backgroundColor: selectedUser && selectedUser.id === user.id ? '#f0f8ff' : 'white'
                        }}
                            onClick={() => setSelectedUser(user)}>
                            {user.username}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Messenger;
