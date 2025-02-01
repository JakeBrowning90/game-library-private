import React, { useState, useEffect } from "react";
import { apiurl } from "../apiSource";

function GameList(
  {
    // Props
  }
) {
  // State declarations
  const [gameList, setGameList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Functions
  useEffect(() => {
    fetch(apiurl + "game", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Game list fetch error");
        }
        return response.json();
      })
      .then((response) => setGameList(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);
  // Render
  if (loading) return <p>Loading game list...</p>;
  if (error) return <p>Network error, please try again later.</p>;

  return (
    <div>
      <p>Game List</p>
      <p>To-do: Search Bar</p>
      <p>To-do: New Game form</p>
      {gameList.length == 0 ? (
        <p>No games found</p>
      ) : (
        <ul>
          {gameList.map((game) => {
            return (
              <li key={game.id}>
                <p>{game.title}</p>
                {/* Link to details, edit form, delete option */}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default GameList;
