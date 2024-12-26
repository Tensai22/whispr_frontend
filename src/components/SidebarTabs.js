// SidebarTabs.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import '../css/SidebarTabs.css';
const SidebarTabs = ({ activeTab, onTabSelect }) => {
    return (
        <Nav variant="tabs" defaultActiveKey="chats" onSelect={onTabSelect} className="nav-tabs">
            <Nav.Item>
                <Nav.Link eventKey="chats">Чат</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="groups">Группа</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="communities">Сообщества</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default SidebarTabs;