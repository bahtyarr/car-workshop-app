import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseApiService from "../../services/BaseApiService";
import Loader from "../../components/animation/Loader";

const apiService = new BaseApiService();

const AddService = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = {
        name: name,
        price: price,
      };

      await apiService.Post("/Services", data);
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
    <div className="add-services-container">
      <h1>Add Service</h1>
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

export default AddService;
