import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import * as ReactRouterDOM from "react-router-dom";
import axios from 'axios';
import {useNavigate} from "react-router-dom";


const LoginForm = (redirectToResetPassword) => {
        const {register, handleSubmit, formState: {errors}, reset} = useForm();
        const [successMessage, setSuccessMessage] = useState('');

        const [UserNameAdd, setUserNameAdd] = useState(false);
        const [userName, setUserName] = useState('');

        const navigate = useNavigate();

        const handleRedirect = () => {
            navigate('/reset_password_by_email');
        };


        const onSubmit = async (data) => {
            try {
                const response = await axios.post('http://localhost:8000/api/login/', data);
                console.log('Success:', response.data);
                setUserName(data.username)
                setSuccessMessage("Успешная авторизация");
                setUserNameAdd(true);
                reset()
            } catch (error) {
                console.error('Error:', error);
            }
        };


        return (
            <>
                <div>
                    {UserNameAdd ? (
                        <div align="right">
                            <h2>Вы успешно вошли в систему</h2>
                            <h1>{userName}</h1>
                        </div>
                    ) : (
                        <div>
                            <h1 align="right">Пользователь не вошел в систему</h1>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Username:</label>
                        <input name="username"
                               type="text"
                               {...register('username', {
                                   required: 'username is required',
                                   pattern: {
                                       value: /^[a-zA-Z0-9]+$/,
                                       message: 'Invalid username'
                                   }
                               })}
                        />
                        {errors.username && <span>Username is required</span>}
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
                        {errors.password && <span>Password is required</span>}
                    </div>
                    <button type="submit">Login</button>
                    {successMessage && <div>{successMessage}</div>}
                </form>
                <button onClick={handleRedirect}>Go to Target Page</button>
            </>


        );
    }
;

export default LoginForm;
