import './App.css';
import * as ReactRouterDOM from "react-router-dom";
import Chat from "./chatting/Chat";
import Login from './authorization/Login';
import Register from "./authorization/Registration";
import ForgotPasswordPage from "./authorization/ResetPassword";
import Messenger from "./chatting/Messenger";
import ChatDesign from "./components/ChatDesign";

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Routes = ReactRouterDOM.Routes;

const welcome_page = () => {
    return (
        <div>
            Welcome to Whispr app!
        </div>
    )
}

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={welcome_page()}/>
                {/*Authorization*/}
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Register/>}/>
                <Route path="/reset_password" element={<ForgotPasswordPage/>}/>
                {/*Chat*/}
                <Route path="/chat" element={<Chat/>}/>
                <Route path="/chatdesign" element={<ChatDesign/>}>
                </Route>
            </Routes>
        </Router>
    );
};

export default App;