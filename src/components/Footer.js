import React from 'react';
import 'C:\Users\KhanekShakh\Desktop\whispr_frontend\src\HTML_CSS_JavaScript\login_registration\log_reg.css';
import InstaLogo from 'C:\Users\KhanekShakh\Desktop\whispr_frontend\src\HTML_CSS_JavaScript\login_registration\Instagram_logo.png';
import FaceBookLogo from 'C:\Users\KhanekShakh\Desktop\whispr_frontend\src\HTML_CSS_JavaScript\login_registration\FaceBook_logo.png';
import TelegramLogo from 'C:\Users\KhanekShakh\Desktop\whispr_frontend\src\HTML_CSS_JavaScript\login_registration\Telegram_logo.png';

const Footer = () => {
  return (
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
  );
};

export default Footer;
