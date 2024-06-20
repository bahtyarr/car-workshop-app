import React, { useEffect, useState } from "react";
import BaseApiService from "../../services/BaseApiService";
import { Link } from "react-router-dom";
import Loader from "../../components/animation/Loader";

const apiService = new BaseApiService();

const MechanicDashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await apiService.Get(
        `/Jobs/mechanic/${currentUser.nameid}`
      );
      setJobs(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Mechanic Dashboard</h1>
      <p>Welcome to the Mechanic Dashboard. Here you can manage jobs.</p>

      <h2>Jobs List</h2>
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
                <Link to={`/mechanic/edit-job/${job.id}`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MechanicDashboard;
