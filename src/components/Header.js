import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HTML_CSS_JavaScript/login_registration/log_reg.css';

const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <img src={require("../HTML_CSS_JavaScript/login_registration/Whispr_logo.png")} alt="Whispr" />
        <span className="logo-text">Whispr</span>
      </div>
    </header>
  );
};

export default Header;
