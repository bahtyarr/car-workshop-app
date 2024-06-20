import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/animation/Loader";
import BaseApiService from "../../services/BaseApiService";

const apiService = new BaseApiService();

const EditCar = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    registrationNumber: "",
    model: "",
    make: "",
    color: "",
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await apiService.Get(`/Cars/${carId}`);
        setFormData({
          registrationNumber: response.registrationNumber,
          model: response.model,
          make: response.make,
          color: response.color,
        });
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiService.Put(`/Cars/${carId}`, formData);
      navigate(-1);
    } catch (error) {
      console.error("Error updating car:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Edit Car</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Plate Number:</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Make:</label>
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default EditCar;
