import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CommunityList = ({ communities, onCommunitySelect }) => {
    return (
        <ListGroup className="chat-list">
            {communities.map(community => (
                <ListGroup.Item
                    key={community.id}
                    action
                    as={Link}
                    to={`/communities/${community.id}`}
                    onClick={() => onCommunitySelect(community.id)}
                >
                    <div className="d-flex align-items-center">
                        <img
                            src={community.photo || require('../assets/community.png')} // Убедитесь, что путь к дефолтной картинке правильный
                            alt="Community"
                            className="community-img mr-3"
                            style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                        />
                        {community.name}
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default CommunityList;