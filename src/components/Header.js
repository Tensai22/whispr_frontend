import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/header.css';

const Header = () => {

  return (
    <header>
      <div className="logo-container">
        <img src={require("../assets/Whispr_logo.png")} alt="Whispr" />
        <span className="logo-text">Whispr</span>
      </div>
    </header>
  );
};

export default Header;
