import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Соц. сети:</h3>
          <p>khngldi <img src={require("../assets/Instagram_logo.png")} alt="Instagram" /> <img src={require("../assets/Telegram_logo.png")} alt="Telegram" /></p>
          <p>p_a_r_r_o_t <img src={require("../assets/Instagram_logo.png")} alt="Instagram" /><img src={require("../assets/Telegram_logo.png")} alt="Telegram" /></p>
          <p>tensxi <img src={require("../assets/Instagram_logo.png")} alt="Instagram" /><img src={require("../assets/Telegram_logo.png")} alt="Telegram" /></p>
          <p>Bauka <img src={require("../assets/Instagram_logo.png")} alt="Instagram" /><img src={require("../assets/Telegram_logo.png")} alt="Telegram" /></p>
          <p>senjumarru <img src={require("../assets/Instagram_logo.png")} alt="Instagram" /><img src={require("../assets/Telegram_logo.png")} alt="Telegram" /></p>
        </div>
      </div>
      <div className="footer-bottom">
        Ⓒ 2024 Whispr. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
