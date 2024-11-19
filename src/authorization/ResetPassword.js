import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/log_reg.css';
import Header from "../components/Header";
import ForgotForm from "../components/ResetPasswordForm";
import Footer from "../components/Footer";
import BackgroundCat from "../assets/Background_Cat.png";
const MainPage = () => {

    return (
        <div>
            <Header/>
            <div className="background-cat">
                <img src={BackgroundCat} alt="Background Cat"/>
            </div>
            <ForgotForm/>
            <Footer/>
        </div>
    )
}

export default MainPage;