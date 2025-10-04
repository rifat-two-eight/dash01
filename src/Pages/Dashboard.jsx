import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AlertCircle } from "lucide-react";
import Histogram from "../Components/Histogram";
import Revenue from "../Components/Revenue";
import PieChart from "../Components/PieChart";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    proUsers: 0,
    freeUsers: 0,
    monthlyPro: 0,
    monthlyFree: 0,
    yearlyPro: 0,
    yearlyFree: 0,
  });
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [revenuePeriod, setRevenuePeriod] = useState("Monthly");
  const [piePeriod, setPiePeriod] = useState("All"); // can be used programmatically

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const baseURL = "http://10.10.7.106:5000/api/v1";

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // Fetch user data and activity
  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const listRes = await axios.get(`${baseURL}/user/admin/user-list`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });

      if (!listRes.data.success) {
        throw new Error(listRes.data.message || "Failed to load users");
      }

      const users = listRes.data.data || [];

      const userDetails = await Promise.all(
        users.map((user) => {
          const userId = user._id || user.userId;
          if (!userId) {
            return {
              ...user,
              userId: "unknown",
              createdAt: null,
              name: user.name || "Unknown",
              email: user.email || "N/A",
              userType: user.userType || "free",
            };
          }
          return axios
            .get(`${baseURL}/user/admin/user/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
              timeout: 15000,
            })
            .then((res) => {
              return {
                ...user,
                userId,
                createdAt: res.data.success ? res.data.data.createdAt : null,
                name: res.data.success ? res.data.data.name : user.name || "Unknown",
                email: res.data.success ? res.data.data.email : user.email || "N/A",
                userType: res.data.success ? res.data.data.plan || user.userType : user.userType || "free",
              };
            })
            .catch(() => {
              return {
                ...user,
                userId,
                createdAt: null,
                name: user.name || "Unknown",
                email: user.email || "N/A",
                userType: user.userType || "free",
              };
            });
        })
      );

      // Lifetime metrics
      setMetrics((prev) => ({
        ...prev,
        totalUsers: userDetails.length,
        proUsers: userDetails.filter((u) => (u.userType || u.plan) === "pro").length,
        freeUsers: userDetails.filter((u) => (u.userType || u.plan) === "free").length,
      }));

      // Histogram Data → Always Jan–Dec current year
      const histogramByMonth = Array.from({ length: 12 }, (_, i) => {
        const monthUsers = userDetails.filter((u) => {
          if (!u.createdAt) return false;
          const d = new Date(u.createdAt);
          return d.getFullYear() === currentYear && d.getMonth() === i;
        });
        return {
          month: new Date(currentYear, i).toLocaleString("default", { month: "short" }),
          proUser: monthUsers.filter((u) => (u.userType || u.plan) === "pro").length,
          freeUser: monthUsers.filter((u) => (u.userType || u.plan) === "free").length,
        };
      });
      setActivityData(histogramByMonth);

      // PieChart metrics
      const monthlyUsers = userDetails.filter((u) => {
        if (!u.createdAt) return false;
        const d = new Date(u.createdAt);
        return d.getFullYear() === currentYear && d.getMonth() + 1 === currentMonth;
      });
      const yearlyUsers = userDetails.filter((u) => {
        if (!u.createdAt) return false;
        const d = new Date(u.createdAt);
        return d.getFullYear() === currentYear;
      });

      setMetrics((prev) => ({
        ...prev,
        monthlyPro: monthlyUsers.filter((u) => (u.userType || u.plan) === "pro").length,
        monthlyFree: monthlyUsers.filter((u) => (u.userType || u.plan) === "free").length,
        yearlyPro: yearlyUsers.filter((u) => (u.userType || u.plan) === "pro").length,
        yearlyFree: yearlyUsers.filter((u) => (u.userType || u.plan) === "free").length,
      }));
    } catch (err) {
      console.error("Error fetching user data:", err.response?.data || err);
      const errorMessage =
        err.code === "ECONNABORTED"
          ? "Request timed out. Please check the server."
          : err.response?.status === 401
          ? "Session expired. Please log in again."
          : err.response?.status === 403
          ? "Access denied: Admin privileges required."
          : err.response?.status === 404
          ? "No user data found."
          : err.response?.data?.message || "Failed to load user data.";
      setError(errorMessage);
      Swal.fire("Error!", errorMessage, "error");
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUserData();
    else {
      setError("No authentication token found. Please log in.");
      Swal.fire("Error!", "No authentication token found. Please log in.", "error");
      navigate("/login");
    }
  }, [token, navigate]);

  // PieChart filtered metrics
  let pieMetrics = { proUsers: 0, freeUsers: 0 };
  if (piePeriod === "All") {
    pieMetrics = { proUsers: metrics.proUsers, freeUsers: metrics.freeUsers };
  } else if (piePeriod === "Monthly") {
    pieMetrics = { proUsers: metrics.monthlyPro, freeUsers: metrics.monthlyFree };
  } else if (piePeriod === "Yearly") {
    pieMetrics = { proUsers: metrics.yearlyPro, freeUsers: metrics.yearlyFree };
  }

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

      {/* Stats Cards */}
      {loading ? (
        <div className="text-center py-10 text-gray-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-10 gap-[34px]">
          {/* Card 1: Total Users */}
          <div className="col-span-3 bg-white p-3 rounded-xl shadow h-[142px]">
            <h3 className="text-xl font-medium">Total Users</h3>
            <p className="text-3xl font-bold mt-3">{metrics.totalUsers}</p>
            <span className="text-[#00a62c] mt-5 flex justify-end text-sm">
              +12% this month
            </span>
          </div>

          {/* Card 2: Pro Users */}
          <div className="col-span-3 bg-white p-3 rounded-xl shadow h-[142px]">
            <h3 className="text-xl font-medium">Pro Users</h3>
            <p className="text-3xl font-bold mt-3">{metrics.proUsers}</p>
            <span className="text-[#00a62c] mt-5 flex justify-end text-sm">
              +12% this month
            </span>
          </div>

          {/* Card 3: Monthly Revenue */}
          <div className="col-span-4 bg-white px-3 py-7 rounded-xl shadow h-[142px] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-medium">{revenuePeriod} Revenue</h3>
              <div className="relative">
                <select
                  value={revenuePeriod}
                  onChange={(e) => setRevenuePeriod(e.target.value)}
                  className="bg-[#4A90E2] text-white text-sm px-3 py-2 rounded-md appearance-none pr-6 cursor-pointer focus:outline-none"
                >
                  <option className="bg-white text-black">Monthly</option>
                  <option className="bg-white text-black">Yearly</option>
                  <option className="bg-white text-black">All</option>
                </select>
                <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs pointer-events-none" />
              </div>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-3xl font-bold text-gray-900">24,582</p>
              <span className="text-[#00a62c] text-sm me-24">
                +12% this {revenuePeriod === "All" ? "period" : revenuePeriod.toLowerCase()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Histogram Chart */}
      <Histogram activityData={activityData} />

      {/* Revenue + PieChart (No extra dropdown) */}
      <div className="grid grid-cols-8 gap-[20px]">
        <div className="col-span-5">
          <Revenue />
        </div>
        <div className="col-span-3">
          <PieChart metrics={pieMetrics} timePeriod={piePeriod} setTimePeriod={setPiePeriod} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
