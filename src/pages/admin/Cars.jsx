import React, { useState, useEffect } from "react";
import BaseApiService from "../../services/BaseApiService";
import { Link } from "react-router-dom";
import ConfirmationPopup from "../../components/popup/ConfirmationPopup";

const apiService = new BaseApiService();

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await apiService.Get("/Cars");
      setCars(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteCar = async (id) => {
    try {
      await apiService.Delete(`/Cars/${id}`);
      fetchCars();
      setShowPopup(false);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleDeleteClick = (car) => {
    setSelectedCar(car);
    setShowPopup(true);
  };

  const handleCancelDelete = () => {
    setSelectedCar(null);
    setShowPopup(false);
  };

  const handleConfirmDelete = () => {
    if (selectedCar) {
      deleteCar(selectedCar.id);
    }
  };

  return (
    <div>
      <h1>Cars</h1>
      <div className="action-buttons">
        <Link to="/admin/add-car">
          <button>Add Car</button>
        </Link>
      </div>
      <table className="table-container">
        <thead>
          <tr>
            <th>Car Owner</th>
            <th>Owner Email</th>
            <th>Car Number</th>
            <th>Car Model</th>
            <th>Car Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.ownerName}</td>
              <td>{car.ownerEmail}</td>
              <td>{car.registrationNumber}</td>
              <td>{car.model}</td>
              <td>{car.color}</td>
              <td>
                <button onClick={() => handleDeleteClick(car)}>Delete</button>
                <Link to={`/admin/edit-car/${car.id}`}>
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

export default Cars;
