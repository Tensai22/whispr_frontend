import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";

const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('accessToken')) {

            navigate('/chat');
        }
    }, [navigate]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login/', data);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);
            } else {
                 console.error('localStorage is not available');
            }
            reset();
            navigate('/chat');
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("Неверный логин или пароль");
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
                            required: 'Имя пользователя обязательно',
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: 'Неверное имя пользователя'
                            }
                        })} />
                        {errors.username && <span>{errors.username.message}</span>}
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="password" name="password"
                               placeholder="Пароль..." {...register('password', {
                            required: 'Пароль обязателен',
                            minLength: {
                                value: 8,
                                message: 'Пароль должен быть не менее 8 символов'
                            }
                        })} />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <a onClick={handleRedirect} id="forgot-password" className="text-light">Забыли пароль?</a>
                    <div className="d-flex justify-content-between mt-3">
                        <button type="button" className="btn btn-secondary"
                                onClick={handleRedirectRegister}>Регистрация
                        </button>
                        <button type="submit" className="btn btn-primary">Войти</button>
                        {errorMessage && <div className="text-danger">{errorMessage}</div>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;