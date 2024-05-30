import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { uidb64, token } = useParams(); // Получаем параметры из URL
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    const onSubmit = async (data) => {
        try {
            const csrftoken = getCookie('csrftoken');
            const response = await axios.post(`http://localhost:8000/api/password_reset_confirm/${uidb64}/${token}/`, data, {
                headers: {
                    'X-CSRFToken': csrftoken,
                }
            });
            setSuccessMessage('Успешная регистрация');
            setErrorMessage('');
            reset();
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Ошибка при регистрации');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>New Password:</label>
                <input
                    name="new_password"
                    type="password"
                    {...register('new_password', { required: 'New password is required' })}
                />
                {errors.new_password && <span>{errors.new_password.message}</span>}
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    name="confirm_password"
                    type="password"
                    {...register('confirm_password', { required: 'Confirm password is required' })}
                />
                {errors.confirm_password && <span>{errors.confirm_password.message}</span>}
            </div>
            <button type="submit">Reset Password</button>
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

export default ResetPage;
