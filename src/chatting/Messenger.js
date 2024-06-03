import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

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
            <h1>Messenger</h1>
            <div>
                <label>Search Users:</label>
                <input
                    type="text"
                    onChange={(e) => searchUsers(e.target.value)}
                />
                <ul>
                    {searchResults.map(user => (
                        <li key={user.id} onClick={() => setSelectedUser(user)}>
                            {user.username}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedUser && (
                <div>
                    <h2>Send Message to {selectedUser.username}</h2>
                    <form onSubmit={handleSubmit(sendMessage)}>
                        <textarea
                            name="text"
                            {...register('text', { required: 'Message is required' })}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        {errors.text && <span>{errors.text.message}</span>}
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Messenger;
