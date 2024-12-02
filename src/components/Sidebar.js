import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';
import ChatWindow from "./ChatWindow";

const Sidebar = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/search_users/');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="sidebar">
            <h5>Доступные пользователи</h5>
            <ListGroup>
                {users.map((user) => (
                    <ListGroup.Item
                        key={user.id}
                        action
                        onClick={() => onSelectUser(user)}
                    >
                        {user.username}
                    </ListGroup.Item>
                ))}
            </ListGroup>

    return (
        <div className="app">
            <Sidebar onSelectUser={setSelectedUser} />
            <ChatWindow selectedUser={selectedUser} />
        </div>
    );
        </div>
    );
};

export default Sidebar;
