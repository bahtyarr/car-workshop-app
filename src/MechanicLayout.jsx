import { Route, Routes } from "react-router-dom";
import MechanicDashboard from "./pages/mechanic/MechanicDashboard";
import EditJob from "./pages/mechanic/EditJob";

const MechanicLayout = () => {
  return (
    <div className="mehchanic-layout">
      <div className="main-content">
        <Routes>
          <Route path="dashboard" element={<MechanicDashboard />} />
          <Route path="edit-job/:jobId" element={<EditJob />} />
        </Routes>
      </div>
    </div>
  );
};

export default MechanicLayout;
