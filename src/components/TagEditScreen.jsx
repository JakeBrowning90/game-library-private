import React, { useState } from "react";
import { useParams } from "react-router";
// import apiSource

function TagEditScreen(
  {
    // Props
  }
) {
  // State declarations
  // Functions
  const { tagId } = useParams();
  const editTag = () => {

  }
  const deleteTag = () => {

  }
  // Render
  return (
    <div>
      <p>Manage Tag</p>
      <p>{tagId}</p>
      <form onSubmit={editTag}>
        <label htmlFor="newTag">Tag Name:</label>
        <input
          type="text"
          name="newTag"
          id="newTag"
        //   value={newTag}
        //   onChange={handleNewTag}
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
