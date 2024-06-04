import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/log_reg.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";

const MainPage = () => {

    return (
        <div>
            <Header/>
            <RegisterForm/>
            <Footer/>
        </div>
    )
}

export default MainPage;