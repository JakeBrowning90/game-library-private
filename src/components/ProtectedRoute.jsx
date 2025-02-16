import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiurl } from "../apiSource";

function ProtectedRoute({
  // Props
  children,
}) {
  // State declarations
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(null);

  // Functions
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiurl + "user/check/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
        confirmation: localStorage.getItem("isConfirmed"),
      },
    })
      .then((response) => {
        if (response.status == 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          return response.json();
        }
      })
      .then(setVerifying(false));
  }, [children]);

  // Render
  if (verifying) return <p>Verifying...</p>;

  return children;
}

export default ProtectedRoute;
