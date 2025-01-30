import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
import ErrorScreen from "./components/ErrorScreen";

import { BrowserRouter, Routes, Route, Link } from "react-router";

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

  // const login = () => {
  //   setCurrentUser(true);
  //   // navToHome();
  //   // window.location.href = "/"
  // };

  const logout = () => {
    localStorage.clear();
    setCurrentUser(false);
    window.location.href = "/login";
    // navToLogin();
  };

  return (
    <>
      <header>
        <Link to="/">Home</Link>

        {localStorage.username ? (
          <nav>
            <div>{localStorage.username}</div>
            <a onClick={logout}>Logout</a>
          </nav>
        ) : (
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </nav>
        )}
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="login" element={<LoginScreen />}></Route>
          <Route path="signup" element={<SignupScreen />}></Route>
          <Route path="*" element={<ErrorScreen />}></Route>
        </Routes>
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
