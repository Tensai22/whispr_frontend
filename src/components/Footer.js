import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/footer.css';

const Footer = () => {

  return (
    <footer>
      <div className="footer-section">
        <h3>Ном.телефона</h3>
        <p>+77007826147</p>
        <p>+77073940282</p>
        <p>+77086904270</p>
        <p>+77081773609</p>
        <p>+77078803476</p>
      </div>
      <div className="footer-section">
        <h3>Эл.почта</h3>
        <p>khanekshakh@gmail.com</p>
        <p>nurik.shakh@gmail.com</p>
        <p>tensxi@gmail.com</p>
        <p>B.Bissanov@gmail.com</p>
        <p>alinursarsenov315@gmail.com</p>
      </div>
      <div className="footer-section">
        <h3>Соц.сети</h3>
        <p>khngldi <img src={require("../assets/Instagram_logo.png")} alt="Instagram" /> <img src={require("../assets/FaceBook_logo.png")} alt="Facebook" /><img src={require("../assets/Telegram_logo.png")} alt="Telegram" /></p>
        <p>p_a_r_r_o_t <img src={require("../assets/Instagram_logo.png")} alt="Instagram" /><img src={require("../assets/FaceBook_logo.png")} alt="Facebook" /><img src={require("../assets/Telegram_logo.png")} alt="Telegram" /></p>
        <p>tensxi <img src={require("../assets/Instagram_logo.png")} alt="Instagram" /><img src={require("../assets/FaceBook_logo.png")} alt="Facebook" /><img src={require("../assets/Telegram_logo.png")} alt="Telegram" /></p>
        <p>Bauka <img src={require("../assets/Instagram_logo.png")} alt="Instagram" /><img src={require("../assets/FaceBook_logo.png")} alt="Facebook" /><img src={require("../assets/Telegram_logo.png")} alt="Telegram" /></p>
        <p>senjumarru <img src={require("../assets/Instagram_logo.png")} alt="Instagram" /><img src={require("../assets/FaceBook_logo.png")} alt="Facebook" /><img src={require("../assets/Telegram_logo.png")} alt="Telegram" /></p>
      </div>
    </footer>
  );
};

export default Footer;
