import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { apiurl } from "../apiSource";

function GameDetail(
  {
    // Props
  }
) {
  // State declarations
  const [targetGame, setTargetGame] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // Functions
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
      .then((response) => setTargetGame(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Render
  if (loading) return <p>Loading game info...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <div className="mainDiv">
      <Link to={"/games"}>Back</Link>
      <h1 className="pageHeader">Game Detail</h1>
      <div className="blueBlock gameDetail">
        <p className="gameTitle">{targetGame.title}</p>
        <p>{targetGame.ageRec}+ </p>
        <p>
          {targetGame.playerCtMin} - {targetGame.playerCtMax} players
        </p>
        {targetGame.timeMax ? (
          <p>
            Playtime: {targetGame.timeMin} - {targetGame.timeMax} min.
          </p>
        ) : (
          <p>Playtime: {targetGame.timeMin} min.</p>
        )}
        {targetGame.gameWeight == "Easy" && (
          <p className="easy">{targetGame.gameWeight}</p>
        )}
        {targetGame.gameWeight == "Medium" && (
          <p className="medium">{targetGame.gameWeight}</p>
        )}
        {targetGame.gameWeight == "Complex" && (
          <p className="complex">{targetGame.gameWeight}</p>
        )}

        <p className="gameCardRow">{targetGame.desc}</p>

        {targetGame.inCirc ? (
          <p className="gameCardRow">Available</p>
        ) : (
          <p className="gameCardRow">Unavailable</p>
        )}
        {targetGame.tags.length == 0 ? (
          <p className="gameCardRow">No tags applied</p>
        ) : (
          <ul className="gameCardRow">
            <p>Tags:</p>
            {targetGame.tags.map((tag) => {
              return (
                <li key={tag.id}>
                  <p>{tag.tagName}</p>
                </li>
              );
            })}
          </ul>
        )}
        <Link to={`/games/${gameId}/edit`}>Edit/Delete</Link>
      </div>
    </div>
  );
}

export default GameDetail;
