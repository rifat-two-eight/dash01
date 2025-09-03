import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Send OTP to email
  const handleSendOtp = async () => {
    if (!email) {
      setMessage("Please enter your email");
      setError(true);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://10.10.7.106:5000/api/v1/auth/forget-password",
        { email }
      );

      if (res.data.success) {
        setShowOtpModal(true);
        setMessage("OTP sent to your email");
        setError(false);
        setOtp("");
        
        // Start 3-minute cooldown immediately after sending OTP
        setResendCooldown(180);
        const timer = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "User not found");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP - Uses the same API as Send OTP with 3-minute cooldown
  const handleResendOtp = async () => {
    // Prevent clicking if already in cooldown
    if (resendCooldown > 0) return;

    if (!email) {
      setMessage("Please enter your email");
      setError(true);
      return;
    }

    setLoading(true);
    try {
      // Use the same API endpoint as send OTP
      const res = await axios.post(
        "http://10.10.7.106:5000/api/v1/auth/forget-password",
        { email }
      );

      if (res.data.success) {
        setMessage("OTP resent successfully, please check your email");
        setError(false);
        
        // Start 3 minutes (180 seconds) cooldown for EVERY resend
        setResendCooldown(180);
        const timer = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "User not found");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP - Simple implementation
  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter the OTP");
      setError(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://10.10.7.106:5000/api/v1/auth/verify-email", {
        email: email,
        oneTimeCode: parseInt(otp)
      });

      if (response.data.success) {
        navigate("/set-password", {
          state: { email, token: response.data.data },
        });
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data?.errorMessages?.[0]?.message || "Invalid OTP");
      setError(true);
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

        {!showOtpModal ? (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter your email to reset password
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="example@gmail.com"
                disabled={loading}
              />
            </div>

            {message && (
              <p className={`text-sm ${error ? "text-red-500" : "text-green-500"}`}>
                {message}
              </p>
            )}

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A90E2] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-4">
                OTP sent to: <span className="font-medium text-gray-800">{email}</span>
              </p>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter OTP"
                disabled={loading}
              />
            </div>

            {message && (
              <p className={`text-sm ${error ? "text-red-500" : "text-green-500"}`}>
                {message}
              </p>
            )}

            <div className="flex justify-between items-center">
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="flex-1 mr-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A90E2] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                onClick={handleResendOtp}
                disabled={loading || resendCooldown > 0}
                className="flex-1 ml-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white cursor-pointer hover:bg-gray-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Resending..." : 
                 resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 
                 "Resend OTP"}
              </button>
            </div>

            {/* Back to email option */}
            <div className="text-center">
              <button
                onClick={() => {
                  setShowOtpModal(false);
                  setOtp("");
                  setMessage("");
                  setError(false);
                  setResendCooldown(0);
                }}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Change email address
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forgot;