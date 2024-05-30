import React from 'react';
import 'C:\Users\KhanekShakh\Desktop\whispr_frontend\src\HTML_CSS_JavaScript\login_registration\log_reg.css';
import WhisprLogo from 'C:\Users\KhanekShakh\Desktop\whispr_frontend\src\HTML_CSS_JavaScript\login_registration\Whispr_logo.png';


const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <img src={WhisprLogo} alt="Whispr" />
        <span className="logo-text">Whispr</span>
      </div>
    </header>
  );
};

export default Header;
