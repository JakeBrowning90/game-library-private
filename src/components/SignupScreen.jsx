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

  // Functions
  function handleUsername(e) {
    setUsername(e.target.value);
  }

  async function submitSignup(e) {
    e.preventDefault();
    console.log(username);
    // const response = await fetch(apiurl + "user", {
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         username: username
    //     })
    // })
  }
  // Render
  return (
    <>
      <div>Signup Screen</div>
      <form action="username" onSubmit={submitSignup}>
        <label htmlFor="">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsername}
        />
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="text" id="confirmPassword" />
        <button>Submit</button>
      </form>
    </>
  );
}

export default SignupScreen;
