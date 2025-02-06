import React, { useState } from "react";
// import apiSource

function GameForm(
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

  // Functions
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

  async function submitNewGame(e) {
    e.preventDefault();
    console.log(title);
    console.log(desc);
    console.log(ageRec);
    console.log(playerCtMin);
    console.log(playerCtMax);
    console.log(timeMin);
    console.log(timeMax);
    console.log(gameWeight);
    console.log(inCirc);
  }

  // Render
  return (
    <div>
      Game Form
      <form onSubmit={submitNewGame}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitle}
        />
        <label htmlFor="desc">Description:</label>
        <input
          type="textarea"
          name="desc"
          id="desc"
          value={desc}
          onChange={handleDesc}
        />
        <label htmlFor="ageRec">Min. Age:</label>
        <input
          type="number"
          name="ageRec"
          id="ageRec"
          value={ageRec}
          onChange={handleAgeRec}
        />
        <label htmlFor="playerCtMin">Player Min:</label>
        <input
          type="number"
          name=""
          id="playerCtMin"
          value={playerCtMin}
          onChange={handlePlayerCtMin}
        />
        <label htmlFor="playerCtMax">Player Max:</label>
        <input
          type="number"
          name="playerCtMax"
          id="playerCtMax"
          value={playerCtMax}
          onChange={handlePlayerCtMax}
        />
        <label htmlFor="">Time Min:</label>
        <input
          type="number"
          name=""
          id=""
          value={timeMin}
          onChange={handleTimeMin}
        />
        <label htmlFor="">Time Max:</label>
        <input
          type="number"
          name=""
          id=""
          value={timeMax}
          onChange={handleTimeMax}
        />
        <fieldset>
          <legend>Difficulty:</legend>
          <label htmlFor="">Easy:</label>
          <input
            type="radio"
            name="gameWeight"
            id=""
            value="Easy"
            onChange={handleGameWeight}
          />
          <label htmlFor="">Medium:</label>
          <input
            type="radio"
            name="gameWeight"
            id=""
            value="Medium"
            onChange={handleGameWeight}
          />
          <label htmlFor="">Complex:</label>
          <input
            type="radio"
            name="gameWeight"
            id=""
            value="Complex"
            onChange={handleGameWeight}
          />
        </fieldset>

        <label htmlFor="">In Circulation:</label>
        <input type="checkbox" checked={inCirc} onChange={handleInCirc} />
        <label htmlFor="">Tags:</label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default GameForm;
