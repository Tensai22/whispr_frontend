import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HTML_CSS_JavaScript/login_registration/log_reg.css';
import Header from "./Header";
import Register from "./Register";
import Footer from "./Footer";


const MainPage = () => {

    return (
        <div>
            <Header/>
            <Register/>
            <Footer/>
        </div>
    )
}

export default MainPage;