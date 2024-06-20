import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/admin/Dashboard";
import AddRepairs from "./pages/admin/AddRepairs";
import Services from "./pages/admin/Services";
import AddService from "./pages/admin/AddService";
import EditService from "./pages/admin/EditService";
import Jobs from "./pages/admin/Jobs";
import AddJob from "./pages/admin/AddJob";
import EditJob from "./pages/admin/EditJob";
import Cars from "./pages/admin/Cars";
import AddCar from "./pages/admin/AddCar";
import EditCar from "./pages/admin/EditCar";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="main-content">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-repair" element={<AddRepairs />} />
          <Route path="services" element={<Services />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="edit-service/:id" element={<EditService />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="edit-job/:jobId" element={<EditJob />} />
          <Route path="cars" element={<Cars />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="edit-car/:carId" element={<EditCar />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
