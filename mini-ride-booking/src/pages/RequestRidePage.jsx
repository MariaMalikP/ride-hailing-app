import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaLocationArrow,
  FaCarSide,
  FaTruckPickup,
  FaMotorcycle,
  FaHome,
  FaHistory,
  FaUser,
  FaStream,
} from "react-icons/fa";
import Navbar from "../components/navbar";

export default function RequestRidePage() {
  const [rideType, setRideType] = useState("car");

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* Main Section */}
      <div className="flex-1 px-6 py-8 md:py-12 md:px-0 flex justify-center">
        <div className="w-full max-w-md space-y-6">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-[#131842] md:text-3xl text-center">
            Book Your Ride
          </h1>

          {/* Location Heading */}
          <h2 className="text-sm font-medium text-gray-600 mt-4 mb-2">Enter your locations</h2>

          {/* Location Card */}
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#E2825B]" />
              <input
                type="text"
                placeholder="Pickup location"
                className="flex-1 text-sm bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#E2825B] py-2"
              />
            </div>
            <div className="flex items-center gap-3">
              <FaLocationArrow className="text-[#E2825B]" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="flex-1 text-sm bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#E2825B] py-2"
              />
            </div>
          </div>

          {/* Ride Type Heading */}
          <h2 className="text-sm font-medium text-gray-600 mt-6 mb-2">Choose your transport</h2>

          {/* Ride Types - Horizontal Boxes */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { type: "car", icon: <FaCarSide size={24} />, label: "Car" },
              { type: "rickshaw", icon: <FaTruckPickup size={24} />, label: "Rickshaw" },
              { type: "bike", icon: <FaMotorcycle size={24} />, label: "Bike" },
            ].map(({ type, icon, label }) => (
              <div
                key={type}
                onClick={() => setRideType(type)}
                className={`flex flex-col items-center justify-center h-28 rounded-xl cursor-pointer transition ${
                  rideType === type
                    ? "bg-[#E68369] text-white shadow-md"
                    : "bg-white text-[#131842] border border-gray-200"
                }`}
              >
                {icon}
                <span className="text-sm mt-2 font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Confirm Button */}
          <button className="w-full bg-[#131842] text-white py-3 rounded-xl font-semibold hover:bg-[#0f1438] transition mt-6">
            Confirm Ride
          </button>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
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
