import React, { useState, useEffect } from "react";
import { apiurl } from "../apiSource";

function GameFormMOD({
  // Props
  loading,
  error,
  submitAction,
  submitError,
  title,
  desc,
  ageRec,
  playerCtMin,
  playerCtMax,
  timeMin,
  timeMax,
  inCirc,
  tagList,
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

  // Functions

  // Render
  if (loading) return <p>Loading tag list...</p>;
  if (error) return <p>Network error, please try again later.</p>;

  return (
    <form onSubmit={submitAction}>
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
      <fieldset>
        <legend>Difficulty:</legend>
        <label htmlFor="">Easy:</label>
        <input
          type="radio"
          name="gameWeight"
          id="gameWeight"
          value="Easy"
          onChange={handleGameWeight}
        />
        <label htmlFor="">Medium:</label>
        <input
          type="radio"
          name="gameWeight"
          id="gameWeight"
          value="Medium"
          onChange={handleGameWeight}
        />
        <label htmlFor="">Complex:</label>
        <input
          type="radio"
          name="gameWeight"
          id="gameWeight"
          value="Complex"
          onChange={handleGameWeight}
        />
      </fieldset>

      <label htmlFor="inCirc">In Circulation:</label>
      <input
        type="checkbox"
        name="inCirc"
        id="inCirc"
        checked={inCirc}
        onChange={handleInCirc}
      />
      <fieldset htmlFor="">
        <legend>Tags</legend>
        {tagList.map((tag) => {
          return (
            <div key={tag.id}>
              <label>{tag.tagName}</label>
              <input
                type="checkbox"
                value={tag.id}
                // checked={checkedTags[tag.id]}
                onChange={handleTags}
              />
            </div>
          );
        })}
      </fieldset>
      <button>Submit</button>
    </form>
  );
}

export default GameFormMOD;
