// NewChatMenu.js
import React, { useState, useEffect } from 'react';
import { Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const NewChatMenu = ({
    isCreatingGroup,
    isCreatingCommunity,
    groupStep,
    selectedUsers,
    groupPhoto,
    groupName: initialGroupName,
    groupDescription: initialGroupDescription,
    communityName: initialCommunityName,
    communityDescription: initialCommunityDescription,
    communityError,
    onToggleMenu,
    onSetIsCreatingGroup,
    onSetIsCreatingCommunity,
    onSetGroupStep,
    onHandleAddToGroup,
    onHandlePhotoChange,
    onSetGroupName,
    onSetGroupDescription,
    onHandleCreateGroup,
    onHandleCreateCommunity,
    onSetCommunityName,
    onSetCommunityDescription,
    onSetCommunityError
}) => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
     const [groupName, setGroupName] = useState(initialGroupName || '');
     const [groupDescription, setGroupDescription] = useState(initialGroupDescription || '');
     const [communityName, setCommunityName] = useState(initialCommunityName || '');
     const [communityDescription, setCommunityDescription] = useState(initialCommunityDescription || '');

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
         const fetchUsers = async () => {
             try {
                   const response = await axios.get(
                     `http://localhost:8000/api/search_users/?q=${searchQuery}`,
                       {
                           headers: {
                               Authorization: `Bearer ${accessToken}`,
                           },
                       }
                   );
                    setUsers(response.data);
              } catch (error) {
                  console.error("Ошибка загрузки пользователей:", error);
                  setUsers([]);
              }
         };
         if (isCreatingGroup && groupStep === 1) {
            fetchUsers();
         }
    }, [isCreatingGroup, groupStep, accessToken, searchQuery]);

     const handleSearchChange = (event) => {
         setSearchQuery(event.target.value);
     };

      const filteredUsers = users.filter(user =>
           user.username.toLowerCase().includes(searchQuery.toLowerCase())
     );

    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
        onSetGroupName(e.target.value); // Update the parent if needed
    };

     const handleGroupDescriptionChange = (e) => {
         setGroupDescription(e.target.value);
        onSetGroupDescription(e.target.value); // Update the parent if needed
    };

    const handleCommunityNameChange = (e) => {
         setCommunityName(e.target.value);
         onSetCommunityName(e.target.value);
     };

     const handleCommunityDescriptionChange = (e) => {
        setCommunityDescription(e.target.value);
        onSetCommunityDescription(e.target.value);
    };

    return (
        <div className="menu-overlay">
            <div className="menu-content">
                {!isCreatingGroup && !isCreatingCommunity ? (
                    <>
                        <h2 className="menu-title">Новый Чат</h2>
                        <InputGroup className="mb-3 menu-search">
                            <FormControl placeholder="Поиск по имени..."
                            style={{ color: 'black' }}
                            />
                        </InputGroup>
                        <div className="menu-buttons">
                            <Button
                                variant="outline-light"
                                className="menu-button"
                                onClick={() => {
                                    onSetIsCreatingGroup(true);
                                    onSetIsCreatingCommunity(false);
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
                                    onSetIsCreatingCommunity(true);
                                    onSetIsCreatingGroup(false);
                                    onSetGroupStep(1);
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
                            onClick={onToggleMenu}
                        >
                            Закрыть
                        </Button>
                    </>
                ) : isCreatingGroup ? (
                    groupStep === 1 ? (
                        <>
                            <h2 className="menu-title">Добавление в группу</h2>
                             <InputGroup className="mb-3 menu-search">
                                 <FormControl
                                    placeholder="Поиск пользователей..."
                                   value={searchQuery}
                                  onChange={handleSearchChange}
                                 />
                            </InputGroup>
                            <ListGroup className="user-list">
                                {filteredUsers.map((user) => (
                                    <ListGroup.Item
                                        key={user.id}
                                        action
                                        onClick={() => onHandleAddToGroup(user)}
                                        active={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
                                    >
                                        {user.username}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <div className="menu-buttons">
                                <Button
                                    variant="secondary"
                                    className="menu-button"
                                    onClick={() => {
                                        onSetIsCreatingGroup(false);
                                        onSetGroupStep(1);
                                    }}
                                >
                                    Назад
                                </Button>
                                <Button
                                    variant="primary"
                                    className="menu-button"
                                    disabled={selectedUsers.length === 0}
                                    onClick={() => onSetGroupStep(2)}
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
                                        onChange={onHandlePhotoChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Название группы"
                                        value={groupName}
                                        onChange={handleGroupNameChange}
                                        style={{ backgroundColor: '#d3d3d3' }}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        as="textarea"
                                        placeholder="Описание группы"
                                         value={groupDescription}
                                        onChange={handleGroupDescriptionChange}
                                    />
                                </InputGroup>
                                <div className="menu-buttons">
                                    <Button
                                        variant="secondary"
                                        className="menu-button"
                                        onClick={() => onSetGroupStep(1)}
                                    >
                                        Назад
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className="menu-button"
                                        disabled={!groupName.trim()}
                                        onClick={onHandleCreateGroup}
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
                                    onChange={handleCommunityNameChange}
                                    style={{ backgroundColor: '#d3d3d3' }}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                    as="textarea"
                                    placeholder="Описание сообщества"
                                    value={communityDescription}
                                    onChange={handleCommunityDescriptionChange}
                                />
                            </InputGroup>
                            <div className="menu-buttons">
                                <Button
                                    variant="secondary"
                                    className="menu-button"
                                    onClick={() => {
                                        onSetIsCreatingCommunity(false);
                                        onSetCommunityError('');
                                    }}
                                >
                                    Назад
                                </Button>
                                <Button
                                    variant="primary"
                                    className="menu-button"
                                    disabled={!communityName.trim()}
                                    onClick={onHandleCreateCommunity}
                                >
                                    Создать
                                </Button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default NewChatMenu;