import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Footer from './Footer';
import '../css/welcome_page.css';
import WhisprLogo from '../assets/Whispr_logo.png';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/registration');
    };
    return (
        <div className="welcome-page d-flex flex-column justify-content-between min-vh-100">
            <Header />
            <div className="container-fluid d-flex flex-grow-1 align-items-center justify-content-center">
                <div className="row w-100 justify-content-center">
                    <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                        <div className="welcome-text text-center">
                            <h1 className="welcome-title">Добро пожаловать в</h1>
                            <h1 className="brand-name ml-2 align-items-center justify-content-center text-center"> <img src={WhisprLogo} alt="Whispr Logo" className="whispr-logo" />Whispr</h1>
                        </div>
                    </div>
                    <div className="col-md-1 d-flex justify-content-center">
                        <div className="vertical-line"></div>
                    </div>
                    <div className="col-md-5 d-flex flex-column align-items-center justify-content-center">
                        <button className="btn btn-login btn-lg mb-4" onClick={handleLogin}>Войти</button>
                        <button className="btn btn-registration btn-lg" onClick={handleRegister}>Регистрация</button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default WelcomePage;
