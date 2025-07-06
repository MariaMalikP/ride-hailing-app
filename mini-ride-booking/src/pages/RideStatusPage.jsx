import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  FaMotorcycle,
  FaCar,
  FaTruckPickup,
  FaCheckCircle,
} from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import Navbar from "../components/navbar";
import axios from "../api/axios";

const statuses = ["Requested", "Accepted", "In Progress", "Completed"];

export default function RideStatusPage() {
  const [ride, setRide] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch ride status
  const fetchRideStatus = async () => {
    try {
      const res = await axios.get(`/ride-status/${user.id}`);
      setRide(res.data.ride);
    } catch (err) {
      console.error(err);
      setError("No current ride found.");
    }
  };

  useEffect(() => {
    fetchRideStatus();
    const interval = setInterval(fetchRideStatus, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  // If ride is completed → redirect to home
  useEffect(() => {
    if (ride?.status === "Completed" || ride?.status === "Rejected") {
      setTimeout(() => {
        navigate("/request-ride");
      }, 2000); // Delay to show final status
    }
  }, [ride?.status]);
  useEffect(() => {
  const fetchRideStatus = async () => {
    try {
      const res = await axios.get(`/ride-status/${user.id}`);
      setRide(res.data.ride);
    } catch (err) {
      setError("No active ride.");
    }
  };
  fetchRideStatus();
}, []);


  const RideIcon = () => {
    switch (ride?.rideType?.toLowerCase()) {
      case "bike":
        return <FaMotorcycle className="text-[#E2825B]" size={18} />;
      case "car":
        return <FaCar className="text-[#E2825B]" size={18} />;
      case "rickshaw":
        return <FaTruckPickup className="text-[#E2825B]" size={18} />;
      default:
        return <FaCar className="text-[#E2825B]" size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 pb-24">
      <div className="px-6 pt-10 pb-4 flex flex-col items-center">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-[#131842] text-center md:text-3xl">
            Ride Status
          </h1>

          {error ? (
            <div className="text-center text-gray-500 text-sm mt-8">{error}</div>
          ) : ride ? (
            <>
              {/* Ride Info */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-4">
                <h2 className="text-lg font-semibold text-[#131842]">Your Ride</h2>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <HiOutlineLocationMarker className="text-[#E2825B]" />
                  <span>{ride.pickup} → {ride.dropoff}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  {RideIcon()} <span>{ride.rideType}</span>
                </div>
              </div>

              {/* Status Stepper */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                <h3 className="text-base font-medium text-[#131842] mb-4">Current Status</h3>
                <div className="relative border-l-2 border-gray-200 ml-4 space-y-6">
                  {statuses.map((status, idx) => {
                    const currentIndex = statuses.indexOf(ride.status);
                    const isCompleted = idx < currentIndex;
                    const isActive = idx === currentIndex;

                    return (
                      <div key={status} className="relative pl-6 flex flex-col gap-1">
                        <div
                          className={`absolute -left-[10px] w-5 h-5 rounded-full flex items-center justify-center 
                          ${
                            isCompleted
                              ? "bg-gradient-to-br from-[#E2825B] to-orange-400 text-white"
                              : isActive
                              ? "border-2 border-[#E2825B] bg-white text-[#E2825B]"
                              : "border-2 border-gray-300 bg-white text-gray-300"
                          }`}
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
            </>
          ) : (
            <div className="text-sm text-gray-500 mt-8">Loading...</div>
          )}
        </div>
      </div>

      {/* Bottom Navbar */}
      <Navbar />
    </div>
  );
}
