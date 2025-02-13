import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { apiurl } from "../apiSource";

function ProtectedRoute({
  // Props
  children,
}) {
  // State declarations
  // Functions
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiurl + "user/check/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.status != 200 || JSON.parse(localStorage.isConfirmed) == false) {
        localStorage.clear();
        navigate("/login");
      }
    });
  }, [children]);

  // Render
  return children;
}

export default ProtectedRoute;
