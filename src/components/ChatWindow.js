// ChatWindow.js
import React from 'react';
import '../css/log_reg.css';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

const ChatWindow = () => {
    return (
        <div className="chat-window">
            <div className="messages">

            </div>
            <Form className="message-input">
                <InputGroup>
                    <FormControl placeholder="Написать сообщение..." />
                    <Button className="btn-custom" type="submit" variant="primary">Отправить</Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default ChatWindow;
