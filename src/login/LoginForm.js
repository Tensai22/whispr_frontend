import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';


const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [successMessage, setSuccessMessage] = useState('');

    const [UserNameAdd, setUserNameAdd] = useState(false);
    const [userEmail, setUserEmail] = useState('');


    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login/', data);
            console.log('Success:', response.data);
            setUserEmail(data.email)
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
                    <h1>{userEmail}</h1>
                </div>
            ) : (
                <div>
                    <h1 align="right">Пользователь не вошел в систему</h1>
                </div>
            )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email:</label>
                <input name="email"
                       type="email"
                       {...register('email', {
                           required: 'Email is required',
                           pattern: {
                               value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                               message: 'Invalid email address'
                           }
                       })}
                />
                {errors.email && <span>Email is required</span>}
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

    </>


);
    }
;

export default LoginForm;
