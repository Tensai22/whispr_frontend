import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HTML_CSS_JavaScript/login_registration/log_reg.css';
import Footer from "./Footer";
import Login from "./Login";
import Header from "./Header";


const MainPage = () => {

    return (
        <div>
            <Header/>
            <Login/>
            <Footer/>
        </div>
    )
}

export default MainPage;