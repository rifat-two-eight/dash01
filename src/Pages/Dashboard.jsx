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
    // NEW: Real AdMob Revenue Data
    monthlyRevenue: 0,
    yearlyRevenue: 0,
    revenueData: [],
    // ONLY ADDED FOR DYNAMIC %
    revenuePercentage: 0,
    revenueChangeColor: "#00a62c",
    revenueChangeSign: "+"
  });
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [revenuePeriod, setRevenuePeriod] = useState("Monthly");
  const [piePeriod, setPiePeriod] = useState("All");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const baseURL = "https://api.yespend.com/api/v1";

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // 1. FETCH ADMOB DATA FOR REVENUE WITH DYNAMIC %
  const fetchAdMobRevenue = async () => {
    const accessToken = localStorage.getItem("admob_token");
    const publisherId = "pub-7017672768951042";
    if (!accessToken) return; // Skip if no token

    try {
      // Get CURRENT MONTH data
      const monthlyResponse = await axios.post(
        `https://admob.googleapis.com/v1/accounts/${publisherId}/networkReport:generate`,
        {
          reportSpec: {
            dateRange: {
              startDate: { year: currentYear, month: currentMonth, day: 1 },
              endDate: { year: currentYear, month: currentMonth, day: currentDate.getDate() }
            },
            dimensions: ["DATE"],
            metrics: ["ESTIMATED_EARNINGS"],
            sortConditions: [{ dimension: "DATE", order: "ASCENDING" }]
          }
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          timeout: 10000
        }
      );

      // Get PREVIOUS MONTH data (ONLY FOR %)
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const prevMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
      const prevMonthResponse = await axios.post(
        `https://admob.googleapis.com/v1/accounts/${publisherId}/networkReport:generate`,
        {
          reportSpec: {
            dateRange: {
              startDate: { year: prevMonthYear, month: prevMonth, day: 1 },
              endDate: { 
                year: prevMonthYear, 
                month: prevMonth, 
                day: new Date(prevMonthYear, prevMonth, 0).getDate()
              }
            },
            dimensions: ["DATE"],
            metrics: ["ESTIMATED_EARNINGS"],
            sortConditions: [{ dimension: "DATE", order: "ASCENDING" }]
          }
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          timeout: 10000
        }
      );

      // Get YEARLY data
      const yearlyResponse = await axios.post(
        `https://admob.googleapis.com/v1/accounts/${publisherId}/networkReport:generate`,
        {
          reportSpec: {
            dateRange: {
              startDate: { year: currentYear, month: 1, day: 1 },
              endDate: { year: currentYear, month: currentMonth, day: currentDate.getDate() }
            },
            dimensions: ["DATE"],
            metrics: ["ESTIMATED_EARNINGS"],
            sortConditions: [{ dimension: "DATE", order: "ASCENDING" }]
          }
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          timeout: 10000
        }
      );

      // Calculate totals
      const monthlyEarnings = monthlyResponse.data.reduce((sum, row) => {
        return sum + parseFloat(row.metricValues?.[0]?.value || 0);
      }, 0);

      const yearlyEarnings = yearlyResponse.data.reduce((sum, row) => {
        return sum + parseFloat(row.metricValues?.[0]?.value || 0);
      }, 0);

      // DYNAMIC % CALCULATION
      const prevMonthEarnings = prevMonthResponse.data.reduce((sum, row) => {
        return sum + parseFloat(row.metricValues?.[0]?.value || 0);
      }, 0);
      
      const percentageChange = prevMonthEarnings > 0 
        ? ((monthlyEarnings - prevMonthEarnings) / prevMonthEarnings * 100).toFixed(1)
        : monthlyEarnings > 0 ? 100 : 0;

      const changeColor = parseFloat(percentageChange) >= 0 ? "#00a62c" : "#ff4444";
      const changeSign = parseFloat(percentageChange) >= 0 ? "+" : "";

      // Format for Revenue Chart (daily data for current month)
      const revenueChartData = monthlyResponse.data.map(row => ({
        date: row.dimensions?.[0]?.value || '',
        revenue: parseFloat(row.metricValues?.[0]?.value || 0)
      }));

      setMetrics(prev => ({
        ...prev,
        monthlyRevenue: monthlyEarnings.toFixed(2),
        yearlyRevenue: yearlyEarnings.toFixed(2),
        revenueData: revenueChartData,
        // DYNAMIC % VALUES
        revenuePercentage: percentageChange,
        revenueChangeColor: changeColor,
        revenueChangeSign: changeSign
      }));

    } catch (err) {
      console.error("AdMob Revenue Error:", err);
      // Don't show error - just use fallback values
      setMetrics(prev => ({
        ...prev,
        monthlyRevenue: "0.00",
        yearlyRevenue: "0.00",
        revenueData: [],
        revenuePercentage: 0,
        revenueChangeColor: "#00a62c",
        revenueChangeSign: "+"
      }));
    }
  };

  // Fetch user data (UNCHANGED)
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

      // User metrics (UNCHANGED)
      setMetrics((prev) => ({
        ...prev,
        totalUsers: userDetails.length,
        proUsers: userDetails.filter((u) => (u.userType || u.plan) === "pro").length,
        freeUsers: userDetails.filter((u) => (u.userType || u.plan) === "free").length,
      }));

      // Histogram Data (UNCHANGED)
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

      // PieChart metrics (UNCHANGED)
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
    if (token) {
      fetchUserData();
      fetchAdMobRevenue(); // Fetch AdMob revenue
    } else {
      setError("No authentication token found. Please log in.");
      Swal.fire("Error!", "No authentication token found. Please log in.", "error");
      navigate("/login");
    }
  }, [token, navigate]);

  // PieChart metrics (UNCHANGED)
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
      {/* Error Message - UNCHANGED */}
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

      {/* Stats Cards - ONLY REVENUE % CHANGED */}
      {loading ? (
        <div className="text-center py-10 text-gray-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-10 gap-[34px]">
          {/* Card 1: Total Users - UNCHANGED */}
          <div className="col-span-3 bg-white p-3 rounded-xl shadow h-[142px]">
            <h3 className="text-xl font-medium">Total Users</h3>
            <p className="text-3xl font-bold mt-3">{metrics.totalUsers}</p>
          </div>

          {/* Card 2: Pro Users - UNCHANGED */}
          <div className="col-span-3 bg-white p-3 rounded-xl shadow h-[142px]">
            <h3 className="text-xl font-medium">Pro Users</h3>
            <p className="text-3xl font-bold mt-3">{metrics.proUsers}</p>
          </div>

          {/* Card 3: REAL ADMOB REVENUE - ONLY % DYNAMIC */}
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
              <p className="text-3xl font-bold text-gray-900">
                ${revenuePeriod === "Monthly" ? metrics.monthlyRevenue : metrics.yearlyRevenue}
              </p>
              {/* ONLY THIS LINE CHANGED - DYNAMIC % */}
              <span 
                className="text-sm me-24"
                style={{ color: metrics.revenueChangeColor }}
              >
                {metrics.revenueChangeSign}{metrics.revenuePercentage}% this {revenuePeriod === "All" ? "period" : revenuePeriod.toLowerCase()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Histogram Chart - UNCHANGED */}
      <Histogram activityData={activityData} />

      {/* Revenue + PieChart - PASS REAL DATA TO REVENUE */}
      <div className="grid grid-cols-8 gap-[20px]">
        <div className="col-span-5">
          <Revenue revenueData={metrics.revenueData} />
        </div>
        <div className="col-span-3">
          <PieChart metrics={pieMetrics} timePeriod={piePeriod} setTimePeriod={setPiePeriod} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;