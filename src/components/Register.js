import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HTML_CSS_JavaScript/login_registration/log_reg.css';

const Register = () => {
  const goBack = () => {
    window.history.back();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      alert('Пароли не совпадают.');
      return;
    }
    alert('Регистрация успешна!');
  };
  return (
      <div>
    <div className="registration-form">
      <h2>Регистрация</h2>
      <form id="registrationForm" onSubmit={handleSubmit}>
        <input type="text" id="username" name="username" placeholder="Имя пользователя..." required />
        <input type="email" id="email" name="email" placeholder="Эл.почта..." required />
        <input type="password" id="password" name="password" placeholder="Пароль..." required />
        <input type="password" id="confirm-password" name="confirm-password" placeholder="Подтвердите пароль..." required />
        <input type="date" id="birthdate" name="birthdate" required />
        <div className="buttons">
          <button type="button" onClick={goBack}>Назад</button>
          <button type="submit">Зарегистрироваться</button>
        </div>
      </form>
    </div>
      </div>
  );
};

export default Register;
