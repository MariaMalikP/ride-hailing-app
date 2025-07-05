import { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  FaMotorcycle,
  FaCar,
  FaCheckCircle,
  FaHome,
  FaHistory,
  FaUser,
  FaStream,
} from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import Navbar from "../components/navbar";

const statuses = ["Requested", "Accepted", "In Progress", "Completed"];

export default function RideStatusPage() {
  const [currentStatus, setCurrentStatus] = useState("In Progress");

  const pickup = "Mall Road";
  const dropoff = "Airport";
  const rideType = "Bike";

  const RideIcon = () => {
    switch (rideType) {
      case "Bike":
        return <FaMotorcycle className="text-[#E2825B]" size={18} />;
      case "Car":
        return <FaCar className="text-[#E2825B]" size={18} />;
      default:
        return <FaMotorcycle className="text-[#E2825B]" size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 pb-24">
      <div className="px-6 pt-10 pb-4 flex flex-col items-center">
        <div className="w-full max-w-md space-y-6">

          {/* Page Title */}
          <h1 className="text-2xl font-bold text-[#131842] text-center md:text-3xl">
            Ride Status
          </h1>

          {/* Ride Info */}
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-4">
            <h2 className="text-lg font-semibold text-[#131842]">Your Ride</h2>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <HiOutlineLocationMarker className="text-[#E2825B]" />
              <span>{pickup} → {dropoff}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              {RideIcon()} <span>{rideType}</span>
            </div>
          </div>

          {/* Status Stepper */}
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
            <h3 className="text-base font-medium text-[#131842] mb-4">Current Status</h3>
            <div className="relative border-l-2 border-gray-200 ml-4 space-y-6">
              {statuses.map((status, idx) => {
                const statusIndex = statuses.indexOf(currentStatus);
                const isCompleted = idx < statusIndex;
                const isActive = idx === statusIndex;

                return (
                  <div key={status} className="relative pl-6 flex flex-col gap-1">
                    <div
                      className={`absolute -left-[10px] w-5 h-5 rounded-full flex items-center justify-center 
                        ${isCompleted
                          ? "bg-gradient-to-br from-[#E2825B] to-orange-400 text-white"
                          : isActive
                          ? "border-2 border-[#E2825B] bg-white text-[#E2825B]"
                          : "border-2 border-gray-300 bg-white text-gray-300"}`}
                    >
                      {isCompleted ? <FaCheckCircle size={12} /> : <BsDot size={24} />}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isCompleted
                          ? "text-gray-700"
                          : isActive
                          ? "text-[#E2825B]"
                          : "text-gray-400"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <Navbar></Navbar>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div
      className={`flex flex-col items-center text-xs ${
        active ? "text-[#131842] font-semibold" : "text-gray-500"
      }`}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </div>
  );
}
