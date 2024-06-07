import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/change_password.css';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";

const ChangePasswordForm = () => {
    const {uidb64, token} = useParams(); // Получаем параметры из URL
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm();

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

    function getCookie(name) {
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
    }

    const goBack = () => {
        navigate('/login');
    };

    return (
        <div>
            <Header/>
            <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
                <div className="change-password-form">
                    <h2>Подтверждения смены пароля</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="new_password"
                            className="form-control mb-3"
                            placeholder="Введите новый пароль..."
                            {...register('new_password', {
                                required: 'Новый пароль обязателен',
                                minLength: {
                                    value: 8,
                                    message: 'Пароль должен быть не менее 8 символов'
                                }
                            })}
                        />
                        {errors.newPassword && <span className="text-danger">{errors.newPassword.message}</span>}
                        <input
                            name="confirm_password"
                            type="password"
                            className="form-control mb-3"
                            placeholder="Подтвердите пароль..."
                            {...register('confirm_password', {
                                required: 'Подтверждение пароля обязательно',
                                validate: value =>
                                    value === watch('new_password') || 'Пароли не совпадают'
                            })}
                        />
                        {errors.confirmPassword &&
                            <span className="text-danger">{errors.confirmPassword.message}</span>}
                        <div className="buttons d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary" onClick={goBack}>Назад</button>
                            <button type="submit" className="btn btn-primary">Подтвердить</button>
                        </div>
                        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};
export default ChangePasswordForm;
