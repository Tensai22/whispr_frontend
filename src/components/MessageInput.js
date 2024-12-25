// MessageInput.js
import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import '../css/MessageInput.css';

const MessageInput = ({ onSendMessage, disabled }) => {
    const [newMessage, setNewMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleRemoveSelectedFile = () => {
        setSelectedFile(null);
        document.getElementById('fileInput').value = ''; // Очистка значения инпута
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.trim() && !selectedFile) {
            alert('Введите сообщение или выберите файл перед отправкой.');
            return;
        }
        onSendMessage(newMessage, selectedFile);
        setNewMessage('');
        setSelectedFile(null);
        document.getElementById('fileInput').value = ''; // Очистка инпута файла после отправки
    };

    const renderSelectedFilePreview = () => {
        if (!selectedFile) {
            return null;
        }

        const fileURL = URL.createObjectURL(selectedFile);
        const fileType = selectedFile.type;

        return (
            <div className="selected-file-preview">
                {fileType.startsWith('image/') ? (
                    <img src={fileURL} alt={selectedFile.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                ) : (
                    <span>{selectedFile.name}</span>
                )}
                <Button variant="outline-danger" size="sm" onClick={handleRemoveSelectedFile}>
                    Удалить
                </Button>
            </div>
        );
    };

    return (
        <div className="message-input">
            {renderSelectedFilePreview()}
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <FormControl
                        type="file"
                        id="fileInput"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="fileInput" className="btn btn-secondary">
                        Выбрать файл
                    </label>
                    <FormControl
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Введите сообщение..."
                    />
                    <Button type="submit" variant="primary" disabled={disabled}>
                        Отправить
                    </Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default MessageInput;