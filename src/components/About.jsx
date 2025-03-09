import React from "react";
import { Link } from "react-router";
// import apiSource

function About(
  {
    // Props
  }
) {
  // State declarations
  // Functions
  // Render
  return (
    <div>
      <Link to={"/login"} className="mainLink">
        Back
      </Link>
      <div className="blueBlock">
        <h2>About</h2>
        <p>This is a fullstack app designed as a concept for use by a board game café. Staff can create, edit, and delete games and categories, take games in and out of circulation, and manage user permissions. Please view the README file for more info and guest user credentials.</p>
        <a href="https://github.com/JakeBrowning90/game-library-private">
          Github Repo & README
        </a>
        <p>Project by Jake Browning, 2025.</p>
        <a href="http://jake-browning.com/">
          My Portfolio
        </a>
      </div>
    </div>
  );
}

export default About;