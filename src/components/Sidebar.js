import React, { useState } from 'react';
import '../css/chat.css';
import { ListGroup, InputGroup, FormControl, Nav, Button } from 'react-bootstrap';
import Messenger from "../chatting/Messenger";
import {useForm} from "react-hook-form";
import axios from "axios";

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('chats');

    const [showMenu, setShowMenu] = useState(false);

    const [isCreatingGroup, setIsCreatingGroup] = useState(false);
    const [groupStep, setGroupStep] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupPhoto, setGroupPhoto] = useState(require('../assets/communityPic.png'));
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [isCreatingCommunity, setIsCreatingCommunity] = useState(false);
    const [communityStep, setCommunityStep] = useState(1);
    const [communityName, setCommunityName] = useState('');
    const [communityDescription, setCommunityDescription] = useState('');
    const [communityPhoto, setCommunityPhoto] = useState(require('../assets/communityPic.png'));


    const handleCommunityPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setCommunityPhoto(reader.result);
            reader.readAsDataURL(file);
        }
    };


    const handleTabSelect = (tab) => setActiveTab(tab);

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

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        setIsCreatingGroup(false);
        setIsCreatingCommunity(false)
        setGroupStep(1);
        setCommunityStep(1)
        if (!showMenu) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    };

    const handleAddToGroup = (user) => {
        setSelectedUsers((prev) =>
            prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
        );
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setGroupPhoto(reader.result);
            reader.readAsDataURL(file);
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
                                                backgroundColor:
                                                    selectedUser && selectedUser.id === user.id ? '#474747' : '#383838',
                                            }}
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            {user.username}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </ListGroup>
                </div>
            </div>

            {showMenu && (
                <div className="menu-overlay">
                    <div className="menu-content">
                        {!isCreatingGroup && !isCreatingCommunity && groupStep && communityStep === 1 ? (
                            <>
                                <h2 className="menu-title">Новый Чат</h2>
                                <InputGroup className="mb-3 menu-search">
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
                                <div className="menu-buttons">
                                    <Button
                                        variant="outline-light"
                                        className="menu-button"
                                        onClick={() => setIsCreatingGroup(true)}
                                    >
                                        <img
                                            src={require('../assets/communityPic.png')}
                                            alt="Группа"
                                            className="menu-icon"
                                        />
                                        Новая группа
                                    </Button>
                                    <Button
                                        variant="outline-light"
                                        className="menu-button"
                                        onClick={() => {
                                            setIsCreatingCommunity(true);
                                        }}
                                    >
                                        <img
                                            src={require('../assets/community.png')}
                                            alt="Сообщество"
                                            className="menu-icon"
                                        />
                                        Новое сообщество
                                    </Button>
                                </div>
                                <h5>Пользователи</h5>
                                <ListGroup className="chat-list">
                        {activeTab === 'chats' && (
                            <>
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
                                                backgroundColor:
                                                    selectedUser && selectedUser.id === user.id ? '#474747' : '#383838',
                                            }}
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            {user.username}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </ListGroup>
                                <Button
                                    variant="danger"
                                    className="close-menu"
                                    onClick={toggleMenu}
                                >
                                    Закрыть
                                </Button>
                            </>
                        ) : isCreatingCommunity ? (
                            <div className="menu-content">
                                <h2 className="menu-title">Создание сообщества</h2>
                                <div className="group-photo-container" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'}}>

                                    <label htmlFor="group-photo-upload" className="group-photo-label" >
                                        <span className="photo-text">
                                            <img className="menu-icon"
                                            src={communityPhoto} /></span>
                                    </label>
                                    <input
                                        id="group-photo-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCommunityPhotoChange}
                                        style={{ display: 'none'}}
                                    />
                                </div>

                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Название сообщества"
                                        value={communityName}
                                        onChange={(e) => setCommunityName(e.target.value)}
                                        style={{ backgroundColor: '#d3d3d3' }}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        as="textarea"
                                        placeholder="Описание сообществы"
                                        value={communityDescription}
                                        onChange={(e) => setCommunityDescription(e.target.value)}
                                    />
                                </InputGroup>
                                <div className="menu-buttons">
                                    <Button
                                        variant="secondary"
                                        className="menu-button"
                                        onClick={() => {
                                            setIsCreatingCommunity(false)
                                            setCommunityStep(1)
                                    }}

                                    >
                                        Назад
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className="menu-button"
                                        disabled={!communityName.trim()}
                                        onClick={() => alert('Сообщество успешно создана!')}
                                    >
                                        Далее
                                    </Button>
                               </div>
                            </div>
                        ) : groupStep === 1 && (
                            <>
                                <h2 className="menu-title">Добавление в группу</h2>
                                <InputGroup className="mb-3 menu-search">
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
                                <ListGroup className="user-list">
                                    {activeTab === 'chats' && (
                                        <>
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
                                                            backgroundColor:
                                                                selectedUser && selectedUser.id === user.id ? '#474747' : '#383838',
                                                        }}
                                                        onClick={() => setSelectedUser(user)}
                                                    >
                                                        {user.username}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </ListGroup>
                                <div className="menu-buttons">
                                    <Button
                                        variant="secondary"
                                        className="menu-button"
                                        onClick={() => setIsCreatingGroup(false)}
                                    >
                                        Назад
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className="menu-button"
                                        disabled={selectedUsers.length === 0}
                                        onClick={() => setGroupStep(2)}
                                    >
                                        Далее
                                    </Button>
                                </div>
                            </>
                        )
                        }

                        {groupStep === 2 && (
                            <div className="menu-content" >
                                <h2 className="menu-title">Создание группы</h2>
                                <div className="group-photo-container" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'}}>
                                    <label htmlFor="group-photo-upload" className="group-photo-label">
                                        <span className="photo-text">
                                            <img className="menu-icon"
                                            src={groupPhoto} />
                                        </span>
                                    </label>
                                    <input
                                        id="group-photo-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        style={{ display: 'none'}}
                                    />
                                </div>

                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Название группы"
                                        value={groupName}
                                        onChange={(e) => setGroupName(e.target.value)}
                                        style={{ backgroundColor: '#d3d3d3' }}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        as="textarea"
                                        placeholder="Описание группы"
                                        value={groupDescription}
                                        onChange={(e) => setGroupDescription(e.target.value)}
                                    />
                                </InputGroup>
                                <div className="menu-buttons">
                                    <Button
                                        variant="secondary"
                                        className="menu-button"
                                        onClick={() => setGroupStep(1)}
                                    >
                                        Назад
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className="menu-button"
                                        disabled={!groupName.trim()}
                                        onClick={() => alert('Группа успешно создана!')}
                                    >
                                        Далее
                                    </Button>
                               </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
