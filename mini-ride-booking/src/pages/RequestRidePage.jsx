import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/navbar";
import {
  FaMapMarkerAlt,
  FaLocationArrow,
  FaCarSide,
  FaTruckPickup,
  FaMotorcycle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RequestRidePage() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideType, setRideType] = useState("car");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const checkActiveRide = async () => {
      try {
        const res = await axios.get(`/ride-status/${user.id}`);
        if (
          res.data.ride &&
          res.data.ride.status !== "Completed" &&
          res.data.ride.status !== "Rejected"
        ) {
          navigate("/ride-status");
        }
      } catch (err) {
        console.log("No active ride.");
      }
    };
    checkActiveRide();
  }, []);

  const handleRequest = async () => {
    if (!pickup || !dropoff) return alert("Enter both locations");

    try {
      await axios.post("/request-ride", {
        passengerId: user.id,
        pickup,
        dropoff,
        rideType,
      });

      navigate("/ride-status");
    } catch (err) {
      alert(err.response?.data?.msg || "Ride request failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Form Wrapper: Not centered on mobile, centered on md+ */}
      <div className="flex-1 py-12 px-6 md:flex md:justify-center md:items-center">
        <div className="w-full md:max-w-lg space-y-12">
          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#131842]">Book Your Ride</h1>
           
          </div>

          {/* Location Inputs */}
          <div className="space-y-6">
          
            <div className="bg-gray-50 p-6 rounded-3xl shadow space-y-6">
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-[#1DBF73]" />
                <input
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Pickup location"
                  className="w-full border-b border-gray-300 pb-2 outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-4">
                <FaLocationArrow className="text-[#1DBF73]" />
                <input
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  placeholder="Dropoff location"
                  className="w-full border-b border-gray-300 pb-2 outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Ride Type Selection */}
          <div className="space-y-4">
            <h2 className="text-md font-semibold text-[#131842]">Choose Your Transport</h2>
            <div className="flex justify-between gap-3">
              {[
                { type: "car", icon: <FaCarSide size={20} />, label: "Car" },
                { type: "rickshaw", icon: <FaTruckPickup size={20} />, label: "Rickshaw" },
                { type: "bike", icon: <FaMotorcycle size={20} />, label: "Bike" },
              ].map(({ type, icon, label }) => (
                <div
                  key={type}
                  onClick={() => setRideType(type)}
                  className={`flex flex-col items-center justify-center w-full py-5 rounded-xl cursor-pointer text-sm font-medium ${
                    rideType === type
                      ? "bg-[#E9FBF3] text-[#1DBF73] shadow"
                      : "bg-white border border-gray-200 text-gray-600"
                  }`}
                >
                  {icon}
                  <span className="mt-2">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Confirm Button */}
          <div>
            <button
              onClick={handleRequest}
              className="w-full bg-[#131842] text-white py-4 rounded-xl font-semibold text-base hover:bg-[#0f1438] transition"
            >
              Confirm Ride
            </button>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
}
