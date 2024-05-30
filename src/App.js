import './App.css';
import LoginForm from '/register/LoginForm';
import RegisterForm from "./register/RegisterForm";
import * as ReactRouterDOM from "react-router-dom";
import Chat from "./chatting/Chat";
import PasswordReset from "./register/PasswordReset";
import ResetPage from "./register/ResetPage";

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Routes = ReactRouterDOM.Routes;

const main_page = () => {
    return (
        <div>
            MAIN PAGE
        </div>
    )
}

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={main_page()}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/registration" element={<RegisterForm/>}/>
                <Route path="/chat" element={<Chat/>}/>
                <Route path="/reset_password_by_email" element={<PasswordReset/>}/>
                <Route path="/reset/:uidb64/:token" element={<ResetPage />} />
            </Routes>
        </Router>
    );
};

export default App;
