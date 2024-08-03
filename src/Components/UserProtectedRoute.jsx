// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("TOKEN");

  return isAuthenticated ? element : <Navigate to="/signin" />;
};

export default UserProtectedRoute;
