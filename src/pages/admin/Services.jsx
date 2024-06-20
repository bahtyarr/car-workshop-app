import React, { useState, useEffect } from "react";
import useCurrencyFormat from "../../custom-hook/useCurrencyFormat";
import BaseApiService from "../../services/BaseApiService";
import ConfirmationPopup from "../../components/popup/ConfirmationPopup";
import { Link } from "react-router-dom";

const apiService = new BaseApiService();

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const { formatCurrency } = useCurrencyFormat();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await apiService.Get("/Services");
      setServices(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteService = async (id) => {
    try {
      await apiService.Delete(`/Services/${id}`);
      fetchServices();
      setShowPopup(false);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleDeleteClick = (service) => {
    setSelectedService(service);
    setShowPopup(true);
  };

  const handleCancelDelete = () => {
    setSelectedService(null);
    setShowPopup(false);
  };

  const handleConfirmDelete = () => {
    if (selectedService) {
      deleteService(selectedService.id);
    }
  };

  return (
    <div>
      <h1>Services</h1>
      <div className="action-buttons">
        <Link to="/admin/add-service">
          <button>Add Service</button>
        </Link>
      </div>
      <table className="table-container">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{formatCurrency(service.price)}</td>
              <td>
                <button onClick={() => handleDeleteClick(service)}>
                  Delete
                </button>
                <Link to={`/admin/edit-service/${service.id}`}>
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

export default Services;
