import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col md:justify-center md:items-center">

      {/* Mobile Header */}
      <div className="bg-[#E2825B] px-6 pt-40 pb-10 md:hidden">
        <h1 className="text-white text-3xl font-bold mb-1">Login</h1>
        <p className="text-white text-sm">Login in to continue</p>
      </div>

      {/* Mobile Form Card */}
      <div className="bg-white -mt-6 px-6 pt-8 pb-10 rounded-t-3xl space-y-6 md:hidden">
        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-gray-100 px-4 py-3 rounded-xl outline-none focus:ring-2 ring-[#E2825B] text-sm"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="bg-gray-100 px-4 py-3 rounded-xl w-full pr-10 outline-none focus:ring-2 ring-[#E2825B] text-sm"
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

        {/* Forgot Password */}
        <div className="text-right text-sm">
          <button className="text-gray-500 hover:underline">Forgot password?</button>
        </div>

        {/* Login Button */}
        <button
          onClick={() => navigate("/request-ride")}
          className="w-full bg-[#131842] text-white py-3 rounded-xl font-semibold hover:bg-[#0f1438] transition"
        >
          Login
        </button>

        {/* Sign Up Text */}
        <p className="text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#131842] font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:flex w-full max-w-md border rounded-3xl shadow-lg overflow-hidden">
        <div className="w-full bg-white px-10 py-12 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-[#E2825B] mb-1">Login</h1>
            <p className="text-sm text-gray-600">Login in to continue</p>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-100 px-4 py-3 rounded-xl outline-none focus:ring-2 ring-[#E2825B] text-sm"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="bg-gray-100 px-4 py-3 rounded-xl w-full pr-10 outline-none focus:ring-2 ring-[#E2825B] text-sm"
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

          <div className="text-right text-sm">
            <button className="text-gray-500 hover:underline">Forgot password?</button>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-[#131842] text-white py-3 rounded-xl font-semibold hover:bg-[#0f1438] transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#131842] font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
