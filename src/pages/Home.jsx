import React from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser.role === "Admin") {
    return <Navigate to="/admin/dashboard" />;
  } else if (currentUser.role === "Mechanic") {
    return <Navigate to="/mechanic/dashboard" />;
  } else if (currentUser.role === "CarOwner") {
    return <Navigate to="/car-owner/dashboard" />;
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Car Workshop System.</p>
    </div>
  );
};

export default Home;
