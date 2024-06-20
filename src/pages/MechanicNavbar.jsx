import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const MechanicNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  return (
    <div className="sidebar">
      <NavLink to="/mechanic/dashboard" activeClassName="active">
        Dashboard
      </NavLink>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default MechanicNavbar;
