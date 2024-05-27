import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login/', data);
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email:</label>
                <input name="email" {...register('email', { required: true })} />
                {errors.email && <span>Email is required</span>}
            </div>
            <div>
                <label>Password:</label>
                <input name="password" type="password" {...register('password', { required: true })} />
                {errors.password && <span>Password is required</span>}
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
