// src/components/ItemList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/items/')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

        useEffect(() => {
        axios.get('http://localhost:8000/api/users/')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);


    return (
        <div>
            <h1 align="left">Chats</h1>
            <div>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>{item.name}: {item.description}</li>
                    ))}
                </ul>
            </div>
            <div>
                <a href={'#'}>
                    {users.map(user => (
                        <li key={user.id}>{user.name}: {user.email}</li>
                    ))
                    }
                </a>
            </div>
        </div>
    );
};

export default ItemList;
