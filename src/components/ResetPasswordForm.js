import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/log_reg.css';
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const PasswordResetForm = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8000/api/password_reset/", data, {
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });
            reset()
            setSuccessMessage("Вам было отправлена ссылка для сброса пароля!");
        } catch (error) {
            console.log(error);
            setErrorMessage("Ошибка отправки запрос на сброс пароля!");
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


    const goLogin = () => {
        navigate('/login')
    };


    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="password-reset-form">
                <h2>Восстановление пароля</h2>
                <p>
                    Пожалуйста, введите адрес электронной почты, связанный с вашей учетной записью. Мы отправим вам код
                    для восстановления пароля. Следуйте инструкциям в письме, чтобы восстановить доступ к вашей учетной
                    записи. Если вы не получите письмо в течение нескольких минут, проверьте папку "Спам" или
                    "Нежелательная почта".
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="email" className="form-control mb-3" placeholder="Эл.почта..." required name="email"
                           {...register('email', {
                               required: 'Email is required',
                               pattern: {
                                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                   message: 'Invalid email address'
                               }
                           })}/>
                    {errors.email && <span>{errors.email.message}</span>}
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={goLogin}>Назад</button>
                        <button type="submit" className="btn btn-primary">Отправить</button>
                        {successMessage && <div>{successMessage}</div>}
                        {errorMessage && <div>{errorMessage}</div>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetForm;
