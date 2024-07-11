import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseApiService from "../../services/BaseApiService";
import Loader from "../../components/animation/Loader";

const apiService = new BaseApiService();

const EditService = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const response = await apiService.Get(`/Services/${id}`);
      setName(response.name);
      setPrice(response.price);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiService.Put(`/Services/${id}`, {
        name,
        price: parseFloat(price),
      });
      navigate(-1);
    } catch (error) {
      console.error("Error updating service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="edit-service-container">
      <h1>Edit Service</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="btn-form">
          <button type="submit" className="btn-submit">
            Update
          </button>
          <button className="btn-back">Back</button>
        </div>
      </form>
    </div>
  );
};

export default EditService;
