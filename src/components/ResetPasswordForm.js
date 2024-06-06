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
    const [emailSent, setEmailSent] = useState(false);


    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8000/api/password_reset/", data, {
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });
            reset()
            setEmailSent(true);
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

        const handleSendCode = () => {
        alert("Код отправлен на вашу электронную почту!");
        setEmailSent(true);
    };

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
                    <div className="email-container">
                    <input type="email" className="form-control mb-3" placeholder="Эл.почта..." required name="email"
                           {...register('email', {
                               required: 'Email is required',
                               pattern: {
                                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                   message: 'Invalid email address'
                               }
                           })}/>
                    <button
                            type="button"
                            className="send-code-button"
                            onClick={handleSendCode}
                            disabled={emailSent}
                        >
                            Отправить код
                    </button>
                        </div>
                    {errors.email && <span>{errors.email.message}</span>}
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Введите код..."
                        required
                        name="code"
                        disabled={!emailSent}
                        {...register('code', {
                            required: 'Code is required',
                            validate: value => value.length === 6 || 'Code must be 6 digits'
                        })}
                    />
                    {errors.code && <span>{errors.code.message}</span>}
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={goLogin}>Назад</button>
                        <button type="submit" className="btn btn-primary">Подтвердить</button>
                        {successMessage && <div>{successMessage}</div>}
                        {errorMessage && <div>{errorMessage}</div>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetForm;
