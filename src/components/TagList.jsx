import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router";
import { apiurl } from "../apiSource";

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

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleNewTag = (e) => {
    setNewTag(e.target.value);
  };

  async function submitQuery(e) {
    e.preventDefault();
    await fetch(apiurl + `tag/?tagname=${query}`, {
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

      <form onSubmit={submitNewTag}>
        <ul>
          {tagSubmitError.map((err) => {
            return <li key={tagSubmitError.indexOf(err)}>{err.msg}</li>;
          })}
        </ul>
        <label htmlFor="newTag">Create New Tag:</label>
        <input
          type="text"
          name="newTag"
          id="newTag"
          value={newTag}
          onChange={handleNewTag}
        />
        <button>Submit</button>
      </form>
      <form onSubmit={submitQuery}>
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
        <p>No tags found</p>
      ) : (
        <>
          <p>{tagList.length} results:</p>

          <ul>
            {tagList.map((tag) => {
              return (
                <li key={tag.id}>
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
