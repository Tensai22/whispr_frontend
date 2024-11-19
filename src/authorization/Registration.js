import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/log_reg.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";
import BackgroundCat from "../assets/Background_Cat.png";

const MainPage = () => {

    return (
        <div>
            <Header/>
            <div className="background-cat">
                <img src={BackgroundCat} alt="Background Cat"/>
            </div>
            <RegisterForm/>
            <Footer/>
        </div>
    )
}

export default MainPage;