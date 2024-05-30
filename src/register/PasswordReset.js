import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const PasswordReset = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8000/api/password_reset/", data, {
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });
            setSuccessMessage("Password reset link has been sent to your email.");
        } catch (error) {
            console.log(error);
            setErrorMessage("Error sending password reset request.");
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit">Send link</button>
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

export default PasswordReset;
