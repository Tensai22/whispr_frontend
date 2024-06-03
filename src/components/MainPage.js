import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HTML_CSS_JavaScript/login_registration/log_reg.css';
import Footer from "./Footer";
import LoginFormKHAN from "./LoginFormKHAN";
import Header from "./Header";
import { Helmet } from 'react-helmet';


const MainPage = () => {

    return (
        <div>
            <Helmet>
                <link rel="icon" href="../HTML_CSS_JavaScript/login_registration/Whispr_logo_White.png" />
            </Helmet>
            <Header/>
            <LoginFormKHAN/>
            <Footer/>
        </div>
    )
}

export default MainPage;