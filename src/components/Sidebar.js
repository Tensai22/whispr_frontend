import React, { useState } from 'react';
import '../css/chat.css';
import { ListGroup, InputGroup, FormControl, Nav, Button } from 'react-bootstrap';

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('chats');
    const [showMenu, setShowMenu] = useState(false);

    const handleTabSelect = (tab) => setActiveTab(tab);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        if (!showMenu) {
            document.body.classList.add('modal-open');  // Добавляем класс для размытия фона
        } else {
            document.body.classList.remove('modal-open');  // Убираем класс при закрытии меню
        }
    };

    return (
        <>
            <div className="main-content">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h5 className="sidebar-title">Чаты</h5>
                        <button className="new-chat-button" onClick={toggleMenu}>
                            <img src={require("../assets/New_chat.png")} alt="Новый чат" />
                        </button>
                        <InputGroup className="mb-3">
                            <FormControl placeholder="Поиск..." />
                        </InputGroup>
                        <Nav variant="tabs" defaultActiveKey="chats" onSelect={handleTabSelect}>
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
                    </div>
                    <ListGroup className="chat-list">
                        {activeTab === 'chats' && (
                            <>
                                {/* Список чатов */}
                            </>
                        )}
                    </ListGroup>
                </div>
            </div>

            {showMenu && (
         <div className="menu-overlay">
    <div className="menu-content">
        <h2 className="menu-title">Новый Чат</h2>
        <InputGroup className="mb-3 menu-search">
            <FormControl placeholder="Поиск по имени..." />
        </InputGroup>
        <div className="menu-buttons">
            <Button variant="outline-light" className="menu-button">
                <img src={require("../assets/communityPic.png")} alt="Группа" className="menu-icon" />
                Новая группа
            </Button>
            <Button variant="outline-light" className="menu-button">
                <img src={require("../assets/community.png")} alt="Сообщество" className="menu-icon" />
                Новое сообщество
            </Button>
        </div>
        <h5>Пользователи</h5>
        <ListGroup className="user-list">
            {/* Здесь список пользователей рололо */}
        </ListGroup>
        <Button variant="danger" className="close-menu" onClick={toggleMenu}>Закрыть</Button>
    </div>

</div>


            )}
        </>
    );
};

export default Sidebar;
