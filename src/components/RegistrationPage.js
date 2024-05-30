import React from "react";
import { useHistory } from "react-router-dom";

const RegistrationPage = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
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
  );
};

export default RegistrationPage;
