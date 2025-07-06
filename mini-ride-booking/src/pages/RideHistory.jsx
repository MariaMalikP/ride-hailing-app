import { useEffect, useState } from "react";
import {
  FaCarSide,
  FaMapMarkerAlt,
  FaLocationArrow,
} from "react-icons/fa";
import NavBar from "../components/navbar";
import axios from "../api/axios";

export default function RideHistoryPage() {
  const [rideHistory, setRideHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        const res = await axios.get(`/ride-history/${user.id}`);
        setRideHistory(res.data.history);
      } catch (err) {
        console.error("Failed to load ride history", err);
      }
    };

    fetchRideHistory();
  }, [user.id]);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col pb-20">
      <div className="px-6 py-8 flex-1 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-[#131842] mb-6">
          Your Ride History
        </h1>

        <div className="w-full max-w-md space-y-5">
          {rideHistory.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">No completed rides yet.</p>
          ) : (
            rideHistory.map((ride) => (
              <div
                key={ride.id}
                className="bg-white rounded-2xl shadow-sm px-5 py-4 space-y-3 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaCarSide className="text-[#E2825B]" />
                    <p className="font-semibold text-sm text-[#131842]">{ride.rideType}</p>
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      ride.status === "Completed"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {ride.status}
                  </span>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#E2825B]" />
                    <span>{ride.pickup}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaLocationArrow className="text-[#E2825B]" />
                    <span>{ride.dropoff}</span>
                  </div>
                </div>

                {/* Optional date display if you store it */}
                {/* <p className="text-xs text-gray-500">{ride.date} • {ride.time}</p> */}
              </div>
            ))
          )}
        </div>
      </div>

      <NavBar />
    </div>
  );
}
