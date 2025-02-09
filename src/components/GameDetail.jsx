import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
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
      .then((response) => setTargetGame(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Render
  if (loading) return <p>Loading game info...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <div>
      <Link to={"/games"}>Back</Link>
      <p>{targetGame.title}</p>
      <p>{targetGame.desc}</p>
      <p>{targetGame.ageRec}+ </p>
      <p>
        {targetGame.playerCtMin} - {targetGame.playerCtMax} players
      </p>
      <p>
        {/* Todo: conditional render if playtime is single number instead of range */}
        {targetGame.timeMin} - {targetGame.timeMax} min.
      </p>
      <p>{targetGame.gameWeight}</p>
      {targetGame.inCirc ? <p>Available</p> : <p>Unavailable</p>}

      {targetGame.tags.length == 0 ? (
        <p>No tags applied</p>
      ) : (
        <ul>
          {targetGame.tags.map((tag) => {
            return (
              <li key={tag.id}>
                <p>{tag.tagName}</p>
              </li>
            );
          })}
        </ul>
      )}

      <Link to={`/games/${targetGame.id}/edit`}>Edit/Delete</Link>
    </div>
  );
}

export default GameDetail;
