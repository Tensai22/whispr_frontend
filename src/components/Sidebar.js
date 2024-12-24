import React, { useState, useEffect } from 'react';
import '../css/chat.css';
import { ListGroup, InputGroup, FormControl, Nav, Button } from 'react-bootstrap';
import axios from 'axios';

const Sidebar = ({ onSelectUser }) => {
    const [activeTab, setActiveTab] = useState('chats');
    const [showMenu, setShowMenu] = useState(false);
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);
    const [groupStep, setGroupStep] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupPhoto, setGroupPhoto] = useState(require('../assets/communityPic.png'));
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const users = ['Пользователь 1', 'Пользователь 2', 'Пользователь 3'];
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [communities, setCommunities] = useState([]); // Состояние для хранения списка сообществ
    const [communityError, setCommunityError] = useState('');

    const [isCreatingCommunity, setIsCreatingCommunity] = useState(false);
    const [communityName, setCommunityName] = useState('');
    const [communityDescription, setCommunityDescription] = useState('');
    const accessToken = localStorage.getItem('accessToken');

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

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        setIsCreatingGroup(false);
        setIsCreatingCommunity(false);
        setGroupStep(1);
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

    const handleCreateCommunity = async () => {
        setCommunityError('');
        try {
            const response = await axios.post(
                'http://localhost:8000/chat/communities/create/',
                {
                    name: communityName,
                    description: communityDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log('Community created:', response.data);
            setIsCreatingCommunity(false);
            setCommunityName('');
            setCommunityDescription('');
            toggleMenu();
            fetchUserCommunities(); // Обновляем список сообществ после создания нового
        } catch (error) {
            console.error('Error creating community:', error);
            setCommunityError(
                'Не удалось создать сообщество. Пожалуйста, попробуйте еще раз.'
            );
        }
    };

    // Функция для получения списка сообществ, в которых состоит пользователь
    const fetchUserCommunities = async () => {
        try {
            const response = await axios.get('http://localhost:8000/chat/user_communities/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setCommunities(response.data);
        } catch (error) {
            console.error('Error fetching user communities:', error);
            // Обработка ошибки (например, показ сообщения пользователю)
        }
    };

    // Получаем список сообществ пользователя при активации вкладки "Сообщества"
    useEffect(() => {
        if (activeTab === 'communities') {
            fetchUserCommunities();
        }
    }, [activeTab, accessToken]);

    return (
        <>
            <div className="main-content">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h5 className="sidebar-title">Чаты</h5>
                        <button className="new-chat-button" onClick={toggleMenu}>
                            <img src={require('../assets/New_chat.png')} alt="Новый чат" />
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
                                    fontSize: '16px',
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
                                                selectedUser && selectedUser.id === user.id
                                                    ? '#474747'
                                                    : '#383838',
                                        }}
                                        onClick={() => handleUserSelect(user)}
                                    >
                                        {user.username}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {/* Отображение списка сообществ на вкладке "Сообщества" */}
                        {activeTab === 'communities' && (
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
                                {communities.map(community => (
                                    <li
                                        key={community.id}
                                        style={{
                                            padding: '10px',
                                            borderBottom: '1px solid #232323',
                                            cursor: 'pointer',
                                            backgroundColor: '#383838',
                                        }}
                                    >
                                        {community.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </ListGroup>
                </div>
            </div>

            {showMenu && (
                <div className="menu-overlay">
                    <div className="menu-content">
                        {!isCreatingGroup && !isCreatingCommunity ? (
                            <>
                                <h2 className="menu-title">Новый Чат</h2>
                                <InputGroup className="mb-3 menu-search">
                                    <FormControl placeholder="Поиск по имени..." />
                                </InputGroup>
                                <div className="menu-buttons">
                                    <Button
                                        variant="outline-light"
                                        className="menu-button"
                                        onClick={() => {
                                            setIsCreatingGroup(true);
                                            setIsCreatingCommunity(false);
                                        }}
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
                                            setIsCreatingGroup(false);
                                            setGroupStep(1);
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
                                <ListGroup className="user-list">
                                    {/* Здесь список пользователей */}
                                </ListGroup>
                                <Button
                                    variant="danger"
                                    className="close-menu"
                                    onClick={toggleMenu}
                                >
                                    Закрыть
                                </Button>
                            </>
                        ) : isCreatingGroup ? (
                            groupStep === 1 ? (
                                <>
                                    <h2 className="menu-title">Добавление в группу</h2>
                                    <InputGroup className="mb-3 menu-search">
                                        <FormControl placeholder="Поиск пользователей..." />
                                    </InputGroup>
                                    <ListGroup className="user-list">
                                        {users.map((user, index) => (
                                            <ListGroup.Item
                                                key={index}
                                                action
                                                onClick={() => handleAddToGroup(user)}
                                                active={selectedUsers.includes(user)}
                                            >
                                                {user}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <div className="menu-buttons">
                                        <Button
                                            variant="secondary"
                                            className="menu-button"
                                            onClick={() => {
                                                setIsCreatingGroup(false);
                                                setGroupStep(1);
                                            }}
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
                            ) : (
                                groupStep === 2 && (
                                    <div className="menu-content">
                                        <h2 className="menu-title">Создание группы</h2>
                                        <div className="group-photo-container">
                                            <label
                                                htmlFor="group-photo-upload"
                                                className="group-photo-label"
                                            >
                                                <span className="photo-text">
                                                    <img
                                                        className="menu-icon"
                                                        src={groupPhoto}
                                                        alt="Group Photo"
                                                    />
                                                </span>
                                            </label>
                                            <input
                                                id="group-photo-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handlePhotoChange}
                                                style={{ display: 'none' }}
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
                                                onChange={(e) =>
                                                    setGroupDescription(e.target.value)
                                                }
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
                                )
                            )
                        ) : (
                            isCreatingCommunity && (
                                <div className="menu-content">
                                    <h2 className="menu-title">Создание сообщества</h2>
                                    {communityError && (
                                        <div
                                            className="error-message"
                                            style={{ color: 'red', marginBottom: '10px' }}
                                        >
                                            {communityError}
                                        </div>
                                    )}
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
                                            placeholder="Описание сообщества"
                                            value={communityDescription}
                                            onChange={(e) =>
                                                setCommunityDescription(e.target.value)
                                            }
                                        />
                                    </InputGroup>
                                    <div className="menu-buttons">
                                        <Button
                                            variant="secondary"
                                            className="menu-button"
                                            onClick={() => {
                                                setIsCreatingCommunity(false);
                                                setCommunityError('');
                                            }}
                                        >
                                            Назад
                                        </Button>
                                        <Button
                                            variant="primary"
                                            className="menu-button"
                                            disabled={!communityName.trim()}
                                            onClick={handleCreateCommunity}
                                        >
                                            Создать
                                        </Button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;