import React from "react";
import { Navigate } from "react-router-dom";
export default function UserProtectedRoute({ element }) {
  const isAuthenticated = !!localStorage.getItem("TOKEN");

  return isAuthenticated ? element : <Navigate to="/agent/login" />;
}
