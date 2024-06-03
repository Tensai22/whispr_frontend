import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HTML_CSS_JavaScript/login_registration/log_reg.css';

const RegisterFormKHAN = () => {
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
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="registration-form text-white p-4 rounded">
        <h2>Регистрация</h2>
        <form id="registrationForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" id="username" name="username" placeholder="Имя пользователя..." required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" id="email" name="email" placeholder="Эл.почта..." required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="password" name="password" placeholder="Пароль..." required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="confirm-password" name="confirm-password" placeholder="Подтвердите пароль..." required />
          </div>
          <div className="mb-3">
            <input type="date" className="form-control" id="birthdate" name="birthdate" required />
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={goBack}>Назад</button>
            <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterFormKHAN;
