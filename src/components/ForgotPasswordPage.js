import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HTML_CSS_JavaScript/login_registration/log_reg.css';
import Header from "./Header";
import ForgotForm from "./ForgotFormKhan";
import Footer from "./Footer";
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