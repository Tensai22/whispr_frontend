import React from 'react';
import '../css/log_reg.css';
import { ListGroup, InputGroup, FormControl } from 'react-bootstrap';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <InputGroup className="mb-3">
                <FormControl placeholder="Поиск..." />
            </InputGroup>
            <ListGroup>
            </ListGroup>
        </div>
    );
};

export default Sidebar;
