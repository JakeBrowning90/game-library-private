import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router";

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
    setCurrentUser(false);
    navToLogin();
  };

  return (
    <>
      <header>
        <a href="/">Home</a>
        {currentUser ? (
          <nav>
            <div>Username</div>
            <div onClick={logout}>Logout</div>
          </nav>
        ) : (
          <nav>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </nav>
        )}
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="login" element={<LoginScreen />}></Route>
            <Route path="signup" element={<SignupScreen />}></Route>
          </Routes>
        </BrowserRouter>
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
