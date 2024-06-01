import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate} from "react-router-dom";
import '../HTML_CSS_JavaScript/login_registration/log_reg.css';
import Register from "./Register";

const Login = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/register');
  }

  return (
    <div className="login-form">
      <h2>Вход</h2>
      <form>
        <input type="text" id="login" name="login" placeholder="Логин..." />
        <input type="password" id="password" name="password" placeholder="Пароль..." />
        <a href="#" id="forgot-password">Забыли пароль?</a>
        <div className="buttons">
          <button type="button" onClick={handleRedirect}>Регистрация</button>
          <button type="submit">Войти</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
