import { useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaStream,
  FaHistory,
  FaUser,
} from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: <FaHome />, path: "/request-ride" },
    { label: "Ride Status", icon: <FaStream />, path: "/ride-status" },
    { label: "Rides", icon: <FaHistory />, path: "/history" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm flex justify-around py-3 z-10">
      {navItems.map(({ label, icon, path }) => {
        const isActive = location.pathname === path;

        return (
          <button
            key={label}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center text-xs ${
              isActive ? "text-[#131842] font-semibold" : "text-gray-500"
            }`}
          >
            {icon}
            <span className="mt-1">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
