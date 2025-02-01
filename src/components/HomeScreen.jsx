import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router";
// import apiSource

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
      <div className="mainHome">
        <div>Home Screen</div>
        <Link to="/users">Manage Users</Link>
        <Link to="/tags">Manage Tags</Link>
        <Link to="/games">Manage Games</Link>
      </div>
    </>
  );
}

export default HomeScreen;
