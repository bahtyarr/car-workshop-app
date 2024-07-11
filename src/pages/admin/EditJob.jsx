import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseApiService from "../../services/BaseApiService";
import Dropdown from "../../components/custom-fields/Dropdown";
import Loader from "../../components/animation/Loader";

const apiService = new BaseApiService();

const EditJob = () => {
  const { jobId } = useParams();
  const [cars, setCars] = useState([]);
  const [services, setServices] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedMechanicId, setSelectedMechanicId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [
        carsResponse,
        servicesResponse,
        mechanicsResponse,
        statusesResponse,
        jobResponse,
      ] = await Promise.all([
        apiService.Get("/Cars"),
        apiService.Get("/Services"),
        apiService.Get("/Mechanics"),
        apiService.Get("/Types/StatusTypeList"),
        apiService.Get(`/Jobs/${jobId}`),
      ]);

      setCars(carsResponse);
      setServices(servicesResponse);
      setMechanics(mechanicsResponse);
      setStatuses(statusesResponse);

      if (jobResponse) {
        setSelectedCarId(jobResponse.carId);
        setSelectedServiceId(jobResponse.serviceId);
        setSelectedMechanicId(jobResponse.mechanicId);
        setSelectedStatus(jobResponse.status);
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setIsLoading(false);
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
      await apiService.Put(`/Jobs/${jobId}`, data);
      navigate(-1);
    } catch (error) {
      console.error("Error updating job:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="edit-job-container">
      <h1>Edit Job</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Car:</label>
          <Dropdown
            options={cars}
            disabled={true}
            value={selectedCarId}
            onChange={(e) => setSelectedCarId(e.target.value)}
          />
        </div>
        <div>
          <label>Select Service:</label>
          <Dropdown
            options={services}
            disabled={true}
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
          />
        </div>
        <div>
          <label>Select Mechanic:</label>
          <Dropdown
            options={mechanics}
            value={selectedMechanicId}
            disabled={true}
            onChange={(e) => setSelectedMechanicId(e.target.value)}
          />
        </div>
        <div>
          <label>Select Status:</label>
          <Dropdown
            options={statuses}
            value={selectedStatus}
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

export default EditJob;
