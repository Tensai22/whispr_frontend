import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HTML_CSS_JavaScript/login_registration/log_reg.css';
import Footer from "./Footer";
import Header from "./Header";
import RegisterFormKHAN from "./RegisterFormKHAN";

const MainPage = () => {

    return (
        <div>
            <Header/>
            <RegisterFormKHAN/>
            <Footer/>
        </div>
    )
}

export default MainPage;