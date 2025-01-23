import React, { useState } from "react";
import { apiurl } from "../apiSource";

function LoginScreen(
  {
    // Props
    login
  }
) {
  // State declarations
  // Functions
  
  // Render
  return (
    <>
      <div>Login Screen</div>
      <form action="">
        <label htmlFor="">Username:</label>
        <input type="text" />
        <label htmlFor="">Password:</label>
        <input type="text" />
        <button onClick={login}>Submit</button>
      </form>
    </>
  );
}

export default LoginScreen;
