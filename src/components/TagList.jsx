import React, { useState, useEffect } from "react";
import { apiurl } from "../apiSource";

function TagList(
  {
    // Props
  }
) {
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
    <div>
      <p>Tag List</p>
      <p>To-do: Search Bar</p>
      <p>To-do: New Tag form</p>
      {tagList.length == 0 ? (
        <p>No tags found</p>
      ) : (
        <ul>
          {tagList.map((tag) => {
            return (
              <li>
                <p>{tag.tagName}</p>
                {/* Link to edit form, delete option */}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default TagList;
