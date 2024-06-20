import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ roles, children }) => {
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!token || !currentUser) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.indexOf(currentUser.role) === -1) {
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
