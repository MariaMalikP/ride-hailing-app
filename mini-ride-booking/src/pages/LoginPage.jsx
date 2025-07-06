import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "../api/axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/login", { email, password });

      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));

      // Role-based redirect
      if (user.role === "driver") {
        navigate("/driver-dashboard");
      } else {
        navigate("/request-ride");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:justify-center md:items-center">
      {/* Mobile Header */}
      <div className="bg-[#1DBF73] px-6 pt-40 pb-10 md:hidden">
        <h1 className="text-white text-3xl font-bold mb-1">Login</h1>
        <p className="text-white text-sm">Log in to continue</p>
      </div>

      {/* Mobile Form */}
      <div className="bg-white -mt-6 px-6 pt-8 pb-10 rounded-t-3xl space-y-6 md:hidden">
        <InputField label="Email" type="email" value={email} setValue={setEmail} />
        <PasswordField
          label="Password"
          value={password}
          setValue={setPassword}
          show={showPassword}
          toggleShow={() => setShowPassword(!showPassword)}
        />

        <div className="text-right text-sm">
          <button className="text-gray-500 hover:underline">Forgot password?</button>
        </div>

        <SubmitButton loading={loading} onClick={handleLogin} />

        <RedirectToSignup navigate={navigate} />
      </div>

      {/* Desktop Version */}
      <div className="hidden md:flex w-full max-w-md border rounded-3xl shadow-lg overflow-hidden">
        <div className="w-full bg-white px-10 py-12 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-[#1DBF73] mb-1">Login</h1>
            <p className="text-sm text-gray-600">Log in to continue</p>
          </div>

          <InputField label="Email" type="email" value={email} setValue={setEmail} />
          <PasswordField
            label="Password"
            value={password}
            setValue={setPassword}
            show={showPassword}
            toggleShow={() => setShowPassword(!showPassword)}
          />

          <div className="text-right text-sm">
            <button className="text-gray-500 hover:underline">Forgot password?</button>
          </div>

          <SubmitButton loading={loading} onClick={handleLogin} />
          <RedirectToSignup navigate={navigate} />
        </div>
      </div>
    </div>
  );
}

// Components
function InputField({ label, type, value, setValue }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="bg-gray-100 px-4 py-3 rounded-xl outline-none focus:ring-2 ring-[#1DBF73] text-sm"
      />
    </div>
  );
}

function PasswordField({ label, value, setValue, show, toggleShow }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={`Enter your ${label.toLowerCase()}`}
          className="bg-gray-100 px-4 py-3 rounded-xl w-full pr-10 outline-none focus:ring-2 ring-[#1DBF73] text-sm"
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500"
        >
          {show ? <HiEyeOff size={20} /> : <HiEye size={20} />}
        </button>
      </div>
    </div>
  );
}

function SubmitButton({ loading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full bg-[#131842] text-white py-3 rounded-xl font-semibold transition ${
        loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#0f1438]"
      }`}
    >
      {loading ? "Logging in..." : "Login"}
    </button>
  );
}

function RedirectToSignup({ navigate }) {
  return (
    <p className="text-center text-sm text-gray-700">
      Don’t have an account?{" "}
      <span
        onClick={() => navigate("/signup")}
        className="text-[#131842] font-semibold cursor-pointer hover:underline"
      >
        Sign up
      </span>
    </p>
  );
}
