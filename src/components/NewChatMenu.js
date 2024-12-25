// NewChatMenu.js
import React from 'react';
import { Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';

const NewChatMenu = ({
    isCreatingGroup,
    isCreatingCommunity,
    groupStep,
    selectedUsers,
    groupPhoto,
    groupName,
    groupDescription,
    communityName,
    communityDescription,
    communityError,
    users,
    onToggleMenu,
    onSetIsCreatingGroup,
    onSetIsCreatingCommunity,
    onSetGroupStep,
    onHandleAddToGroup,
    onHandlePhotoChange,
    onSetGroupName,
    onSetGroupDescription,
    onHandleCreateCommunity,
    onSetCommunityName,
    onSetCommunityDescription,
    onSetCommunityError
}) => {
    return (
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
                                <FormControl placeholder="Поиск пользователей..." />
                            </InputGroup>
                            <ListGroup className="user-list">
                                {users.map((user, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        action
                                        onClick={() => onHandleAddToGroup(user)}
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
                                        onChange={(e) => onSetGroupName(e.target.value)}
                                        style={{ backgroundColor: '#d3d3d3' }}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        as="textarea"
                                        placeholder="Описание группы"
                                        value={groupDescription}
                                        onChange={(e) => onSetGroupDescription(e.target.value)}
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
                                    onChange={(e) => onSetCommunityName(e.target.value)}
                                    style={{ backgroundColor: '#d3d3d3' }}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl
                                    as="textarea"
                                    placeholder="Описание сообщества"
                                    value={communityDescription}
                                    onChange={(e) => onSetCommunityDescription(e.target.value)}
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