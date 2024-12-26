import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import '../css/CommunityDetails.css';

const CommunityDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [community, setCommunity] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [moderators, setModerators] = useState([]);
    const [members, setMembers] = useState([]);
    const [isMember, setIsMember] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchCommunityDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `http://localhost:8000/chat/communities/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setCommunity(response.data);
                setIsMember(response.data.members.includes(parseInt(localStorage.getItem('user_id'))));

                // Получение информации об админе
                if (response.data.admin) {
                    const adminResponse = await axios.get(
                        `http://localhost:8000/api/user/${response.data.admin.id}/`, // Замените на ваш эндпоинт
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    setAdmin(adminResponse.data);
                }

                // Получение информации о модераторах
                const moderators = await Promise.all(
                    response.data.moderators.map(async (moderator) => {
                        const moderatorResponse = await axios.get(
                            `http://localhost:8000/api/user/${moderator.id}/`, // Замените на ваш эндпоинт
                            {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            }
                        );
                        return moderatorResponse.data;
                    })
                );
                setModerators(moderators);

                // Получение информации об участниках
                const members = await Promise.all(
                    response.data.members.map(async (memberId) => {
                        const memberResponse = await axios.get(
                            `http://localhost:8000/api/user/${memberId}/`,
                            {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            }
                        );
                        return memberResponse.data;
                    })
                );
                setMembers(members);

            } catch (error) {
                console.error('Ошибка при загрузке информации о сообществе:', error);
                setError('Не удалось загрузить информацию о сообществе.');
            } finally {
                setIsLoading(false);
            }
        };

        if (accessToken) {
            fetchCommunityDetails();
        } else {
            navigate('/login');
        }
    }, [id, accessToken, navigate]);

    const handleSubscribe = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8000/chat/communities/${id}/join/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setIsMember(true);
        } catch (error) {
        console.error('Ошибка при подписке на сообщество:', error);
        console.error(error.response);

        if (error.response && error.response.status === 400) {
            if (error.response.data.message === 'Вы уже являетесь участником этого сообщества') {
                alert('Вы уже являетесь участником этого сообщества!');
            } else {
                setError('Ошибка при подписке на сообщество.');
            }
        } else {
            setError('Не удалось подписаться на сообщество.');
        }
    }
};

    const handleUnsubscribe = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8000/chat/communities/${id}/leave/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setIsMember(false);
        } catch (error) {
            console.error('Ошибка при отписке от сообщества:', error);
        }
    };

    if (isLoading) {
        return <div className="community-details">Загрузка...</div>;
    }

    if (error) {
        return <div className="community-details error">{error}</div>;
    }

    if (!community) {
        return <div className="community-details">Сообщество не найдено.</div>;
    }

    return (
        <div className="community-details">
            <div className="community-header">
                <img src={community.photo || require('../assets/community.png')} alt="Фото сообщества" className="community-photo" />
                <div className="community-info">
                    <h2>{community.name}</h2>
                    <p>{community.description}</p>
                    {accessToken && (
                        <Button
                            variant={isMember ? 'danger' : 'primary'}
                            onClick={isMember ? handleUnsubscribe : handleSubscribe}
                        >
                            {isMember ? 'Отписаться' : 'Подписаться'}
                        </Button>
                    )}
                </div>
            </div>

            <div className="community-members">
                <h3>Участники группы</h3>
                {admin && (
                    <div>
                        <h4>Администратор</h4>
                        <div className="member">
                            <img src={`http://localhost:8000${admin.profile_photo}` || require('../assets/default-avatar.png')} alt="Фото админа" className="member-photo" />
                            <span>{admin.username}</span>
                        </div>
                    </div>
                )}

                {moderators.length > 0 && (
                    <div>
                        <h4>Модераторы</h4>
                        {moderators.map((moderator) => (
                            <div key={moderator.id} className="member">
                                <img src={`http://localhost:8000${admin.moderator.profile_photo}` || require('../assets/default-avatar.png')} alt="Фото модератора" className="member-photo" />
                                <span>{moderator.username}</span>
                            </div>
                        ))}
                    </div>
                )}

                {members.length > 0 && (
                    <div>
                        <h4>Участники</h4>
                        {members.map((member) => (
                            <div key={member.id} className="member">
                                <img src={`http://localhost:8000${member.profile_photo}` || require('../assets/default-avatar.png')} alt="Фото участника" className="member-photo" />
                                <span>{member.username}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommunityDetails;