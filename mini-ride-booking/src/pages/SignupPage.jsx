import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaUser, FaCarSide } from "react-icons/fa";

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("passenger");

  return (
    <div className="min-h-screen bg-white flex flex-col md:justify-center md:items-center">

      {/* Mobile Header */}
      <div className="bg-[#E2825B] px-6 pt-30 pb-10 md:hidden rounded-b-[50px]">
        <h1 className="text-white text-3xl font-bold mb-1">Sign Up</h1>
        <p className="text-white text-sm">Create your account to continue</p>
      </div>

      {/* Shared Form Wrapper (Mobile & Desktop) */}
      <div className="bg-white mt-10 px-6 pt-6 pb-10 rounded-t-3xl space-y-5 md:mt-0 md:rounded-3xl md:border md:shadow-lg md:max-w-md md:w-full md:px-10 md:py-12">

        {/* Desktop Title (Only for md and up) */}
        <div className="hidden md:block mb-4">
          <h1 className="text-4xl font-bold text-[#E2825B] mb-1">Sign Up</h1>
          <p className="text-sm text-gray-600">Create your account to continue</p>
        </div>

        {/* Full Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 ring-[#E2825B]"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 ring-[#E2825B]"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="bg-gray-100 px-4 py-3 pr-10 w-full rounded-xl text-sm outline-none focus:ring-2 ring-[#E2825B]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              className="bg-gray-100 px-4 py-3 pr-10 w-full rounded-xl text-sm outline-none focus:ring-2 ring-[#E2825B]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showConfirmPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>
        </div>

        {/* Role Selection */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Select Role</label>
          <div className="flex gap-3">
            <div
              className={`flex-1 flex items-center justify-center gap-2 px-2 py-3 rounded-xl border cursor-pointer transition text-sm ${
                role === "passenger"
                  ? "bg-[#FEEFE9] border-[#E2825B]"
                  : "bg-gray-100 border-gray-300"
              }`}
              onClick={() => setRole("passenger")}
            >
              <FaUser className="text-[#E2825B]" />
              Passenger
            </div>
            <div
              className={`flex-1 flex items-center justify-center gap-2 px-2 py-3 rounded-xl border cursor-pointer transition text-sm ${
                role === "driver"
                  ? "bg-[#FEEFE9] border-[#E2825B]"
                  : "bg-gray-100 border-gray-300"
              }`}
              onClick={() => setRole("driver")}
            >
              <FaCarSide className="text-[#E2825B]" />
              Driver
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-[#131842] text-white py-3 rounded-xl font-semibold hover:bg-[#0f1438] transition"
          >
            Sign Up
          </button>
        </div>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-700">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#131842] font-semibold cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
