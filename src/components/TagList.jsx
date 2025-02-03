import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router";
import { apiurl } from "../apiSource";

function TagList(
  {
    // Props
  }
) {
  // State declarations
  const [newTag, setNewTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [tagSubmitError, setTagSubmitError] = useState([]);
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

  const handleNewTag = (e) => {
    setNewTag(e.target.value);
  };

  async function submitNewTag(e) {
    e.preventDefault();
    const response = await fetch(apiurl + "tag", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
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
    <div>
      <p>Tag List</p>
      <p>To-do: Search Bar</p>
      <form onSubmit={submitNewTag}>
        {/* Show errors */}
        <ul>
          {tagSubmitError.map((err) => {
            return <li key={tagSubmitError.indexOf(err)}>{err.msg}</li>;
          })}
        </ul>
        <label htmlFor="newTag">New Tag:</label>
        <input
          type="text"
          name="newTag"
          id="newTag"
          value={newTag}
          onChange={handleNewTag}
        />
        <button>Submit</button>
      </form>
      {tagList.length == 0 ? (
        <p>No tags found</p>
      ) : (
        <ul>
          {tagList.map((tag) => {
            return (
              <li key={tag.id}>
                <p>{tag.tagName}</p>
                {/* Link to edit or delete tag */}
                <Link to={`/tags/${tag.id}`}>Edit</Link>
              </li>
            );
          })}
        </ul>
      )}
      <Outlet />
    </div>
  );
}

export default TagList;
