import React, { useState } from 'react';
import '../css/chat.css';
import { ListGroup, InputGroup, FormControl, Nav } from 'react-bootstrap';

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('chats');

    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h5 className="sidebar-title">Чаты</h5>
                    <button className="new-chat-button">
                        <img src={require("../assets/New_chat.png")} alt="Новый чат"/>
                    </button>
            <InputGroup className="mb-3">
                <FormControl placeholder="Поиск..." />
            </InputGroup>
            <Nav variant="tabs" defaultActiveKey="chats" onSelect={handleTabSelect}>
                <Nav.Item>
                    <Nav.Link eventKey="chats" onClick={() => handleTabSelect('chats')}>Чат</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="groups" onClick={() => handleTabSelect('groups')}>Группа</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="communities" onClick={() => handleTabSelect('community')}>Сообщества</Nav.Link>
                </Nav.Item>
            </Nav>
            </div>
            <ListGroup className="chat-list">
                {activeTab === 'chats' && (
                    <>

                        {/* Добавьте остальные чаты аналогично */}
                    </>
                )}
                {/* Добавьте содержимое для вкладок групп и сообществ */}
            </ListGroup>
        </div>
    );
};

export default Sidebar;
