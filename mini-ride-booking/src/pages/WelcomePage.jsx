import { useNavigate } from "react-router-dom";
import RideSVG from "../assets/welcome-car.svg";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-7 sm:px-8 md:px-12 lg:px-16 xl:px-32">
      <div className="w-full max-w-md text-center space-y-12">
        {/* Welcome Header */}
        <div>
          <h1 className="text-4xl font-extrabold text-[#131842]">Welcome Back!</h1>
          <p className="mt-2 text-gray-600 text-base sm:text-lg">
            Find the perfect ride for you
          </p>
        </div>

        {/* Illustration */}
        <img
          src={RideSVG}
          alt="Ride Illustration"
          className="mx-auto w-60 sm:w-72 md:w-80"
        />

        {/* Buttons */}
        <div className="space-y-4">
          {/* Login */}
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-[#131842] text-white py-3 rounded-xl shadow-md font-semibold hover:bg-[#0f1438] transition duration-200"
          >
            Login
          </button>

          {/* Signup styled as button */}
          <button
            onClick={() => navigate("/signup")}
            className="w-full border border-[#131842] bg-white text-[#131842] py-3 rounded-xl font-semibold hover:bg-gray-50 transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
