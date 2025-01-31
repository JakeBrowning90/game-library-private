import React, { useState } from "react";
import { apiurl } from "../apiSource";

function SignupScreen(
  {
    // Props
  }
) {
  // State declarations
  const [signupErrors, setSignupErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Functions
  function handleUsername(e) {
    setUsername(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  async function submitSignup(e) {
    e.preventDefault();
    // console.log(username, password, confirmPassword);
    const response = await fetch(apiurl + "user", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });
    const signupResponse = await response.json();
    console.log(signupResponse);
  }
  // Render
  return (
    <>
      <div>Signup Screen</div>
      <form onSubmit={submitSignup}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleUsername}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPassword}
        />
        <button>Submit</button>
      </form>
    </>
  );
}

export default SignupScreen;
