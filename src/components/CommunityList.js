// CommunityList.js
import React from 'react';
import { ListGroup } from 'react-bootstrap'; // Импорт ListGroup

const CommunityList = ({ communities }) => {
    return (
        <ListGroup className="chat-list">
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
        </ListGroup>
    );
};

export default CommunityList;