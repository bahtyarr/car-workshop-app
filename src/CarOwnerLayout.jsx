import { Route, Routes } from "react-router-dom";
import CarOwnerDashboard from "./pages/car-owner/CarOwnerDashboard";

const CarOwnerLayout = () => {
  return (
    <div className="car-owner-layout">
      <div className="main-content">
        <Routes>
          <Route path="dashboard" element={<CarOwnerDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default CarOwnerLayout;
