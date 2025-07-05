import {
  FaCarSide,
  FaMapMarkerAlt,
  FaLocationArrow,
  FaHome,
  FaHistory,
  FaUser,
} from "react-icons/fa";
import NavBar from "../components/navbar";

const rideHistory = [
  {
    id: 1,
    pickup: "Mall Road",
    dropoff: "Airport",
    rideType: "Car",
    status: "Completed",
    date: "Jul 3, 2025",
    time: "4:30 PM",
  },
  {
    id: 2,
    pickup: "Gulberg",
    dropoff: "Model Town",
    rideType: "Rickshaw",
    status: "Cancelled",
    date: "Jul 1, 2025",
    time: "2:00 PM",
  },
  {
    id: 3,
    pickup: "DHA",
    dropoff: "Liberty Market",
    rideType: "Bike",
    status: "Completed",
    date: "Jun 28, 2025",
    time: "11:15 AM",
  },
];

export default function RideHistoryPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col pb-20">
      {/* Main Content */}
      <div className="px-6 py-8 flex-1 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-[#131842] mb-6">Your Ride History</h1>

        <div className="w-full max-w-md space-y-5">
          {rideHistory.map((ride) => (
            <div
              key={ride.id}
              className="bg-white rounded-2xl shadow-sm px-5 py-4 space-y-3 border border-gray-100"
            >
              {/* Ride Type and Status */}
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

              {/* Pickup & Dropoff */}
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

              {/* Date & Time */}
              <p className="text-xs text-gray-500">
                {ride.date} • {ride.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Nav */}
     <NavBar></NavBar>
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
