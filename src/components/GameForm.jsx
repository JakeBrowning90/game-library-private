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

  async function submitNewGame(e) {
    e.preventDefault();
    console.log(title);
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
        <label htmlFor="">Description:</label>
        <input
          type="textarea"
          name=""
          id=""
          //   value={}
          //   onChange={}
        />
        <label htmlFor="">Min. Age:</label>
        <input
          type="number"
          name=""
          id=""
          //   value={}
          //   onChange={}
        />
        <label htmlFor="">Player Min:</label>
        <input
          type="number"
          name=""
          id=""
          //   value={}
          //   onChange={}
        />
        <label htmlFor="">Player Max:</label>
        <input
          type="number"
          name=""
          id=""
          //   value={}
          //   onChange={}
        />
        <label htmlFor="">Time Min:</label>
        <input
          type="number"
          name=""
          id=""
          //   value={}
          //   onChange={}
        />
        <label htmlFor="">Time Max:</label>
        <input
          type="number"
          name=""
          id=""
          //   value={}
          //   onChange={}
        />
        <fieldset>
          <legend>Difficulty:</legend>
          <label htmlFor="">Easy:</label>
          <input
            type="radio"
            name="gameWeight"
            id=""
            value="Easy"
            //   onChange={}
          />
          <label htmlFor="">Medium:</label>
          <input
            type="radio"
            name="gameWeight"
            id=""
            value="Medium"

            //   onChange={}
          />
          <label htmlFor="">Complex:</label>
          <input
            type="radio"
            name="gameWeight"
            id=""
            value="Complex"
            //   onChange={}
          />
        </fieldset>

        <label htmlFor="">In Circulation:</label>
        <input type="checkbox" />
        <label htmlFor="">Tags:</label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default GameForm;
