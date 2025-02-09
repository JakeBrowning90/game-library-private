import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { apiurl } from "../apiSource";

function GameEdit(
  {
    // Props
  }
) {
  // State declarations
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // Functions
  const navigate = useNavigate();
  const { gameId } = useParams();

  useEffect(() => {
    fetch(apiurl + "game/" + gameId, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Game fetch error");
        }
        return response.json();
      })
      .then((response) => console.log(response))
    //   .then((response) => setTargetGame(response))

      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  async function submitGameEdit(e) {
    e.preventDefault();
    console.log("Edits submitted!")
  }


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
  if (loading) return <p>Loading game info...</p>;
  if (error) return <p>Network error, please try again later.</p>;
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
