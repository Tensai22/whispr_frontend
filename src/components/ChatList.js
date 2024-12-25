// ChatList.js
import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ChatList = ({ searchResults, selectedUser, onUserSelect }) => {
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
                        onClick={() => onUserSelect(user)}
                    >
                        {user.username}
                    </li>
                ))}
            </ul>
        </ListGroup>
    );
};

export default ChatList;