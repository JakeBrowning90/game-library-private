import React, { useState, useEffect } from "react";
import { apiurl } from "../apiSource";

function GameForm({
  // Props
  submitAction,
  submitError,
  title,
  desc,
  ageRec,
  playerCtMin,
  playerCtMax,
  timeMin,
  timeMax,
  gameWeight,
  inCirc,
  checkedTags,
  handleTitle,
  handleDesc,
  handleAgeRec,
  handlePlayerCtMin,
  handlePlayerCtMax,
  handleTimeMin,
  handleTimeMax,
  handleGameWeight,
  handleInCirc,
  handleTags,
}) {
  // State declarations
  const [tagList, setTagList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Functions

  useEffect(() => {
    fetch(apiurl + "tag", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Tag list fetch error");
        }
        return response.json();
      })
      .then((response) => setTagList(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Render
  if (loading) return <p>Loading tag list...</p>;
  if (error) return <p>Network error, please try again later.</p>;

  return (
    <form onSubmit={submitAction} className="blueBlock">
      <ul>
        {submitError.map((err) => {
          return <li key={submitError.indexOf(err)}>{err.msg}</li>;
        })}
      </ul>
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
        name="playerCtMin"
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
      <label htmlFor="timeMin">Time Min:</label>
      <input
        type="number"
        name="timeMin"
        id="timeMin"
        value={timeMin}
        onChange={handleTimeMin}
      />
      <label htmlFor="timeMax">Time Max:</label>
      <input
        type="number"
        name="timeMax"
        id="timeMax"
        value={timeMax}
        onChange={handleTimeMax}
      />
      <fieldset className="diffField">
        <legend>Difficulty:</legend>
        <div className="marker easy toggleSet">
          <input
            type="radio"
            name="gameWeight"
            id="gameWeight1"
            value="Easy"
            onChange={handleGameWeight}
            defaultChecked={gameWeight === "Easy"}
          />
          <label htmlFor="gameWeight1">Easy</label>
        </div>
        <div className="marker medium toggleSet">
          <input
            type="radio"
            name="gameWeight"
            id="gameWeight2"
            value="Medium"
            onChange={handleGameWeight}
            defaultChecked={gameWeight === "Medium"}
          />
          <label htmlFor="gameWeight2">Medium</label>
        </div>
        <div className="marker complex toggleSet">
          <input
            type="radio"
            name="gameWeight"
            id="gameWeight3"
            value="Complex"
            onChange={handleGameWeight}
            defaultChecked={gameWeight === "Complex"}
          />
          <label htmlFor="gameWeight3">Complex</label>
        </div>
      </fieldset>
      <div className="toggleSet">
        <label htmlFor="inCirc">In Circulation:</label>
        <input
          type="checkbox"
          name="inCirc"
          id="inCirc"
          checked={inCirc}
          onChange={handleInCirc}
        />
      </div>

      <fieldset htmlFor="">
        <legend>Tags</legend>
        {tagList.map((tag) => {
          return (
            <div key={tag.id} className="toggleSet">
              <input
                type="checkbox"
                name={"checkbox" + tag.id}
                id={"checkbox" + tag.id}
                value={tag.id}
                defaultChecked={checkedTags.some((e) => e === tag.id)}
                onChange={handleTags}
              />
              <label htmlFor={"checkbox" + tag.id}>{tag.tagName}</label>
            </div>
          );
        })}
      </fieldset>
      <button>Submit</button>
    </form>
  );
}

export default GameForm;
