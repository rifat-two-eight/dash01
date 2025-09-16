import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";

const UserDetails = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image: null,
    createdAt: "",
    plan: "free",
    status: "active",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const baseURL = "http://10.10.7.106:5000/api/v1";
  const defaultImage = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";

  // Demo payment history data
  const paymentHistory = [
    {
      transactionId: "#TXN-12345",
      planTitle: "Pro Plan",
      email: "john.doe@example.com",
      amount: "$29.99",
      joinDate: "January 15, 2024",
      endDate: "January 15, 2025"
    },
    {
      transactionId: "#TXN-12344",
      planTitle: "Basic Plan",
      email: "john.doe@example.com",
      amount: "$9.99",
      joinDate: "December 10, 2023",
      endDate: "January 10, 2024"
    },
    {
      transactionId: "#TXN-12343",
      planTitle: "Pro Plan",
      email: "john.doe@example.com",
      amount: "$29.99",
      joinDate: "November 12, 2023",
      endDate: "December 12, 2023"
    },
    {
      transactionId: "#TXN-12342",
      planTitle: "Premium Plan",
      email: "john.doe@example.com",
      amount: "$49.99",
      joinDate: "October 05, 2023",
      endDate: "November 05, 2023"
    },
    {
      transactionId: "#TXN-12341",
      planTitle: "Basic Plan",
      email: "john.doe@example.com",
      amount: "$9.99",
      joinDate: "September 01, 2023",
      endDate: "October 01, 2023"
    }
  ];

  // Fetch user data
  useEffect(() => {
    if (!token) {
      Swal.fire("Error!", "No authentication token found. Please log in.", "error");
      navigate("/login");
      return;
    }

    if (!id) {
      setError("User ID not provided in URL.");
      setLoading(false);
      Swal.fire("Error!", "User ID not provided in URL.", "error");
      navigate("/dashboard/users");
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${baseURL}/user/admin/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 15000,
        });

        console.log("User details response:", res.data); // Debug log

        if (res.data.success) {
          const data = res.data.data;
          setUserData({
            name: data.name || "Unknown User",
            email: data.email || "N/A",
            image: data.image ? `http://10.10.7.106:5000${data.image}` : null,
            createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A",
            plan: data.userType || data.plan || "free",
            status: data.accountStatus || data.status || "active",
          });
        } else {
          throw new Error(res.data.message || "Failed to load user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err.response?.data || err);
        const errorMessage =
          err.code === "ECONNABORTED"
            ? "Request timed out. Please check if the server is running at 10.10.7.106:5000."
            : err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")
            ? "Session expired. Please log in again."
            : err.response?.status === 403
            ? "Access denied: Admin or Super Admin privileges required."
            : err.response?.status === 404
            ? "User not found."
            : err.response?.data?.message || "Failed to load user data.";
        setError(errorMessage);
        Swal.fire("Error!", errorMessage, "error");
        if (err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")) {
          localStorage.removeItem("token");
          navigate("/login");
        } else if (err.response?.status === 403 || err.response?.status === 404) {
          navigate("/dashboard/users");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, token, navigate]);

  // Update user status or plan
  const updateUser = async (updateData) => {
    setActionLoading(true);
    try {
      const res = await axios.patch(`${baseURL}/user/admin/user/${id}`, updateData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000,
      });

      if (res.data.success) {
        // Update local state with correct field mapping
        const mappedData = {};
        if (updateData.accountStatus) {
          mappedData.status = updateData.accountStatus;
        }
        if (updateData.userType) {
          mappedData.plan = updateData.userType;
        }
        
        setUserData(prevState => ({
          ...prevState,
          ...mappedData
        }));
        
        // Notify other components that user data has been updated
        window.dispatchEvent(new CustomEvent('userDataUpdated', { 
          detail: { userId: id, updateData } 
        }));
        
        // Store flags in localStorage to trigger refresh
        localStorage.setItem('userListNeedsRefresh', 'true');
        localStorage.setItem('lastUserUpdate', Date.now().toString());
        
        Swal.fire("Success!", "User updated successfully!", "success");
      } else {
        throw new Error(res.data.message || "Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err.response?.data || err);
      const errorMessage =
        err.code === "ECONNABORTED"
          ? "Request timed out. Please try again."
          : err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")
          ? "Session expired. Please log in again."
          : err.response?.status === 403
          ? "Access denied: Admin or Super Admin privileges required."
          : err.response?.status === 404
          ? "User not found."
          : err.response?.data?.message || "Failed to update user.";
      
      Swal.fire("Error!", errorMessage, "error");
      
      if (err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setActionLoading(false);
    }
  };

  // Admin action handlers
  const handleUnblockUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will set the user status to active.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00A62C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, unblock user!"
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser({ accountStatus: "active" });
      }
    });
  };

  const handleAssignAsPro = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will upgrade the user to Pro plan.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4A90E2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, assign as Pro!"
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser({ userType: "pro" });
      }
    });
  };

  const handleBlockUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will block the user account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D00000",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, block user!"
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser({ accountStatus: "blocked" });
      }
    });
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return { text: "Active", className: "text-[#167730] bg-[#A0D4AD]" };
      case "blocked":
        return { text: "Blocked", className: "text-red-600 bg-red-100" };
      case "pending":
        return { text: "Pending", className: "text-yellow-600 bg-yellow-100" };
      default:
        return { text: status || "Unknown", className: "text-gray-600 bg-gray-100" };
    }
  };

  // Plan badge styling
  const getPlanBadge = (plan) => {
    switch (plan.toLowerCase()) {
      case "pro":
        return { text: "Pro", className: "text-[#C0AA00] bg-[#FFF39A]" };
      case "premium":
        return { text: "Premium", className: "text-purple-600 bg-purple-100" };
      case "free":
      default:
        return { text: "Free", className: "text-blue-600 bg-blue-100" };
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 ms-16">
        <div className="bg-white rounded-lg shadow-md px-6 py-4">
          <div className="text-center py-10 text-gray-600">Loading user details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 ms-16">
        <div className="bg-white rounded-lg shadow-md px-6 py-4">
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-red-800 text-sm">{error}</span>
          </div>
          <button
            onClick={() => navigate("/dashboard/users")}
            className="px-4 py-2 text-sm font-medium text-white bg-[#4383CE] rounded-md hover:bg-blue-600"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 ms-16">
      {/* User Information Section */}
      <div className="bg-white rounded-lg shadow-md px-6 py-4">
        <h2 className="text-xl font-semibold mb-6">User Information</h2>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Left Side - Profile Picture and Basic Info */}
          <div className="flex items-start gap-4 py-4">
            <img
              src={userData.image || defaultImage}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-2 border-gray-200"
              onError={(e) => (e.target.src = defaultImage)}
            />
            <div className="space-y-4">
              <div>
                <label className="text-lg font-medium">User Name</label>
                <p className="text-lg font-semibold">{userData.name}</p>
              </div>
              <div>
                <label className="text-lg font-medium">User ID</label>
                <p className="text-sm font-semibold">#{id.toUpperCase()}</p>
              </div>
              <div>
                <label className="text-lg font-medium text-gray-600">Account Status</label> 
                <br />
                <span className={`inline-block px-3 py-1 text-sm font-medium ${getStatusBadge(userData.status).className} rounded-full`}>
                  {getStatusBadge(userData.status).text}
                </span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Additional Info */}
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-gray-800">{userData.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Joining Date</label>
              <p className="text-gray-800">{userData.createdAt}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Account Type</label> <br />
              <span className={`inline-block px-3 py-1 text-sm font-medium ${getPlanBadge(userData.plan).className} rounded-full`}>
                {getPlanBadge(userData.plan).text}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History Section */}
      <div className="bg-white rounded-lg shadow-md px-6 py-4">
        <h2 className="text-xl font-semibold mb-6">Payment History</h2>
        
        <div className="overflow-x-auto border border-gray-200 rounded-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Transaction ID</th>
                <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Plan Title</th>
                <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Email</th>
                <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Amount</th>
                <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Join Date</th>
                <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">End Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {payment.transactionId}
                  </td>
                  <td className="px-4 py-4">{payment.planTitle}</td>
                  <td className="px-4 py-4">{payment.email}</td>
                  <td className="px-4 py-4 font-semibold text-gray-600">
                    {payment.amount}
                  </td>
                  <td className="px-4 py-4">{payment.joinDate}</td>
                  <td className="px-4 py-4">{payment.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Actions Section */}
      <div className="bg-white rounded-lg shadow-md px-6 py-4">
        <h2 className="text-xl font-semibold mb-6">Admin Actions</h2>
        
        <div className="flex gap-4">
          <button 
            onClick={handleUnblockUser}
            disabled={actionLoading || userData.status === "active"}
            className={`px-6 py-3 w-full text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
              actionLoading || userData.status === "active"
                ? "bg-gray-400 opacity-50 cursor-not-allowed"
                : "bg-[#00A62C] hover:bg-green-700"
            }`}
          >
            <img src="/shield-admin.svg" alt="Shield" className="w-5 h-5" />
            {actionLoading ? "Processing..." : userData.status === "active" ? "User Already Active" : "Unblock User"}
          </button>
          <button 
            onClick={handleAssignAsPro}
            disabled={actionLoading || userData.plan === "pro"}
            className={`px-6 py-3 w-full text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
              actionLoading || userData.plan === "pro"
                ? "bg-gray-400 opacity-50 cursor-not-allowed"
                : "bg-[#4A90E2] hover:bg-blue-600"
            }`}
          >
            <img src="/verify.svg" alt="New Release" className="w-5 h-5" />
            {actionLoading ? "Processing..." : userData.plan === "pro" ? "User Already Pro" : "Assign as Pro"}
          </button>
          <button 
            onClick={handleBlockUser}
            disabled={actionLoading || userData.status === "blocked"}
            className={`px-6 py-3 w-full text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
              actionLoading || userData.status === "blocked"
                ? "bg-gray-400 opacity-50 cursor-not-allowed"
                : "bg-[#D00000] hover:bg-red-600"
            }`}
          >
            <img src="/cancel-01.svg" alt="Cancel" className="w-5 h-5" />
            {actionLoading ? "Processing..." : userData.status === "blocked" ? "User Already Blocked" : "Block User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;