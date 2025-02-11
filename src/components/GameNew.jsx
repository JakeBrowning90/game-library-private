import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { apiurl } from "../apiSource";
import GameForm from "./GameForm";

function GameNew(
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
  const [checkedTags, setCheckedTags] = useState([]);
  const [gameSubmitError, setGameSubmitError] = useState([]);

  // Functions
  const navigate = useNavigate();

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

  async function submitNewGame(e) {
    e.preventDefault();
    // How are the tags being saved?
    console.log(checkedTags);
    const response = await fetch(apiurl + "game", {
      method: "POST",
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
    const newGameResponse = await response.json();
    if (Array.isArray(newGameResponse.errors)) {
      setGameSubmitError(newGameResponse.errors);
    } else {
      navigate("/games");
    }
  }

  // Render
  return (
    <div>
      <Link to={"/games"}>Back</Link>
      <p>Add New Game</p>
      <GameForm
        submitAction={submitNewGame}
        submitError={gameSubmitError}
        title={title}
        desc={desc}
        ageRec={ageRec}
        playerCtMin={playerCtMin}
        setPlayerCtMax={playerCtMax}
        timeMin={timeMin}
        timeMax={timeMax}
        inCirc={inCirc}
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
    </div>
  );
}

export default GameNew;
