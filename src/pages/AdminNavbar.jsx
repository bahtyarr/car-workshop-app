import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  return (
    <div className="sidebar">
      <NavLink to="/admin/dashboard" activeClassName="active">
        Dashboard
      </NavLink>
      <NavLink to="/admin/services" activeClassName="active">
        Services
      </NavLink>
      <NavLink to="/admin/jobs" activeClassName="active">
        Jobs
      </NavLink>
      <NavLink to="/admin/cars" activeClassName="active">
        Cars
      </NavLink>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
