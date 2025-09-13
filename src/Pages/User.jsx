import React, { useState, useEffect } from "react";
import { FaUser, FaEllipsisV, FaChevronDown, FaRegEye } from "react-icons/fa";
import { Link } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";

const User = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [users, setUsers] = useState([]);
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    proUsers: 0,
    freeUsers: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [accountType, setAccountType] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const baseURL = "http://10.10.7.106:5000/api/v1";

  // Fetch users and their details
  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch user list
      const listRes = await axios.get(`${baseURL}/user/admin/user-list`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });

      console.log("User list response:", listRes.data); // Debug log

      if (!listRes.data.success) {
        throw new Error(listRes.data.message || "Failed to load users");
      }

      const users = listRes.data.data || [];
      // Fetch details for each user
      const userDetails = await Promise.all(
        users.map((user) => {
          const userId = user._id || user.userId; // Handle _id or userId
          if (!userId) {
            console.warn("User missing ID:", user);
            return { ...user, userId: "unknown", createdAt: null, name: user.name || "Unknown", email: user.email || "N/A" };
          }
          return axios
            .get(`${baseURL}/user/admin/user/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
              timeout: 15000,
            })
            .then((res) => {
              console.log(`User ${userId} details response:`, res.data); // Debug log
              return {
                ...user,
                userId,
                createdAt: res.data.success ? res.data.data.createdAt : null,
                name: res.data.success ? res.data.data.name : user.name || "Unknown",
                email: res.data.success ? res.data.data.email : user.email || "N/A",
                userType: res.data.success ? res.data.data.plan || user.userType : user.userType || "free",
              };
            })
            .catch((err) => {
              console.error(`Error fetching details for user ${userId}:`, err.response?.data || err);
              return { ...user, userId, createdAt: null, name: user.name || "Unknown", email: user.email || "N/A" };
            });
        })
      );

      setUsers(userDetails);
      // Derive metrics
      setMetrics({
        totalUsers: userDetails.length,
        proUsers: userDetails.filter((u) => (u.userType || u.plan) === "pro").length,
        freeUsers: userDetails.filter((u) => (u.userType || u.plan) === "free").length,
      });
    } catch (err) {
      console.error("Error fetching user data:", err.response?.data || err);
      const errorMessage =
        err.code === "ECONNABORTED"
          ? "Request timed out. Please check if the server is running at 10.10.7.106:5000."
          : err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")
          ? "Session expired. Please log in again."
          : err.response?.status === 403
          ? "Access denied: Admin or Super Admin privileges required. Try logging in with shakayet.dev@gmail.com."
          : err.response?.status === 404 || err.response?.data?.message?.includes("Not found")
          ? "No user data found. Please check the backend API."
          : err.response?.data?.message || "Failed to load user data.";
      setError(errorMessage);
      Swal.fire("Error!", errorMessage, "error");
      if (err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")) {
        localStorage.removeItem("token");
        navigate("/login");
      } else if (err.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    if (token) fetchUserData();
    else {
      setError("No authentication token found. Please log in.");
      Swal.fire("Error!", "No authentication token found. Please log in.", "error");
      navigate("/login");
    }
  }, [token, navigate]);

  // Toggle dropdown
  const toggleDropdown = (id) => {
    if (!id || id === "unknown") {
      console.warn("Attempted to toggle dropdown with invalid userId");
      return;
    }
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Filter and sort users
  const filteredUsers = users
    .filter((user) => (accountType ? (user.userType || user.plan) === accountType : true))
    .sort((a, b) => {
      if (filter === "Name A-Z") return (a.name || "").localeCompare(b.name || "");
      if (filter === "Name Z-A") return (b.name || "").localeCompare(a.name || "");
      if (filter === "Recent") return new Date(b.createdAt || "2025-01-01") - new Date(a.createdAt || "2025-01-01");
      if (filter === "Oldest") return new Date(a.createdAt || "2025-01-01") - new Date(b.createdAt || "2025-01-01");
      return 0;
    });

  return (
    <div className="space-y-6 ms-16">
      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 text-sm">{error}</span>
          <button
            onClick={fetchUserData}
            className="ml-4 px-3 py-1 text-sm font-medium text-white bg-[#4383CE] rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-[#4383CE]"
            disabled={loading}
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats Cards Grid */}
      {loading ? (
        <div className="text-center py-10 text-gray-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-10 gap-6">
          <div className="col-span-4 bg-white px-2 py-4 rounded-xl shadow-sm">
            <div className="flex items-start justify-between">
              <div className="bg-[#4383CE] p-3 rounded-full">
                <FaUser className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-2xl">Total User</p>
                <p className="text-2xl mt-3 font-medium text-gray-800">{metrics.totalUsers}</p>
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-white px-2 py-4 rounded-xl shadow-sm">
            <div className="flex items-start justify-between">
              <div className="bg-[#4383CE] p-3 rounded-full">
                <FaUser className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-2xl">Pro User</p>
                <p className="text-2xl mt-3 font-medium text-gray-800">{metrics.proUsers}</p>
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-white px-2 py-4 rounded-xl shadow-sm">
            <div className="flex items-start justify-between">
              <div className="bg-[#4383CE] p-3 rounded-full">
                <FaUser className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-2xl">Free User</p>
                <p className="text-2xl mt-3 font-medium text-gray-800">{metrics.freeUsers}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md appearance-none pr-8 cursor-pointer focus:outline-none focus:border-blue-500"
              disabled={loading}
            >
              <option value="">Filter</option>
              <option value="Name A-Z">Name A-Z</option>
              <option value="Name Z-A">Name Z-A</option>
              <option value="Recent">Recent</option>
              <option value="Oldest">Oldest</option>
            </select>
            <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md appearance-none pr-8 cursor-pointer focus:outline-none focus:border-blue-500"
              disabled={loading}
            >
              <option value="">All Account Type</option>
              <option value="pro">Pro</option>
              <option value="free">Free</option>
            </select>
            <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none" />
          </div>
        </div>
        <div className="overflow-x-auto border border-gray-200 rounded-sm">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Account Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Registration Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.userId} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-800">{user.name || "Unknown"}</td>
                    <td className="py-4 px-4 text-gray-600">{user.email || "N/A"}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          (user.userType || user.plan) === "pro" ? "bg-blue-100 text-[#4383CE]" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {(user.userType || user.plan || "free").charAt(0).toUpperCase() + (user.userType || user.plan || "free").slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US") : "N/A"}
                    </td>
                    <td className="py-4 px-4">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(user.userId)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          disabled={loading || !user.userId || user.userId === "unknown"}
                        >
                          <FaEllipsisV className="text-gray-500" />
                        </button>
                        {dropdownOpen === user.userId && (
                          <div className="absolute right-0 bottom-10 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                            <Link to={`/dashboard/user/${user.userId}`}>
                              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">
                                <div className="flex items-center gap-3">
                                  <FaRegEye /> View Details
                                </div>
                              </button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 px-4 text-gray-600 text-center">
                    No users available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;