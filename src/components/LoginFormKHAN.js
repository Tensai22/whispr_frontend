import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import '../HTML_CSS_JavaScript/login_registration/log_reg.css';

const LoginFormKHAN = () => {

  const navigate = useNavigate();

  const handleRedirectRegister = () => {
    navigate('/register');
  };

  const handleRedirectForgot = (event) => {
    event.preventDefault();
    navigate('/forgotpassword');
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="login-form text-white p-4 rounded">
        <h2>Вход</h2>
        <form>
          <div className="mb-3">
            <input type="text" className="form-control" id="login" name="login" placeholder="Логин..." required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="password" name="password" placeholder="Пароль..." required />
          </div>
          <a onClick={handleRedirectForgot} id="forgot-password" className="text-light">Забыли пароль?</a>
          <div className="d-flex justify-content-between mt-3">
            <button type="button" className="btn btn-secondary" onClick={handleRedirectRegister}>Регистрация</button>
            <button type="submit" className="btn btn-primary">Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginFormKHAN;
