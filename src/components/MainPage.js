import React from "react";
import { useHistory } from "react-router-dom";
import WhisprLogo from 'C:\Users\KhanekShakh\Desktop\whispr_frontend\src\HTML_CSS_JavaScript\login_registration\Whispr_logo.png';
import InstaLogo from 'C:\Users\KhanekShakh\Desktop\whispr_frontend\src\HTML_CSS_JavaScript\login_registration\Instagram_logo.png';
import FaceBookLogo from 'C:\Users\KhanekShakh\Desktop\whispr_frontend\src\HTML_CSS_JavaScript\login_registration\FaceBook_logo.png';
import TelegramLogo from 'C:\Users\KhanekShakh\Desktop\whispr_frontend\src\HTML_CSS_JavaScript\login_registration\Telegram_logo.png';


const MainPage = () => {
  const history = useHistory();

  const redirectToRegistration = () => {
    history.push("/registrationn");
  };

    return(
        <div>
        <header>
            <div className="logo-container">
                <img src={WhisprLogo} alt="Whispr" />
                <span className="logo-text">Whispr</span>
            </div>
        </header>

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


    <footer>
      <div className="footer-section">
        <h3>Ном.телефона</h3>
        <p>+77007826147</p>
        <p>+77073940282</p>
        <p>+77086904270</p>
        <p>+77081773609</p>
      </div>
      <div className="footer-section">
        <h3>Эл.почта</h3>
        <p>khanekshakh@gmail.com</p>
        <p>nurik.shakh@gmail.com</p>
        <p>tensxi@gmail.com</p>
        <p>B.Bissanov@gmail.com</p>
      </div>
      <div className="footer-section">
        <h3>Соц.сети</h3>
        <p>khngldi <a href="#"><img src={InstaLogo} alt="Instagram" /></a> <a href="#"><img src={FaceBookLogo} alt="Facebook" /></a> <a href="#"><img src={TelegramLogo} alt="Telegram" /></a></p>
        <p>p_a_r_r_o_t <a href="#"><img src={InstaLogo} alt="Instagram" /></a> <a href="#"><img src={FaceBookLogo} alt="Facebook" /></a> <a href="#"><img src={TelegramLogo} alt="Telegram" /></a></p>
        <p>tensxi <a href="#"><img src={InstaLogo} alt="Instagram" /></a> <a href="#"><img src={FaceBookLogo} alt="Facebook" /></a> <a href="#"><img src={TelegramLogo} alt="Telegram" /></a></p>
        <p>Bauka <a href="#"><img src={InstaLogo} alt="Instagram" /></a> <a href="#"><img src={FaceBookLogo} alt="Facebook" /></a> <a href="#"><img src={TelegramLogo} alt="Telegram" /></a></p>
      </div>
    </footer>
        </div>

    )
}

export default MainPage;