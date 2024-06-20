import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./AdminLayout";
import AdminNavbar from "./pages/AdminNavbar";
import MechanicNavbar from "./pages/MechanicNavbar";
import MechanicLayout from "./MechanicLayout";
import CarOwnerNavbar from "./pages/CarOwnerNavbar";
import CarOwnerLayout from "./CarOwnerLayout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute roles={["Admin"]}>
                <AdminNavbar />
                <AdminLayout />
              </PrivateRoute>
            }
          />
          <Route
            path="/mechanic/*"
            element={
              <PrivateRoute roles={["Mechanic"]}>
                <MechanicNavbar />
                <MechanicLayout />
              </PrivateRoute>
            }
          />
          <Route
            path="/car-owner/*"
            element={
              <PrivateRoute roles={["CarOwner"]}>
                <CarOwnerNavbar />
                <CarOwnerLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
