import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/navbar";
import {
  FaMapMarkerAlt,
  FaLocationArrow,
  FaClock,
  FaCheckCircle,
  FaMotorcycle,
  FaCar,
  FaTruckPickup,
} from "react-icons/fa";

export default function DriverDashboardPage() {
  const [rides, setRides] = useState([]);
  const [currentRide, setCurrentRide] = useState(null);
  const driver = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCurrentAndPendingRides();
  }, []);

  const fetchCurrentAndPendingRides = async () => {
    try {
      const res = await axios.get("/pending-rides");
      const allRides = res.data.all || [];
      const pending = res.data.pending || [];

      const activeRide = allRides.find(
        (r) => r.driverId === driver.id && r.status !== "Completed"
      );

      if (activeRide) {
        setCurrentRide(activeRide);
        setRides([]);
      } else {
        setCurrentRide(null);
        setRides(pending);
      }
    } catch (err) {
      console.error("Failed to fetch rides", err);
    }
  };

  const handleResponse = async (rideId, accept) => {
    try {
      await axios.post("/respond-ride", {
        rideId,
        driverId: driver.id,
        accept,
      });


      fetchCurrentAndPendingRides();
    } catch (err) {
      console.error("Ride response failed", err);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const endpoint =
        newStatus === "Completed" ? "/complete-ride" : "/update-status";

      await axios.post(endpoint, {
        rideId: currentRide.id,
        ...(newStatus !== "Completed" && { status: newStatus }),
      });

      if (newStatus === "Completed") {
        setCurrentRide(null);
      }

      fetchCurrentAndPendingRides();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const RideIcon = (type) => {
    const iconClass = "text-[#1DBF73]";
    switch (type?.toLowerCase()) {
      case "bike":
        return <FaMotorcycle className={iconClass} />;
      case "car":
        return <FaCar className={iconClass} />;
      case "rickshaw":
        return <FaTruckPickup className={iconClass} />;
      default:
        return <FaCar className={iconClass} />;
    }
  };

  const RideCard = ({ ride, isCurrent = false }) => (
    <div
      className={`rounded-2xl p-5 space-y-3 ${
        isCurrent
          ? "bg-[#E9FBF3] border border-[#1DBF73]"
          : "bg-gray-50 border border-gray-200"
      }`}
    >
      {isCurrent && (
        <h2 className="text-lg font-semibold text-[#131842]">Current Ride</h2>
      )}
      <div className="text-sm text-gray-700 flex items-center gap-2">
        <FaMapMarkerAlt className="text-[#1DBF73]" />
        <span>Pickup: {ride.pickup}</span>
      </div>
      <div className="text-sm text-gray-700 flex items-center gap-2">
        <FaLocationArrow className="text-[#1DBF73]" />
        <span>Dropoff: {ride.dropoff}</span>
      </div>
      <div className="text-sm text-gray-700 flex items-center gap-2">
        {RideIcon(ride.rideType)}
        <span>Type: {ride.rideType}</span>
      </div>
      <div className="text-sm text-gray-700 flex items-center gap-2">
        <FaClock className="text-[#1DBF73]" />
        <span>Status: {ride.status}</span>
      </div>

      {/* Action Buttons */}
      {isCurrent && ride.status === "Accepted" && (
        <button
          onClick={() => handleStatusUpdate("In Progress")}
          className="w-full bg-[#1DBF73] text-white py-2 rounded-xl text-sm font-semibold hover:bg-[#18a55f]"
        >
          Start Ride
        </button>
      )}
      {isCurrent && ride.status === "In Progress" && (
        <button
          onClick={() => handleStatusUpdate("Completed")}
          className="w-full bg-[#131842] text-white py-2 rounded-xl text-sm font-semibold hover:bg-[#0f1438]"
        >
          Mark as Completed
        </button>
      )}
      {isCurrent && ride.status === "Completed" && (
        <div className="flex items-center text-[#1DBF73] text-sm mt-2">
          <FaCheckCircle className="mr-1" />
          Ride completed successfully!
        </div>
      )}

      {/* Pending ride buttons */}
      {!isCurrent && (
        <div className="flex justify-between gap-3 pt-3">
          <button
            onClick={() => handleResponse(ride.id, true)}
            className="flex-1 bg-[#131842] text-white py-2 rounded-xl text-sm font-semibold hover:bg-[#0f1438]"
          >
            Accept
          </button>
          <button
            onClick={() => handleResponse(ride.id, false)}
            className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-6 pt-10 pb-6 flex flex-col items-center">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-[#131842] text-center md:text-3xl">
            Driver Dashboard
          </h1>

          {!currentRide && rides.length === 0 && (
            <p className="text-center text-sm text-gray-500">
              You have no current ride. Waiting for new requests...
            </p>
          )}

          {currentRide && <RideCard ride={currentRide} isCurrent />}
          {!currentRide && rides.length > 0 && (
            <>
              <h2 className="text-lg font-medium text-gray-800 mt-2">
                Pending Rides
              </h2>
              {rides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </>
          )}
        </div>
      </div>

      <Navbar />
    </div>
  );
}
