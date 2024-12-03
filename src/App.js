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
import ChatWindow from "./components/ChatWindow";

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Routes = ReactRouterDOM.Routes;

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/chat" element={<ChatDesign/>}/>
                <Route path="/registration" element={<Register/>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/reset_password" element={<ForgotPasswordPage/>}/>
                <Route path="/logout" element={<LogoutButton/>} />
                <Route path="/changepassword" element={<ChangePassword/>}/>
                <Route path="/changeprofilepassword" element={<ChangeProfilePasswordForm/>}/>
                <Route path="/reset/:uidb64/:token" element={<ChangeResetPassword/>} />
                <Route path="/chat" component={<ChatWindow/>} />
            </Routes>
        </Router>
    );
};

export default App;
