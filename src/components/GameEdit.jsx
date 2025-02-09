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
  const navigate = useNavigate();
  const { gameId } = useParams();

  async function deleteGame(e) {
    e.preventDefault();
    await fetch(apiurl + "game/" + gameId, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/games");
  }

  // Render
  return (
    <div>
      <Link to={`/games/${gameId}`}>Back</Link>
      <p>Game Edit Page</p>
      <p>TODO - Form to edit game info</p>
      <form onSubmit={deleteGame}>
        <button>Delete Game</button>
      </form>
    </div>
  );
}

export default GameEdit;
