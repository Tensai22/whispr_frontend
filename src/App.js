import './App.css';
import RegisterForm from "./register/RegisterForm";
import * as ReactRouterDOM from "react-router-dom";
import Chat from "./chatting/Chat";
import MainPage from './components/MainPage';
import LoginForm from "./register/LoginForm";
import Register from "./components/RegisterPage";

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
                <Route path="/1" element={<MainPage/>}/>
                <Route path="/register" element={<Register/>} />
            </Routes>
        </Router>
    );
};

export default App;
