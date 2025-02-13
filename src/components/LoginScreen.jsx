import React, { useState } from "react";
import { apiurl } from "../apiSource";

function LoginScreen(
  {
    // Props
  }
) {
  // State declarations
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [invalidLogin, setInvalidLogin] = useState(false);

  // Functions
  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function submitLogin(e) {
    e.preventDefault();
    // console.log(username, password);
    const response = await fetch(apiurl + "user/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.status != 200) {
      setInvalidLogin(true);
    } else {
      const loginResponse = await response.json();
      // Set user and token to local storage
      localStorage.setItem("username", loginResponse.username);
      localStorage.setItem("id", loginResponse.id);
      localStorage.setItem("isAdmin", loginResponse.isAdmin);
      localStorage.setItem("isDemo", loginResponse.isDemo);
      localStorage.setItem("isConfirmed", loginResponse.isConfirmed);
      localStorage.setItem("token", `Bearer ${loginResponse.token}`);
      setInvalidLogin(false);
      // Redirect to home
      window.location.href = "/";
    }
  }

  // Render
  return (
    <>
      <div>Login Screen</div>
      <form action="">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsername}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />
        <button onClick={submitLogin}>Submit</button>
      </form>
    </>
  );
}

export default LoginScreen;
