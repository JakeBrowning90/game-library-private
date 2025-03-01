import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { apiSource } from "../apiSource";

function UserList(
  {
    // Props
  }
) {
  // State declarations
  const [query, setQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Functions
  useEffect(() => {
    fetch(apiSource + "user", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("User list fetch error");
        }
        return response.json();
      })
      .then((response) => setUserList(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  async function submitQuery(e) {
    e.preventDefault();
    await fetch(apiSource + `user/?username=${query}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("User list fetch error");
        }
        return response.json();
      })
      .then((response) => setUserList(response));
  }

  // Render
  if (loading) return <p>Loading user list...</p>;
  if (error) return <p>Network error, please try again later.</p>;

  return (
    <div className="mainDiv">
      <Link to={"/"} className="mainLink">
        Back
      </Link>
      <h1 className="pageHeader">User List</h1>
      <form onSubmit={submitQuery} className="blueBlock">
        <label htmlFor="queryTag">Search Users:</label>
        <input
          type="text"
          name="queryTag"
          id="queryTag"
          value={query}
          onChange={handleQuery}
        />
        <button>Search</button>
      </form>
      {userList.length == 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {userList.map((user) => {
            return (
              <li key={user.id} className="blueBlock">
                <p>
                  {user.username} - {user.isAdmin ? "Admin" : "Basic"}
                  {!user.isConfirmed && " - Pending Access"}
                  {user.isDemo && "Demo"}
                </p>
                <Link to={`/users/${user.id}`}>Edit</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default UserList;
