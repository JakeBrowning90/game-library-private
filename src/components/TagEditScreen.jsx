import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { apiurl } from "../apiSource";

function TagEditScreen(
  {
    // Props
  }
) {
  // State declarations
  const [targetTag, setTargetTag] = useState("");
  const [tagSubmitError, setTagSubmitError] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Functions
  const navigate = useNavigate();
  const { tagId } = useParams();

  useEffect(() => {
    fetch(apiurl + "tag/" + tagId, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Tag fetch error");
        }
        return response.json();
      })
      .then((response) => setTargetTag(response.tagName))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const handleTargetTag = (e) => {
    setTargetTag(e.target.value);
  };

  async function editTag(e) {
    e.preventDefault();
    const response = await fetch(apiurl + "tag/" + tagId, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        tagName: targetTag,
      }),
    });
    const targetTagResponse = await response.json();
    if (Array.isArray(targetTagResponse.errors)) {
      setTagSubmitError(targetTagResponse.errors);
    } else {
      navigate("/tags");
    }
  }

  async function deleteTag(e) {
    e.preventDefault();
    const response = await fetch(apiurl + "tag/" + tagId, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        tagName: targetTag,
      }),
    });
    navigate("/tags");
  }

  // Render
  if (loading) return <p>Loading tag info...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <div className="mainDiv">
      <Link to={"/tags"} className="mainLink">
        Back
      </Link>

      <h1 className="pageHeader">Manage Tag</h1>
      <form onSubmit={editTag} className="blueBlock">
        {tagSubmitError.length > 0 && (
          <ul>
            {tagSubmitError.map((err) => {
              return (
                <li key={tagSubmitError.indexOf(err)} className="errText">
                  {err.msg}
                </li>
              );
            })}
          </ul>
        )}

        <h2>Edit Tag Name</h2>
        <label htmlFor="targetTag">Tag Name:</label>
        <input
          type="text"
          name="targetTag"
          id="targetTag"
          value={targetTag}
          onChange={handleTargetTag}
        />
        <button>Save Change</button>
      </form>
      <form onSubmit={deleteTag} className="blueBlock">
        <h2>Delete this Tag?</h2>
        <button>Delete</button>
      </form>
    </div>
  );
}

export default TagEditScreen;
