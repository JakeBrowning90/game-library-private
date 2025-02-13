import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { apiurl } from "../apiSource";

function UserList(
  {
    // Props
  }
) {
  // State declarations
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Functions
  useEffect(() => {
    fetch(apiurl + "user", {
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
  // Render
  if (loading) return <p>Loading user list...</p>;
  if (error) return <p>Network error, please try again later.</p>;

  return (
    <div>
      <h1 className="pageHeader">User List</h1>
      <p>To-do: Search Bar</p>
      {userList.length == 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {userList.map((user) => {
            return (
              <li key={user.id}>
                <p>
                  {user.username} - {user.isAdmin ? "Admin" : "Basic"}
                  {!user.isConfirmed && " - Pending"}
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
