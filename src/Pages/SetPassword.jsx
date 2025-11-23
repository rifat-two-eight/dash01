import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const token = location.state?.token;
  const email = location.state?.email;

  // Validate token on component mount
  useEffect(() => {
    if (!token || !email) {
      setMessage("Missing reset token or email. Please start from Forgot Password page.");
      setError(true);
      setTimeout(() => navigate("/forgot-password"), 3000);
    }
  }, [token, email, navigate]);

  const handleSubmit = async () => {
    // Reset previous messages
    setMessage("");
    setError(false);

    // Validate inputs
    if (!newPassword || !confirmPassword) {
      setMessage("Please fill both password fields");
      setError(true);
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setError(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setError(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.yespend.com/api/v1/auth/reset-password",
        {
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: token, // Pass token as is, without "Bearer" prefix
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setMessage("Password reset successful! Redirecting to login...");
        setError(false);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(response.data.message || "Password reset failed");
        setError(true);
      }
    } catch (err) {
      console.error("Password reset error:", err.response?.data || err.message);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.errorMessages?.[0]?.message ||
        "Failed to reset password. Please try again.";
      setMessage(errorMsg);
      setError(true);

      // Handle token-related errors
      if (
        err.response?.status === 401 ||
        errorMsg.toLowerCase().includes("token")
      ) {
        setMessage("Invalid or expired token. Please start again.");
        setTimeout(() => navigate("/forgot-password"), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white w-[715px] p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-lg">
            <img src="/rectangle.png" alt="Logo" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                placeholder="Enter new password (min 6 characters)"
                disabled={loading || !token}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={loading || !token}
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5 text-gray-400" />
                ) : (
                  <AiOutlineEye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                placeholder="Confirm new password"
                disabled={loading || !token}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={loading || !token}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5 text-gray-400" />
                ) : (
                  <AiOutlineEye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {message && (
            <div
              className={`p-3 rounded-md ${
                error
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              {message}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !token}
            className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-[#4A90E2] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Set Password"}
          </button>

          {!token && (
            <button
              onClick={() => navigate("/forgot-password")}
              className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-[#4A90E2] border border-[#4A90E2] hover:bg-blue-50"
            >
              Go to Forgot Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetPassword;