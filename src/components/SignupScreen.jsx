import React, { useState } from "react";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();

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
    if (Array.isArray(signupResponse.errors)) {
      setSignupErrors(signupResponse.errors);
    } else {
      navigate("/login");
    }
  }
  // Render
  return (
    <>
      <form className="blueBlock" onSubmit={submitSignup}>
        <h1>Signup</h1>
        <p>New Users must be validated by Admin</p>

        {signupErrors.length > 0 && (
          <ul>
            {signupErrors.map((err) => {
              return (
                <li key={signupErrors.indexOf(err)} className="errText">
                  {err.msg}
                </li>
              );
            })}
          </ul>
        )}

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
