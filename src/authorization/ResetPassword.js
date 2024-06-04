import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/log_reg.css';
import Header from "../components/Header";
import ForgotForm from "../components/ResetPasswordForm";
import Footer from "../components/Footer";
const MainPage = () => {

    return (
        <div>
            <Header/>
            <ForgotForm/>
            <Footer/>
        </div>
    )
}

export default MainPage;