import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HTML_CSS_JavaScript/login_registration/log_reg.css';
import RFooter from "./RFooter";
import Header from "./Header";
import Register from "./Register";


const MainPage = () => {

    return (
        <div>
            <Header/>
            <Register/>
            <RFooter/>
        </div>
    )
}

export default MainPage;