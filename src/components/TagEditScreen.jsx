import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { apiurl } from "../apiSource";

function TagEditScreen(
  {
    // Props
  }
) {
  // State declarations
  const [targetTag, setTargetTag] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Functions
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
      },
      body: JSON.stringify({
        tagName: targetTag,
      }),
    });
    const targetTagResponse = await response.json();
    console.log(targetTagResponse);
    // If update works, return to list
    // If update fails, display error message
    // window.location.reload();
  }
  async function deleteTag() {}

  // Render
  if (loading) return <p>Loading tag list...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <div>
      <p>Manage Tag</p>
      <form onSubmit={editTag}>
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
      <form onSubmit={deleteTag}>
        <button>Delete Tag</button>
      </form>
    </div>
  );
}

export default TagEditScreen;
