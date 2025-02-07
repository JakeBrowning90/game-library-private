import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { apiurl } from "../apiSource";

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
  const [tagList, setTagList] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);
  const [gameSubmitError, setGameSubmitError] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Functions
  const navigate = useNavigate();

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
  if (loading) return <p>Loading tag list...</p>;
  if (error) return <p>Network error, please try again later.</p>;

  return (
    <div>
      <Link to={"/games"}>Back</Link>
      <p>Add New Game</p>

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
    </div>
  );
}

export default GameForm;
