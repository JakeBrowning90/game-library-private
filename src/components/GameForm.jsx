import React, { useState, useEffect } from "react";
import { apiurl } from "../apiSource";

function GameForm({
  // Props
  formHeader,
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
    <form onSubmit={submitAction} className="blueBlock gameForm">
      {formHeader && <h2 className="gameFormRow">{formHeader}</h2>}

      {submitError.length > 0 && (
        <ul className="gameFormRow">
          {submitError.map((err) => {
            return (
              <li key={submitError.indexOf(err)} className="errText">
                {err.msg}
              </li>
            );
          })}
        </ul>
      )}

      <div className="gameFormRow gameFormCell">
        <label htmlFor="title">Title*:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitle}
        />
      </div>

      <div className="gameFormRow gameFormCell">
        <label htmlFor="desc">Description*:</label>
        <input
          type="textarea"
          name="desc"
          id="desc"
          value={desc}
          onChange={handleDesc}
        />
      </div>
      <div className="gameFormCell gameFormRow">
        <label htmlFor="ageRec">Min. Age*:</label>
        <input
          type="number"
          name="ageRec"
          id="ageRec"
          value={ageRec}
          onChange={handleAgeRec}
        />
      </div>
      <div className="gameFormCell">
        <label htmlFor="playerCtMin">Player Min*:</label>
        <input
          type="number"
          name="playerCtMin"
          id="playerCtMin"
          value={playerCtMin}
          onChange={handlePlayerCtMin}
        />
      </div>

      <div className="gameFormCell">
        <label htmlFor="playerCtMax">Player Max:</label>
        <input
          type="number"
          name="playerCtMax"
          id="playerCtMax"
          value={playerCtMax}
          onChange={handlePlayerCtMax}
        />
      </div>
      <div className="gameFormCell">
        <label htmlFor="timeMin">Time Min*:</label>
        <input
          type="number"
          name="timeMin"
          id="timeMin"
          value={timeMin}
          onChange={handleTimeMin}
        />
      </div>

      <div className="gameFormCell">
        <label htmlFor="timeMax">Time Max:</label>
        <input
          type="number"
          name="timeMax"
          id="timeMax"
          value={timeMax}
          onChange={handleTimeMax}
        />
      </div>

      <fieldset className="diffField gameFormRow">
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
      <div className="toggleSet gameFormRow">
        <label htmlFor="inCirc">In Circulation:</label>
        <input
          type="checkbox"
          name="inCirc"
          id="inCirc"
          checked={inCirc}
          onChange={handleInCirc}
        />
      </div>

      <fieldset htmlFor="" className="gameFormRow">
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
      {submitError.length > 0 && (
        <p className="gameFormRow errText">Review form errors.</p>
      )}
      <button className="gameFormRow">Submit</button>
    </form>
  );
}

export default GameForm;
