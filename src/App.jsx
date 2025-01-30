import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeScreen from "./components/HomeScreen";
import UserList from "./components/UserList";
import TagList from "./components/TagList";
import GameList from "./components/GameList";
import ErrorScreen from "./components/ErrorScreen";

import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router";

// import "./App.css";

function App() {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  // TODO: Temp user, replace with fetch results
  const [currentUser, setCurrentUser] = useState(false);

  const login = () => {
    setCurrentUser(true);
    // navToHome();
    navigate("/");
  };

  const logout = () => {
    localStorage.clear();
    setCurrentUser(false);
    navigate("/login");
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
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="tags"
            element={
              <ProtectedRoute>
                <TagList />
              </ProtectedRoute>
            }
          />
          <Route
            path="games"
            element={
              <ProtectedRoute>
                <GameList />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<LoginScreen />} />
          <Route path="signup" element={<SignupScreen />} />
          <Route path="*" element={<ErrorScreen />} />
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
