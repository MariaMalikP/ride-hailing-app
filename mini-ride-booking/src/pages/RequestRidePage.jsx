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
        if (res.data.ride && res.data.ride.status !== "Completed" && res.data.ride.status !== "Rejected") {
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
    <div className="min-h-screen bg-white p-6 pb-24">
      <div className="max-w-md mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-center text-[#131842]">
          Book Your Ride
        </h1>

        {/* Subheading + Location Fields */}
        <div className="space-y-4">
          <h2 className="text-md font-semibold text-[#131842]">Enter Locations</h2>
          <div className="bg-gray-50 p-5 rounded-2xl shadow space-y-4">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#E2825B]" />
              <input
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Pickup location"
                className="w-full border-b border-gray-300 py-2 outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaLocationArrow className="text-[#E2825B]" />
              <input
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="Dropoff location"
                className="w-full border-b border-gray-300 py-2 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Subheading + Ride Type Options */}
        <div className="space-y-4">
          <h2 className="text-md font-semibold text-[#131842]">Choose Your Transport</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { type: "car", icon: <FaCarSide />, label: "Car" },
              { type: "rickshaw", icon: <FaTruckPickup />, label: "Rickshaw" },
              { type: "bike", icon: <FaMotorcycle />, label: "Bike" },
            ].map(({ type, icon, label }) => (
              <div
                key={type}
                onClick={() => setRideType(type)}
                className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition ${
                  rideType === type
                    ? "bg-[#E2825B] text-white"
                    : "bg-white border border-gray-200"
                }`}
              >
                {icon}
                <span className="text-sm mt-2">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleRequest}
          className="w-full bg-[#131842] text-white py-3 rounded-xl"
        >
          Confirm Ride
        </button>
      </div>

      <Navbar />
    </div>
  );
}
