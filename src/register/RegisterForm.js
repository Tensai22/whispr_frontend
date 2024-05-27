import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RegisterForm = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const password = watch('password');
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
    }

    const onSubmit = async (data) => {
        try {
            const csrftoken = getCookie('csrftoken');
            const response = await axios.post('http://localhost:8000/api/register/', data, {
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
            setSuccessMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Username:</label>
                <input
                    name="username"
                    type="text"
                    {...register('username', {
                        required: 'Username is required',
                        pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: 'Invalid username'
                        }
                    })}
                />
                {errors.username && <span>{errors.username.message}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    name="email"
                    type="email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email address'
                        }
                    })}
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
                <label>Password:</label>
                <input
                    name="password"
                    type="password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters long'
                        }
                    })}
                />
                {errors.password && <span>{errors.password.message}</span>}
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    name="confirmPassword"
                    type="password"
                    {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                        validate: value => value === password || 'Passwords do not match'
                    })}
                />
                {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
            </div>
            <div>
                <label>Bio:</label>
                <textarea
                    name="bio"
                    {...register('bio')}
                />
            </div>
            <div>
                <label>Location:</label>
                <input
                    name="location"
                    type="text"
                    {...register('location')}
                />
            </div>
            <div>
                <label>Birth Date:</label>
                <input
                    name="birth_date"
                    type="date"
                    {...register('birth_date')}
                />
            </div>
            <button type="submit">Register</button>
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

export default RegisterForm;
