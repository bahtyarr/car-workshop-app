import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseApiService from "../../services/BaseApiService";
import Dropdown from "../../components/custom-fields/Dropdown";
import Loader from "../../components/animation/Loader";

const apiService = new BaseApiService();

const AddJobs = () => {
  const [cars, setCars] = useState([]);
  const [services, setServices] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedMechanicId, setSelectedMechanicId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
    fetchServices();
    fetchMechanics();
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

  const fetchServices = async () => {
    try {
      const response = await apiService.Get("/Services");
      setServices(response);
      if (response.length > 0) {
        setSelectedServiceId(response[0].id);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchMechanics = async () => {
    try {
      const response = await apiService.Get("/Mechanics");
      setMechanics(response);
      if (response.length > 0) {
        setSelectedMechanicId(response[0].id);
      }
    } catch (error) {
      console.error("Error fetching mechanics:", error);
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
        serviceId: selectedServiceId,
        mechanicId: selectedMechanicId,
        status: selectedStatus,
      };
      await apiService.Post("/Jobs", data);
      navigate(-1);
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="add-jobs-container">
      <h1>Add Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Car:</label>
          <Dropdown
            options={cars}
            onChange={(e) => setSelectedCarId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Select Service:</label>
          <Dropdown
            options={services}
            onChange={(e) => setSelectedServiceId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Select Mechanic:</label>
          <Dropdown
            options={mechanics}
            onChange={(e) => setSelectedMechanicId(e.target.value)}
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

export default AddJobs;
