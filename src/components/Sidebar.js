// Sidebar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarHeader from './SidebarHeader';
import SidebarTabs from './SidebarTabs';
import ChatList from './ChatList';
import CommunityList from './CommunityList';
import NewChatMenu from './NewChatMenu';
import '../css/chat.css';

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
    const [communities, setCommunities] = useState([]);
    const [communityError, setCommunityError] = useState('');
    const [isCreatingCommunity, setIsCreatingCommunity] = useState(false);
    const [communityName, setCommunityName] = useState('');
    const [communityDescription, setCommunityDescription] = useState('');
    const accessToken = localStorage.getItem('accessToken');

    const handleTabSelect = (tab) => setActiveTab(tab);

    const searchUsers = async (event) => {
        const query = event.target.value;
        try {
            const response = await axios.get(
                `http://localhost:8000/api/search_users/?q=${query}`
            );
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
            fetchUserCommunities();
        } catch (error) {
            console.error('Error creating community:', error);
            setCommunityError(
                'Не удалось создать сообщество. Пожалуйста, попробуйте еще раз.'
            );
        }
    };

    const fetchUserCommunities = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8000/chat/user_communities/',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setCommunities(response.data);
        } catch (error) {
            console.error('Error fetching user communities:', error);
        }
    };

    useEffect(() => {
        if (activeTab === 'communities') {
            fetchUserCommunities();
        }
    }, [activeTab, accessToken]);

    return (
        <>
            <div className="main-content">
                <div className="sidebar">
                    <SidebarHeader
                        onSearch={searchUsers}
                        onNewChat={toggleMenu}
                        activeTab={activeTab}
                        onTabSelect={handleTabSelect}
                    />
                    {/*<SidebarTabs activeTab={activeTab} onTabSelect={handleTabSelect} />*/}

                    {activeTab === 'chats' && (
                        <ChatList
                            searchResults={searchResults}
                            selectedUser={selectedUser}
                            onUserSelect={handleUserSelect}
                        />
                    )}
                    {activeTab === 'communities' && (
                        <CommunityList communities={communities} />
                    )}
                </div>
            </div>

            {showMenu && (
                <NewChatMenu
                    isCreatingGroup={isCreatingGroup}
                    isCreatingCommunity={isCreatingCommunity}
                    groupStep={groupStep}
                    selectedUsers={selectedUsers}
                    groupPhoto={groupPhoto}
                    groupName={groupName}
                    groupDescription={groupDescription}
                    communityName={communityName}
                    communityDescription={communityDescription}
                    communityError={communityError}
                    users={users}
                    onToggleMenu={toggleMenu}
                    onSetIsCreatingGroup={setIsCreatingGroup}
                    onSetIsCreatingCommunity={setIsCreatingCommunity}
                    onSetGroupStep={setGroupStep}
                    onHandleAddToGroup={handleAddToGroup}
                    onHandlePhotoChange={handlePhotoChange}
                    onSetGroupName={setGroupName}
                    onSetGroupDescription={setGroupDescription}
                    onHandleCreateCommunity={handleCreateCommunity}
                    onSetCommunityName={setCommunityName}
                    onSetCommunityDescription={setCommunityDescription}
                    onSetCommunityError={setCommunityError}
                />
            )}
        </>
    );
};

export default Sidebar;