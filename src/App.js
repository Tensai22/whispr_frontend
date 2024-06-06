import './App.css';
import * as ReactRouterDOM from "react-router-dom";
import Chat from "./chatting/Chat";
import Login from './authorization/Login';
import Register from "./authorization/Registration";
import ForgotPasswordPage from "./authorization/ResetPassword";
import ChatDesign from "./components/ChatDesign";
import ChangePassword from "./components/ChangePassword";
import WelcomePage from "./components/WelcomePage";

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
                <Route path="/chat" element={<Chat/>}/>
                <Route path="/registration" element={<Register/>} />
                <Route path="/reset_password" element={<ForgotPasswordPage/>}/>
                <Route path="/chatdesign" element={<ChatDesign/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/changepassword" element={<ChangePassword/>}/>
                <Route path="/welcomepage" element={<WelcomePage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
