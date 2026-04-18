import React, { useState, useContext, useEffect } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { userDataContext } from "../Context/userDataContext";
import axios from "axios";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { serverURL, setUserData } = useContext(userDataContext);

  const [mode, setMode] = useState("login");
  const [showpassword, setshowpassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setloading] = useState(false);
  const [err, seterr] = useState("");

  // 🔥 Sync mode with URL
  useEffect(() => {
    setMode(location.pathname === "/signup" ? "signup" : "login");
  }, [location.pathname]);

  // 🔐 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    seterr("");
    setloading(true);

    try {
      const url =
        mode === "login"
          ? `${serverURL}/api/auth/login`
          : `${serverURL}/api/auth/signup`;

      const payload =
        mode === "login"
          ? { email, password }
          : { name, email, password };

      const res = await axios.post(url, payload, {
        withCredentials: true,
      });

      if (mode === "login") {
        setUserData(res.data);
        toast.success("Login successful 🎉");
        navigate("/dashboard");
      } else {
        toast.success("Signup successful! Please login");
        navigate("/login");
      }
    } catch (error) {
      setUserData(null);
      seterr(error.response?.data?.message || "Something went wrong");
      toast.error("Authentication failed");
    } finally {
      setloading(false);
    }
  };

  // 🔵 Google login handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${serverURL}/api/auth/google`,
        { token: credentialResponse.credential },
        { withCredentials: true }
      );

      setUserData(res.data);
      toast.success("Google login successful 🚀");
      navigate("/dashboard");
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100">

      <div className="w-[90%] max-w-[420px] backdrop-blur-lg bg-white/70 border border-white/40 shadow-xl rounded-2xl p-6">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center mb-4">
          {mode === "login" ? "Welcome Back 👋" : "Create Account 🚀"}
        </h1>

        {/* GOOGLE LOGIN */}
        <div className="mb-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google login failed")}
          />
        </div>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* NAME */}
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showpassword ? "text" : "password"}
              placeholder="Password"
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showpassword ? (
              <IoEyeOff
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setshowpassword(false)}
              />
            ) : (
              <IoEye
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setshowpassword(true)}
              />
            )}
          </div>

          {/* ERROR */}
          {err && <p className="text-red-500 text-sm">{err}</p>}

          {/* BUTTON */}
          <button
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        {/* SWITCH */}
        <p
          className="text-sm text-center mt-4 cursor-pointer text-gray-600"
          onClick={() =>
            navigate(mode === "login" ? "/signup" : "/login")
          }
        >
          {mode === "login"
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
