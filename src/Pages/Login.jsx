import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://10.10.7.106:5000/api/v1/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        // Save token to localStorage
        localStorage.setItem("token", res.data.data);

        // Optionally store rememberMe
        if (rememberMe) {
          localStorage.setItem("rememberEmail", email);
        } else {
          localStorage.removeItem("rememberEmail");
        }

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white w-[715px] p-8 rounded-lg shadow-lg">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-lg">
            <img src="/rectangle.png" alt="Logo" />
          </div>
        </div>

        <div className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="example@gmail.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5 text-gray-400" />
                ) : (
                  <AiOutlineEye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-400 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-400"
              >
                Remember Password
              </label>
            </div>
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A90E2] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
