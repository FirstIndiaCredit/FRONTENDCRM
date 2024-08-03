// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("TOKEN");

  return isAuthenticated ? element : <Navigate to="/admin/login" />;
};

export default AdminProtectedRoute;
