import React from 'react';
import 'C:\Users\KhanekShakh\Desktop\whispr_frontend\src\HTML_CSS_JavaScript\login_registration\log_reg.css';

const Login = () => {
  const redirectToRegistration = () => {
    console.log("Redirecting to registration...");
  };

  return (
    <div className="login-form">
      <h2>Вход</h2>
      <form>
        <input type="text" id="login" name="login" placeholder="Логин..." />
        <input type="password" id="password" name="password" placeholder="Пароль..." />
        <a href="#" id="forgot-password">Забыли пароль?</a>
        <div className="buttons">
          <button type="button" onClick={redirectToRegistration}>Регистрация</button>
          <button type="submit">Войти</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
