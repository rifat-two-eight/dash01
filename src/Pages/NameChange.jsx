import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const NameChange = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const baseURL = "http://10.10.7.106:5000/api/v1";

  // Fetch current user data on mount
  useEffect(() => {
    if (!token) {
      Swal.fire("Error!", "Not found. Please log in.", "error");
      navigate("/login");
      return;
    }

    fetchCurrentUser();
  }, [token, navigate]);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${baseURL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });

      if (res.data.success) {
        const userData = res.data.data;
        setFirstName(userData.name ? userData.name.split(' ')[0] || '' : '');
        setLastName(userData.name ? userData.name.split(' ').slice(1).join(' ') || '' : '');
      }
    } catch (err) {
      console.error("Error fetching user profile:", err.response?.data || err);
      const errorMessage =
        err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")
          ? "Session expired. Please log in again."
          : err.response?.status === 403
          ? "Access denied. Please log in with admin credentials."
          : err.response?.data?.message || "Failed to load user profile.";
      setError(errorMessage);
      Swal.fire("Error!", errorMessage, "error");
      if (err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
      } else if (err.response?.status === 403) {
        navigate("/login");
      }
    }
  };

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      Swal.fire("Error!", "First name and last name are required.", "error");
      return;
    }

    if (!token) {
      setError("No authentication token found. Please log in.");
      Swal.fire("Error!", "No authentication token found. Please log in.", "error");
      navigate("/login");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      const res = await axios.patch(
        `${baseURL}/user/profile`,
        { name: fullName },
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 15000,
        }
      );

      console.log("Name change response:", res.data); // Debug log
      if (res.data.success) {
        // Refetch the updated user profile to ensure the new name is loaded
        await fetchCurrentUser();
        Swal.fire("Success!", "Name updated successfully.", "success");
        setSuccess(true);
        // Optionally redirect or refresh profile
        navigate("/dashboard");
      } else {
        throw new Error(res.data.message || "Failed to update name");
      }
    } catch (err) {
      console.error("Error updating name:", err.response?.data || err);
      const errorMessage =
        err.code === "ECONNABORTED"
          ? "Request timed out. Please check if the server is running at 10.10.7.106:5000."
          : err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")
          ? "Session expired. Please log in again."
          : err.response?.status === 403
          ? "Access denied. Please log in with admin credentials."
          : err.response?.status === 404 || err.response?.data?.message?.includes("Not found")
          ? "User not found."
          : err.response?.data?.message || "Failed to update name.";
      setError(errorMessage);
      Swal.fire("Error!", errorMessage, "error");
      if (err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
      } else if (err.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
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

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* First Name Field */}
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              disabled={loading}
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              disabled={loading}
            />
          </div>
          
          {/* Change Name Button */}
          <button
            onClick={handleSubmit}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#4A90E2] hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Name"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameChange;