import React, { useState } from 'react';
import axios from 'axios';

const SendMessage = () => {
    const [recipient, setRecipient] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/send/', { recipient, text });
            if (response.status === 201) {
                alert('Сообщение успешно отправлено!');
                setRecipient('');
                setText('');
            } else {
                throw new Error('Произошла ошибка при отправке сообщения.');
            }
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
            alert('Произошла ошибка при отправке сообщения.');
        }
    };

    return (
        <div>
            <h2>Отправить сообщение</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="recipient">Получатель:</label>
                    <input
                        type="text"
                        id="recipient"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="text">Текст сообщения:</label>
                    <textarea
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};


export default SendMessage;
