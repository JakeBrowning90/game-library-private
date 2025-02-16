import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { apiurl } from "../apiSource";

function GameList(
  {
    // Props
  }
) {
  // State declarations
  const [query, setQuery] = useState("");
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

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  async function submitQuery(e) {
    e.preventDefault();
    await fetch(apiurl + `game/?title=${query}`, {
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
      .then((response) => setGameList(response));
  }

  // Render
  if (loading) return <p>Loading game list...</p>;
  if (error) return <p>Network error, please try again later.</p>;

  return (
    <div className="mainDiv">
      <Link to={"/"}>Back</Link>
      <h1 className="pageHeader">Game List</h1>
      <Link to={"new"} className="mainButton blueBlock">
        Add New Game
      </Link>
      <form onSubmit={submitQuery} className="blueBlock">
        <p>Search Games</p>
        <label htmlFor="queryTag">Title:</label>
        <input
          type="text"
          name="queryTag"
          id="queryTag"
          value={query}
          onChange={handleQuery}
        />
        {/* TODO: Add addtl search params */}
        {/* <label htmlFor="">Age Recommendation:</label>
        <label htmlFor="">Min. Player Count:</label>
        <label htmlFor="">Max. Player Count:</label>
        <label htmlFor="">Complexity:</label> */}

        <button>Search</button>
      </form>

      {gameList.length == 0 ? (
        <h2 className="pageHeader">No games found</h2>
      ) : (
        <>
          <h2 className="pageHeader">{gameList.length} games found:</h2>
          <ul>
            {gameList.map((game) => {
              return (
                <li key={game.id} className="blueBlock gameLI">
                  <p className="gameTitle">{game.title}</p>
                  <p>Ages {game.ageRec}+ </p>
                  <p>
                    {game.playerCtMin} - {game.playerCtMax} players
                  </p>
                  {game.timeMax ? (
                    <p>
                      {game.timeMin} - {game.timeMax} min.
                    </p>
                  ) : (
                    <p>{game.timeMin} min.</p>
                  )}
                  {game.gameWeight == "Easy" && (
                    <p className="marker easy">{game.gameWeight}</p>
                  )}
                  {game.gameWeight == "Medium" && (
                    <p className="marker medium">{game.gameWeight}</p>
                  )}
                  {game.gameWeight == "Complex" && (
                    <p className="marker complex">{game.gameWeight}</p>
                  )}

                  {game.inCirc ? <p>Available</p> : <p>Unavailable</p>}
                  <Link to={`/games/${game.id}`}>Detail</Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default GameList;
