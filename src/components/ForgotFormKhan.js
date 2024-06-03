import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HTML_CSS_JavaScript/login_registration/log_reg.css';

const PasswordResetForm = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="password-reset-form">
        <h2>Восстановление пароля</h2>
        <p>
          Пожалуйста, введите адрес электронной почты, связанный с вашей учетной записью. Мы отправим вам код для восстановления пароля. Следуйте инструкциям в письме, чтобы восстановить доступ к вашей учетной записи. Если вы не получите письмо в течение нескольких минут, проверьте папку "Спам" или "Нежелательная почта".
        </p>
        <form>
          <input type="email" className="form-control mb-3" placeholder="Эл.почта..." required />
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={goBack}>Назад</button>
            <button type="submit" className="btn btn-primary">Отправить код</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetForm;
