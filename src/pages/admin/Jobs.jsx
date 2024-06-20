import React, { useState, useEffect } from "react";
import BaseApiService from "../../services/BaseApiService";
import { Link } from "react-router-dom";
import ConfirmationPopup from "../../components/popup/ConfirmationPopup";

const apiService = new BaseApiService();

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await apiService.Get("/Jobs");
      setJobs(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await apiService.Delete(`/Jobs/${id}`);
      fetchJobs();
      setShowPopup(false);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleDeleteClick = (job) => {
    setSelectedJob(job);
    setShowPopup(true);
  };

  const handleCancelDelete = () => {
    setSelectedJob(null);
    setShowPopup(false);
  };

  const handleConfirmDelete = () => {
    if (selectedJob) {
      deleteJob(selectedJob.id);
    }
  };

  return (
    <div>
      <h1>Jobs</h1>
      <div className="action-buttons">
        <Link to="/admin/add-job">
          <button>Add Job</button>
        </Link>
      </div>
      <table className="table-container">
        <thead>
          <tr>
            <th>Car Owner</th>
            <th>Car Model</th>
            <th>Car Number</th>
            <th>Service Name</th>
            <th>Mechanic Name</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.carOwner}</td>
              <td>{job.carModel}</td>
              <td>{job.carNumber}</td>
              <td>{job.serviceName}</td>
              <td>{job.mechanicName}</td>
              <td>{job.status}</td>
              <td>
                <button onClick={() => handleDeleteClick(job)}>Delete</button>
                <Link to={`/admin/edit-job/${job.id}`}>
                  <button>Edit</button>
                </Link>
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

export default Jobs;
