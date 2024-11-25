import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/footer.css';

const Footer = () => {
  return (
    <footer>
<div className="footer-content">
  <div className="footer-section">
    <h3>Соц. сети:</h3>
    <p>
      khngldi
      <a href="https://www.instagram.com/khngldi/" target="_blank" rel="noopener noreferrer">
        <img src={require("../assets/Instagram_logo.png")} alt="Instagram" />
      </a>
      <a href="https://t.me/khngldi" target="_blank" rel="noopener noreferrer">
        <img src={require("../assets/Telegram_logo.png")} alt="Telegram" />
      </a>
    </p>
    <p>
      p_a_r_r_o_t
      <a href="https://www.instagram.com/p___a___r___r___o___t/" target="_blank" rel="noopener noreferrer">
        <img src={require("../assets/Instagram_logo.png")} alt="Instagram" />
      </a>
    </p>
    <p>
      tensxi
      <a href="https://www.instagram.com/yrtensai/" target="_blank" rel="noopener noreferrer">
        <img src={require("../assets/Instagram_logo.png")} alt="Instagram" />
      </a>
      <a href="https://t.me/IJWtDSiDH" target="_blank" rel="noopener noreferrer">
        <img src={require("../assets/Telegram_logo.png")} alt="Telegram" />
      </a>
    </p>
    <p>
      Bauka
      <a href="https://www.instagram.com/b.b.baurhzan/" target="_blank" rel="noopener noreferrer">
        <img src={require("../assets/Instagram_logo.png")} alt="Instagram" />
      </a>
      <a href="https://t.me/Lazyasshole" target="_blank" rel="noopener noreferrer">
        <img src={require("../assets/Telegram_logo.png")} alt="Telegram" />
      </a>
    </p>
    <p>
      senjumarru
      <a href="https://www.instagram.com/senjumarru/" target="_blank" rel="noopener noreferrer">
        <img src={require("../assets/Instagram_logo.png")} alt="Instagram" />
      </a>
      <a href="https://t.me/aliexxprs" target="_blank" rel="noopener noreferrer">
        <img src={require("../assets/Telegram_logo.png")} alt="Telegram" />
      </a>
    </p>
  </div>
</div>
      <div className="footer-bottom">
        Ⓒ 2024 Whispr. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
