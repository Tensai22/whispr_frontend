import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('https://whispr.ru/api/login/', data);
            setSuccessMessage("Успешная авторизация");
            reset();
            navigate('/chat');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRedirect = () => {
        navigate('/reset_password');
    };

    const handleRedirectRegister = () => {
        navigate('/registration');
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="login-form text-white p-4 rounded">
                <h2>Вход</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="login" name="login"
                               placeholder="Логин..." {...register('username', {
                            required: 'username is required',
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: 'Invalid username'
                            }
                        })} />
                        {errors.username && <span>Username is required</span>}
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="password" name="password"
                               placeholder="Пароль..." {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters long'
                            }
                        })} />
                        {errors.password && <span>Password is required</span>}
                    </div>
                    <a onClick={handleRedirect} id="forgot-password" className="text-light">Забыли пароль?</a>
                    <div className="d-flex justify-content-between mt-3">
                        <button type="button" className="btn btn-secondary"
                                onClick={handleRedirectRegister}>Регистрация
                        </button>
                        <button type="submit" className="btn btn-primary">Войти</button>
                        {successMessage && <div>{successMessage}</div>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
