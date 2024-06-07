import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/log_reg.css';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const password = watch('password');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

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
    }

    const goLogin = () => {
        navigate('/login');
    };

    const onSubmit = async (data) => {
        try {
            const csrftoken = getCookie('csrftoken');
            const response = await axios.post('http://localhost:8000/api/register/', data, {
                headers: {
                    'X-CSRFToken': csrftoken,
                },
                withCredentials: true  // Включение сессионных куки
            });
            setSuccessMessage('Успешная регистрация');
            setErrorMessage('');
            reset();
            navigate('/chat');
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error || 'Ошибка при регистрации');
            } else {
                setErrorMessage('Ошибка при регистрации');
            }
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="registration-form text-white p-4 rounded">
                <h2>Регистрация</h2>
                <form id="registrationForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="username" name="username"
                               placeholder="Имя пользователя..." {...register('username', {
                            required: 'Username is required',
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: 'Invalid username'
                            }
                        })}/>
                        {errors.username && <span>{errors.username.message}</span>}
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="email" name="email" placeholder="Эл.почта..."
                               {...register('email', {
                                   required: 'Email is required',
                                   pattern: {
                                       value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                       message: 'Invalid email address'
                                   }
                               })}/>
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="password" name="password"
                               placeholder="Пароль..." {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters long'
                            }
                        })}/>
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="confirm-password" name="confirm-password"
                               placeholder="Подтвердите пароль..." {...register('confirmPassword', {
                            required: 'Confirm Password is required',
                            validate: value => value === password || 'Passwords do not match'
                        })}/>
                        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                    </div>
                    <div className="mb-3">
                        <input type="date" className="form-control" id="birth_date"
                               name="birth_date" {...register('birth_date')}/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={goLogin}>Назад</button>
                        <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
                        {successMessage && <div>{successMessage}</div>}
                        {errorMessage && <div>{errorMessage}</div>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
