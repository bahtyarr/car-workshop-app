import React, { useState } from "react";
import BaseApiService from "../../services/BaseApiService";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/animation/Loader";

const apiService = new BaseApiService();

const AddCar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    registrationNumber: "",
    model: "",
    make: "",
    color: "",
    ownerName: "",
    email: "",
    password: "",
    startDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiService.Post("/Cars", formData);
      navigate(-1);
    } catch (error) {
      console.error("Error adding car:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="add-cars-container">
      <h1>Add Car</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Plate Number:</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Make:</label>
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Owner Name:</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="form-control"
            required
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

export default AddCar;
