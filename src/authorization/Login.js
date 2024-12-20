import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/log_reg.css';
import BackgroundCat from '../assets/Background_Cat.png';
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import { Helmet } from 'react-helmet';

const Login = () => {

    return (
        <div>
            <Helmet>
                <link rel="icon" href="../assets/Whispr_logo_White.png" />
            </Helmet>
            <Header/>
            <div className="background-cat">
                <img src={BackgroundCat} alt="Background Cat"/>
            </div>
            <LoginForm/>
            <Footer/>
        </div>
    )
}

export default Login;