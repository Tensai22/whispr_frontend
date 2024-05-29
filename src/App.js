import './App.css';
import LoginForm from "./login_registration/LoginForm";
import RegisterForm from "./register/RegisterForm";
import * as ReactRouterDOM from "react-router-dom";
import Chat from "./chatting/Chat";

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
            </Routes>
        </Router>
    );
};

export default App;
