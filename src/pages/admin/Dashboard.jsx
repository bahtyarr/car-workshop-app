import React, { useEffect, useState } from "react";
import BaseApiService from "../../services/BaseApiService";
import useDateFormat from "../../custom-hook/useDateFormat";
import "./css/Dashboard.css";
import ConfirmationPopup from "../../components/popup/ConfirmationPopup";
import { Link } from "react-router-dom";

const apiService = new BaseApiService();

const AdminDashboard = () => {
  const [repairs, setRepairs] = useState([]);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const { formatDate } = useDateFormat();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchRepairs();
  }, []);

  const fetchRepairs = async () => {
    try {
      const response = await apiService.Get("/Repairs");
      setRepairs(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteRepair = async (id) => {
    try {
      await apiService.Delete(`/Repairs/${id}`);
      fetchRepairs();
      setShowPopup(false);
    } catch (error) {
      console.error("Error deleting repair:", error);
    }
  };

  const handleDeleteClick = (repair) => {
    setSelectedRepair(repair);
    setShowPopup(true);
  };

  const handleCancelDelete = () => {
    setSelectedRepair(null);
    setShowPopup(false);
  };

  const handleConfirmDelete = () => {
    if (selectedRepair) {
      deleteRepair(selectedRepair.id);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>
        Welcome to the Admin Dashboard. Here you can manage users, manage
        repairs and manage jobs.
      </p>

      <div className="action-buttons">
        <Link to="/admin/add-repair">
          <button>Add Repair</button>
        </Link>
      </div>

      <h2>Repairs List</h2>
      <table className="table-container">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Car Registration Number</th>
            <th>Start Date</th>
            <th>Status</th>
            <th>Services</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {repairs.map((repair) => (
            <tr key={repair.id}>
              <td>{repair.id}</td>
              <td>{repair.name}</td>
              <td>{repair.carRegistrationNumber}</td>
              <td>{formatDate(repair.startDate)}</td>
              <td>{repair.status}</td>
              <td>{repair.services}</td>
              <td>
                <button onClick={() => handleDeleteClick(repair)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <ConfirmationPopup
          message={`Are you sure you want to delete this?`}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
