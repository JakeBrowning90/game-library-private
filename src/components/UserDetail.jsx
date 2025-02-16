import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { apiurl } from "../apiSource";

function UserDetail(
  {
    // Props
  }
) {
  // State declarations
  const [targetUser, setTargetUser] = useState("");
  const [userSubmitError, setUserSubmitError] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // Functions
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    fetch(apiurl + "user/" + userId, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("User fetch error");
        }
        return response.json();
      })
      .then((response) => {
        setTargetUser(response);
        setIsAdmin(response.isAdmin);
        setIsConfirmed(response.isConfirmed);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const handleIsAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  const handleIsConfirmed = () => {
    setIsConfirmed(!isConfirmed);
  };

  async function editUser(e) {
    e.preventDefault();
    const response = await fetch(apiurl + "user/" + userId, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        isAdmin: isAdmin,
        isConfirmed: isConfirmed,
      }),
    });
    const targetUserResponse = await response.json();
    if (Array.isArray(targetUserResponse.errors)) {
      setUserSubmitError(targetUserResponse.errors);
    } else {
      navigate("/users");
    }
  }

  async function deleteUser(e) {
    e.preventDefault();
    await fetch(apiurl + "user/" + userId, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    navigate("/users");
  }

  // Render
  if (loading) return <p>Loading user info...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  return (
    <div className="mainDiv">
      <Link to={"/users"}>Back</Link>
      <h1 className="pageHeader">User Detail:</h1>
      <h2 className="pageHeader">{targetUser.username}</h2>
      {JSON.parse(localStorage.id) == JSON.parse(targetUser.id) ? (
        <p>Cannot edit own profile</p>
      ) : (
        <>
          <form onSubmit={editUser} className="blueBlock">
            <ul>
              {userSubmitError.map((err) => {
                return <li key={userSubmitError.indexOf(err)}>{err.msg}</li>;
              })}
            </ul>
            <h2>Permissions:</h2>
            <div className="toggleSet">
              <label htmlFor="isConfirmed">Confirmed:</label>
              <input
                type="checkbox"
                name="isConfirmed"
                id="isConfirmed"
                checked={isConfirmed}
                onChange={handleIsConfirmed}
              />
            </div>
            <div className="toggleSet">
              <label htmlFor="isAdmin">Admin:</label>
              <input
                type="checkbox"
                name="isAdmin"
                id="isAdmin"
                checked={isAdmin}
                onChange={handleIsAdmin}
              />
            </div>

            <button>Save changes</button>
          </form>
          <form onSubmit={deleteUser} className="blueBlock">
            <h2>Delete User:</h2>
            <button>Delete</button>
          </form>
        </>
      )}
    </div>
  );
}

export default UserDetail;
