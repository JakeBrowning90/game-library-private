import React, { useState } from "react";
import { Navigate } from "react-router";
// import apiSource

function ProtectedRoute(
  {
    // Props
    children
  }
) {
  // State declarations
  // Functions
  // Render

  if (!localStorage.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
