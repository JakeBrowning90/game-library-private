import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiSource } from "../apiSource";

function ProtectedRoute({
  // Props
  children,
}) {
  // State declarations
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(null);

  // Functions
  const navigate = useNavigate();

  // Check that credentials are valid, redirect if fail
  useEffect(() => {
    fetch(apiSource + "user/check/", {
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
        }
        return response.json();
      })
      .catch((error) => setError(error))
      .finally(setVerifying(false));
  }, [children]);

  // Render
  if (verifying) return <p className="verifyDiv">Verifying...</p>;
  if (error) return <p>Network error, please try again later.</p>;
  
  // Immediately redirect if no credentials at all
  if (!localStorage.getItem("token") || !localStorage.getItem("isConfirmed")) {
    return navigate("/login");
  }

  return children;
}

export default ProtectedRoute;
