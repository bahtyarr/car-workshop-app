import React, { useState, useEffect } from "react";
import BaseApiService from "../../services/BaseApiService";
import Loader from "../../components/animation/Loader";
import useDateFormat from "../../custom-hook/useDateFormat";

const apiService = new BaseApiService();

const CarOwnerDashboard = () => {
  const [carsData, setCarsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { formatDate } = useDateFormat();

  useEffect(() => {
    fetchCarsData();
  }, []);

  const fetchCarsData = async () => {
    try {
      const response = await apiService.Get("/CarOwners/cars");
      setCarsData(response);
    } catch (error) {
      console.error("Error fetching cars data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Car Owner Dashboard</h1>
      {carsData.map((car) => (
        <div key={car.carId} className="car-card">
          <h2>
            Car Make: {car.make}, Car Model: {car.model}
          </h2>
          <p>
            <strong>Registration Number:</strong> {car.registrationNumber}
          </p>
          <p>
            <strong>Color:</strong> {car.color}
          </p>
          <h3>Repairs</h3>
          {car.repairs.length > 0 ? (
            <ul>
              {car.repairs.map((repair) => (
                <li key={repair.repairId}>
                  <p>
                    <strong>Status:</strong> {repair.status}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {formatDate(repair.startDate)}
                  </p>
                  {repair.endDate && (
                    <p>
                      <strong>End Date:</strong> {formatDate(repair.endDate)}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No repairs found for this car.</p>
          )}
          <h3>Jobs</h3>
          {car.jobs.length > 0 ? (
            <ul>
              {car.jobs.map((job) => (
                <li key={job.jobId}>
                  <p>
                    <strong>Service:</strong> {job.serviceName}
                  </p>
                  <p>
                    <strong>Mechanic:</strong> {job.mechanicName}
                  </p>
                  <p>
                    <strong>Status:</strong> {job.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No jobs found for this car.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CarOwnerDashboard;
