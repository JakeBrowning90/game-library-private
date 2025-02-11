import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import GameForm from "./GameForm";
import { apiurl } from "../apiSource";

function GameEdit(
  {
    // Props
  }
) {
  // State declarations
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [ageRec, setAgeRec] = useState(0);
  const [timeMin, setTimeMin] = useState(0);
  const [timeMax, setTimeMax] = useState(0);
  const [playerCtMin, setPlayerCtMin] = useState(0);
  const [playerCtMax, setPlayerCtMax] = useState(0);
  const [gameWeight, setGameWeight] = useState("");
  const [inCirc, setInCirc] = useState(false);
  // const [tagList, setTagList] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);
  const [gameSubmitError, setGameSubmitError] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Functions
  const navigate = useNavigate();
  const { gameId } = useParams();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDesc = (e) => {
    setDesc(e.target.value);
  };
  const handleAgeRec = (e) => {
    setAgeRec(e.target.value);
  };
  const handlePlayerCtMin = (e) => {
    setPlayerCtMin(e.target.value);
  };
  const handlePlayerCtMax = (e) => {
    setPlayerCtMax(e.target.value);
  };
  const handleTimeMin = (e) => {
    setTimeMin(e.target.value);
  };
  const handleTimeMax = (e) => {
    setTimeMax(e.target.value);
  };
  const handleGameWeight = (e) => {
    setGameWeight(e.target.value);
  };
  const handleInCirc = () => {
    setInCirc(!inCirc);
  };
  const handleTags = (e) => {
    if (e.target.checked) {
      setCheckedTags(checkedTags.concat(parseInt(e.target.value)));
    } else {
      setCheckedTags(
        checkedTags.filter((tag) => tag !== parseInt(e.target.value))
      );
    }
  };

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
      .then((response) => {
        setTitle(response.title);
        setDesc(response.desc);
        setAgeRec(response.ageRec);
        setPlayerCtMin(response.playerCtMin);
        setPlayerCtMax(response.playerCtMax);
        setTimeMin(response.timeMin);
        setTimeMax(response.timeMax);
        setGameWeight(response.gameWeight);
        setInCirc(response.inCirc);
        // setCheckedTags(response.tags);
        setCheckedTags(response.tags.map(tag => tag.id))
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  async function submitGameEdit(e) {
    e.preventDefault();
    const response = await fetch(apiurl + "game/" + gameId, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        desc: desc,
        timeMin: timeMin,
        timeMax: timeMax,
        playerCtMin: playerCtMin,
        playerCtMax: playerCtMax,
        ageRec: ageRec,
        gameWeight: gameWeight,
        inCirc: inCirc,
        tags: checkedTags,
      }),
    });
    const editGameResponse = await response.json();
    if (Array.isArray(editGameResponse.errors)) {
      setGameSubmitError(editGameResponse.errors);
    } else {
      navigate("/games/" + gameId);
    }
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
      <GameForm
        submitAction={submitGameEdit}
        submitError={gameSubmitError}
        title={title}
        desc={desc}
        ageRec={ageRec}
        playerCtMin={playerCtMin}
        playerCtMax={playerCtMax}
        timeMin={timeMin}
        timeMax={timeMax}
        gameWeight={gameWeight}
        inCirc={inCirc}
        // tagList={tagList}
        checkedTags={checkedTags}
        handleTitle={handleTitle}
        handleDesc={handleDesc}
        handleAgeRec={handleAgeRec}
        handlePlayerCtMin={handlePlayerCtMin}
        handlePlayerCtMax={handlePlayerCtMax}
        handleTimeMin={handleTimeMin}
        handleTimeMax={handleTimeMax}
        handleGameWeight={handleGameWeight}
        handleInCirc={handleInCirc}
        handleTags={handleTags}
      />
      <form onSubmit={deleteGame}>
        <button>Delete Game</button>
      </form>
    </div>
  );
}

export default GameEdit;
