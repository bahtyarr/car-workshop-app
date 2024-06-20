import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseApiService from "../../services/BaseApiService";
import Dropdown from "../../components/custom-fields/Dropdown";
import Loader from "../../components/animation/Loader";
import "./css/AddRepairs.css";

const apiService = new BaseApiService();

const AddRepairs = () => {
  const [cars, setCars] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
    fetchStatuses();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await apiService.Get("/Cars");
      setCars(response);
      if (response.length > 0) {
        setSelectedCarId(response[0].id);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await apiService.Get("/Types/StatusTypeList");
      setStatuses(response);
      if (response.length > 0) {
        setSelectedStatus(response[0].id);
      }
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        carId: selectedCarId,
        startDate,
        status: selectedStatus,
      };
      await apiService.Post("/Repairs", data);
      navigate(-1);
    } catch (error) {
      console.error("Error creating repair:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="add-repairs-container">
      <h1>Add Repairs</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Car:</label>
          <Dropdown
            options={cars}
            onChange={(e) => setSelectedCarId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Select Status:</label>
          <Dropdown
            options={statuses}
            onChange={(e) => setSelectedStatus(e.target.value)}
          />
        </div>
        <div className="btn-form">
          <button type="submit" className="btn-submit">
            Submit
          </button>
          <button onClick={() => navigate(-1)} className="btn-back">
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRepairs;
