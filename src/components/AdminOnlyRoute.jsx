import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { apiurl } from "../apiSource";

function AdminOnlyRoute({
  // Props
  children,
}) {
  // State declarations
  // Functions
  const navigate = useNavigate();

  useEffect(() => {
    if (!JSON.parse(localStorage.isAdmin)) {
      navigate("/");
    }
  }, [children]);

  // Render
  return children;
}

export default AdminOnlyRoute;
