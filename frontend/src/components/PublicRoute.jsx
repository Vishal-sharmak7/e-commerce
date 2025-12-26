// components/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If logged in, redirect to dashboard/home
  if (token) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, allow access to login/register
  return children;
};

export default PublicRoute;
