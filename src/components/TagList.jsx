import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router";
import { apiSource } from "../apiSource";

function TagList(
  {
    // Props
  }
) {
  // State declarations
  const [query, setQuery] = useState("");
  const [newTag, setNewTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [tagSubmitError, setTagSubmitError] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Functions
  useEffect(() => {
    fetch(apiSource + "tag", {
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

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleNewTag = (e) => {
    setNewTag(e.target.value);
  };

  async function submitQuery(e) {
    e.preventDefault();
    await fetch(apiSource + `tag/?tagname=${query}`, {
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
      .then((response) => setTagList(response));
  }

  async function submitNewTag(e) {
    e.preventDefault();
    const response = await fetch(apiSource + "tag", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        tagName: newTag,
      }),
    });
    const newTagResponse = await response.json();
    if (Array.isArray(newTagResponse.errors)) {
      setTagSubmitError(newTagResponse.errors);
    } else {
      window.location.reload();
    }
  }

  // Render
  if (loading) return <p>Loading tag list...</p>;
  if (error) return <p>Network error, please try again later.</p>;

  return (
    <div className="mainDiv">
      <Link to={"/"} className="mainLink">
        Back
      </Link>

      <h1 className="pageHeader">Tag List</h1>

      <form onSubmit={submitNewTag} className="blueBlock">
        <label htmlFor="newTag">Create New Tag:</label>

        {tagSubmitError.length > 0 && (
          <ul>
            {tagSubmitError.map((err) => {
              return <li key={tagSubmitError.indexOf(err)}>{err.msg}</li>;
            })}
          </ul>
        )}

        <input
          type="text"
          name="newTag"
          id="newTag"
          value={newTag}
          onChange={handleNewTag}
        />
        <button>Submit</button>
      </form>
      <form onSubmit={submitQuery} className="blueBlock">
        <label htmlFor="queryTag">Search Tags:</label>
        <input
          type="text"
          name="queryTag"
          id="queryTag"
          value={query}
          onChange={handleQuery}
        />
        <button>Search</button>
      </form>
      {tagList.length == 0 ? (
        <h2 className="pageHeader">No tags found</h2>
      ) : (
        <>
          <h2 className="pageHeader">{tagList.length} tags found:</h2>

          <ul>
            {tagList.map((tag) => {
              return (
                <li key={tag.id} className="blueBlock tagLI">
                  <p>{tag.tagName}</p>
                  <Link to={`/tags/${tag.id}`}>Edit</Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
      <Outlet />
    </div>
  );
}

export default TagList;
