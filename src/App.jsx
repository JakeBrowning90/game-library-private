import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminOnlyRoute from "./components/AdminOnlyRoute";
import HomeScreen from "./components/HomeScreen";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import TagList from "./components/TagList";
import TagEditScreen from "./components/TagEditScreen";
import GameList from "./components/GameList";
import GameEdit from "./components/GameEdit";
import GameNew from "./components/GameNew";
import GameDetail from "./components/GameDetail";
import ErrorScreen from "./components/ErrorScreen";
import About from "./components/About"

import { Routes, Route, Link, useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
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
                <AdminOnlyRoute>
                  <UserList />
                </AdminOnlyRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="users/:userId"
            element={
              <ProtectedRoute>
                <AdminOnlyRoute>
                  <UserDetail />
                </AdminOnlyRoute>
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
            path="tags/:tagId"
            element={
              <ProtectedRoute>
                <TagEditScreen />
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
          ></Route>

          <Route
            path="games/new"
            element={
              <ProtectedRoute>
                <GameNew />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="games/:gameId"
            element={
              <ProtectedRoute>
                <GameDetail />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="games/:gameId/edit"
            element={
              <ProtectedRoute>
                <GameEdit />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="login" element={<LoginScreen />} />
          <Route path="signup" element={<SignupScreen />} />
          <Route path="about" element={<About />} />

          <Route path="*" element={<ErrorScreen />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
