import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
// import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  // TODO: Temp user, replace with fetch results
  const [currentUser, setCurrentUser] = useState(false);
  const [viewLogin, setViewLogin] = useState(true);
  const [viewSignup, setViewSignup] = useState(false);
  const [viewHome, setViewHome] = useState(false);

  const navToLogin = () => {
    setViewLogin(true);
    setViewSignup(false);
    setViewHome(false);
  };

  const navToSignup = () => {
    setViewLogin(false);
    setViewSignup(true);
    setViewHome(false);
  };

  const navToHome = () => {
    setViewLogin(false);
    setViewSignup(false);
    setViewHome(true);
  };

  const login = () => {
    setCurrentUser(true);
    navToHome()
  };

  const logout = () => {
    setCurrentUser(false);
    navToLogin();
  };

  return (
    <>
      <header>
        <div>Home</div>
        {currentUser ? (
          <nav>
            <div>Username</div>
            <div onClick={logout}>Logout</div>
          </nav>
        ) : (
          <nav>
            <div onClick={navToLogin}>Login</div>
            <div onClick={navToSignup}>Signup</div>
          </nav>
        )}
      </header>
      <main>
        {viewLogin && <LoginScreen login={login} />}
        {viewSignup && <SignupScreen />}
        {viewHome && <HomeScreen />}
      </main>

      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
    </>
  );
}

export default App;
