
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RequestRidePage from "./pages/RequestRidePage";
import RideStatusPage from "./pages/RideStatusPage";
import RideHistoryPage from "./pages/RideHistory";
import DriverDashboard from "./pages/DriverDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/request-ride" element={<RequestRidePage />} />
      <Route path="/ride-status" element={<RideStatusPage />} />
      <Route path="/history" element={<RideHistoryPage />} />
      <Route path="/driver-dashboard" element={<DriverDashboard />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}