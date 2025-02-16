import React from "react";
import { Link } from "react-router";

function HomeScreen(
  {
    // Props
  }
) {
  // State declarations
  // Functions
  // Render
  return (
    <>
      <div className="mainDiv">
        <h1 className="pageHeader">Home</h1>
        <Link to="/games" className="mainButton blueBlock">
          Manage Games
        </Link>
        <Link to="/tags" className="mainButton blueBlock">
          Manage Tags
        </Link>
        {localStorage.length > 0 && JSON.parse(localStorage.isAdmin) && (
          <Link to="/users" className="mainButton blueBlock">
            Manage Users
          </Link>
        )}
      </div>
    </>
  );
}

export default HomeScreen;
