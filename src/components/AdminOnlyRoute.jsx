import { useEffect } from "react";
import { useNavigate } from "react-router";

function AdminOnlyRoute({
  // Props
  children,
}) {
  // State declarations
  // Functions
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.length == 0 || !JSON.parse(localStorage.isAdmin)) {
      navigate("/");
    }
  }, [children]);

  // Render
  return children;
}

export default AdminOnlyRoute;
