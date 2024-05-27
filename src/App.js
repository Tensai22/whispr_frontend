import './App.css';
import ItemList from "./components/ItemList";
import LoginForm from "./login/LoginForm";
import RegisterForm from "./register/RegisterForm";

function App() {
  return (
      <div>
          <h1>Welcome to My App</h1>
          <LoginForm/> {/* Вставка компонента */}
          <h1>Register Form</h1>
          <RegisterForm/>
      </div>
  );
}

export default App;
