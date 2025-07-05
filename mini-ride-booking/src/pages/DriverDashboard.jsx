import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaLocationArrow,
  FaClock,
  FaHistory,
  FaToggleOn,
  FaToggleOff,
  FaUser,
  FaClipboardList,
} from "react-icons/fa";

export default function DriverDashboard() {
  const [rides, setRides] = useState([
    {
      id: 1,
      passenger: "Ali Khan",
      pickup: "Mall Road",
      drop: "Airport",
      time: "Now",
      status: "requested",
    },
    {
      id: 2,
      passenger: "Sara Ahmed",
      pickup: "Gulberg",
      drop: "Model Town",
      time: "In 10 mins",
      status: "requested",
    },
  ]);

  const [available, setAvailable] = useState(true);

  const handleAccept = (id) => {
    setRides((prev) =>
      prev.map((ride) =>
        ride.id === id ? { ...ride, status: "accepted" } : ride
      )
    );
  };

  const handleReject = (id) => {
    setRides((prev) => prev.filter((ride) => ride.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#fafafa] pb-20">
      {/* Header */}
      <div className="w-full max-w-md px-6 py-6 flex justify-between items-center border-b bg-white shadow-sm">
        <h1 className="text-lg font-bold text-[#131842]">Driver Dashboard</h1>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setAvailable(!available)}
        >
          {available ? (
            <FaToggleOn size={22} className="text-green-600" />
          ) : (
            <FaToggleOff size={22} className="text-gray-400" />
          )}
          <span className="text-sm text-gray-600">
            {available ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {/* Ride Content */}
      <div className="w-full max-w-md px-6 py-6 space-y-5">
        {rides.length === 0 ? (
          <p className="text-gray-500 text-sm">No ride requests right now.</p>
        ) : (
          rides.map((ride) => (
            <div
              key={ride.id}
              className="bg-white p-4 rounded-xl shadow-sm space-y-2 border border-gray-100"
            >
              <div className="text-[#131842] font-semibold text-base">
                Ride Request
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaUser className="text-[#E2825B]" />
                <span>{ride.passenger}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaMapMarkerAlt className="text-[#E2825B]" />
                <span>From: {ride.pickup}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaLocationArrow className="text-[#E2825B]" />
                <span>To: {ride.drop}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaClock className="text-[#E2825B]" />
                <span>{ride.time}</span>
              </div>

              {ride.status === "requested" ? (
                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => handleAccept(ride.id)}
                    className="flex-1 bg-[#131842] text-white py-2 rounded-xl text-sm font-medium"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(ride.id)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl text-sm font-medium"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <div className="text-green-600 text-sm font-medium pt-2">
                  Accepted
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Bottom Navbar (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm flex justify-around py-3 z-10">
        <DriverNavItem icon={<FaClipboardList />} label="Dashboard" active />
        <DriverNavItem icon={<FaHistory />} label="History" />
        <DriverNavItem icon={<FaUser />} label="Profile" />
      </div>
    </div>
  );
}

function DriverNavItem({ icon, label, active }) {
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
