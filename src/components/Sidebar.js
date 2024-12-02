import React, { useState } from "react";
import '../css/chat.css';
import { ListGroup, InputGroup, FormControl, Nav } from 'react-bootstrap';
import axios from "axios";

const Sidebar = ({ onSelectUser }) => {
    const [activeTab, setActiveTab] = useState('chats');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleTabSelect = (tab) => setActiveTab(tab);

    const searchUsers = async (query) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/search_users/?q=${query}`);
            const results = Array.isArray(response.data) ? response.data : [];
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching users:', error);
            setSearchResults([]);
        }
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        onSelectUser(user);
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h5 className="sidebar-title">Чаты</h5>
                <InputGroup className="mb-3">
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
                </InputGroup>
                <Nav variant="tabs" defaultActiveKey="chats" onSelect={handleTabSelect}>
                    <Nav.Item>
                        <Nav.Link eventKey="chats">Чат</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <ListGroup className="chat-list">
                {activeTab === 'chats' && (
                    <ul
                        style={{
                            listStyle: 'none',
                            margin: 0,
                            padding: 0,
                            maxHeight: 'inherit',
                            overflowY: 'auto',
                            backgroundColor: '#383838',
                        }}
                    >
                        {searchResults.map(user => (
                            <li
                                key={user.id}
                                style={{
                                    padding: '10px',
                                    borderBottom: '1px solid #232323',
                                    cursor: 'pointer',
                                    backgroundColor: selectedUser && selectedUser.id === user.id ? '#474747' : '#383838',
                                }}
                                onClick={() => handleUserSelect(user)}
                            >
                                {user.username}
                            </li>
                        ))}
                    </ul>
                )}
            </ListGroup>
        </div>
    );
};

export default Sidebar;