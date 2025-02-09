import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { apiurl } from "../apiSource";

function GameEdit(
  {
    // Props
  }
) {
  // State declarations
  // Functions
  const { gameId } = useParams();

  // Render
  return (
    <div>
      <Link to={`/games/${gameId}`}>Back</Link>
      <p> Game Edit Page</p>

      <p>TODO - Form to edit game info</p>
      <p>TODO - Form to delete game</p>
    </div>
  );
}

export default GameEdit;
