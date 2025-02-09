import React, { useState } from "react";
// import apiSource

function ComponentName(
  {
    // Props
  }
) {
  // State declarations
  // Functions
  // Render
  return (
    <form onSubmit={submitNewGame}>
      <ul>
        {gameSubmitError.map((err) => {
          return <li key={gameSubmitError.indexOf(err)}>{err.msg}</li>;
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

// export default ComponentName
