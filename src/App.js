import './App.css';
import * as ReactRouterDOM from "react-router-dom";
import Login from './authorization/Login';
import Register from "./authorization/Registration";
import ForgotPasswordPage from "./authorization/ResetPassword";
import ChatDesign from "./components/ChatDesign";
import ChangePassword from "./components/ChangeResetPassword";
import WelcomePage from "./components/WelcomePage";
import ChangeProfilePasswordForm from "./components/ChangeProfilePassword";
import LogoutButton from "./authorization/Logout";
import ChangeResetPassword from "./components/ChangeResetPassword";

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
                <Route path="/chat" element={<ChatDesign/>}/>
                <Route path="/registration" element={<Register/>} />
                <Route path="/reset_password" element={<ForgotPasswordPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<LogoutButton/>} />
                <Route path="/changepassword" element={<ChangePassword/>}/>
                <Route path="/welcomepage" element={<WelcomePage/>}/>
                <Route path="/changeprofilepassword" element={<ChangeProfilePasswordForm/>}/>
                <Route path="/reset/:uidb64/:token" element={<ChangeResetPassword/>} />
            </Routes>
        </Router>
    );
};

export default App;
