import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    image: "https://cdn-icons-png.freepik.com/512/18/18148.png",
    role: "ADMIN",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const baseURL = "http://10.10.7.106:5000/api/v1";
  const imageBaseURL = "http://10.10.7.106:5000";
  const defaultImage = "https://cdn-icons-png.freepik.com/512/18/18148.png";

  const getTitle = (path) => {
    if (path.startsWith("/dashboard/user/")) {
      return "Admin Dashboard";
    }
    switch (path) {
      case "/dashboard":
        return "Overview";
      case "/dashboard/user":
        return "User";
      case "/dashboard/terms":
        return "Terms & Conditions";
      case "/dashboard/advertising":
        return "Advertising";
      case "/dashboard/subscription":
        return "Subscription";
      case "/dashboard/feedback":
        return "Feedback";
      default:
        return "";
    }
  };

  const title = getTitle(location.pathname);

  // Helper function to construct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath === "") {
      return defaultImage;
    }
    
    // Try different URL patterns
    const possibleUrls = [
      `${imageBaseURL}${imagePath}?t=${Date.now()}`,
      `${baseURL}${imagePath}?t=${Date.now()}`,
      `${imageBaseURL}/uploads${imagePath}?t=${Date.now()}`,
    ];
    
    console.log("Trying image URLs:", possibleUrls);
    return possibleUrls[0];
  };

  const fetchUserProfile = async (retryCount = 0) => {
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      let res;
      // Prioritize GET /user/profile
      res = await axios.get(`${baseURL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });

      console.log("User profile response:", JSON.stringify(res.data, null, 2));
      if (res.data.success && res.data.data) {
        const imageUrl = getImageUrl(res.data.data.image);
        console.log("Constructed image URL:", imageUrl);
        
        setUserProfile({
          name: res.data.data.name || "John Doe",
          image: imageUrl,
          role: res.data.data.role || "ADMIN",
        });
      } else if (userId && retryCount < 1) {
        // Fallback to GET /user/admin/user/:userId
        res = await axios.get(`${baseURL}/user/admin/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 15000,
        });
        console.log("Fallback user profile response:", JSON.stringify(res.data, null, 2));
        if (res.data.success && res.data.data) {
          const imageUrl = getImageUrl(res.data.data.image);
          console.log("Constructed fallback image URL:", imageUrl);
          
          setUserProfile({
            name: res.data.data.name || "John Doe",
            image: imageUrl,
            role: res.data.data.role || "ADMIN",
          });
        } else {
          throw new Error(res.data.message || "Failed to load user profile");
        }
      } else {
        throw new Error(res.data.message || "Failed to load user profile");
      }
    } catch (err) {
      console.error("Error fetching user profile:", err.response?.data || err);
      if (retryCount < 1 && err.response?.status !== 401 && err.response?.status !== 403) {
        // Retry once after a short delay
        setTimeout(() => fetchUserProfile(retryCount + 1), 1000);
        return;
      }
      const errorMessage =
        err.code === "ECONNABORTED"
          ? "Request timed out. Please check if the server is running at 10.10.7.106:5000."
          : err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")
          ? "Session expired. Please log in again."
          : err.response?.status === 403
          ? "Access denied: Admin or Super Admin privileges required. Try logging in with atiqurrahmanrifat799@gmail.com."
          : err.response?.status === 404 || err.response?.data?.message?.includes("Not found")
          ? "User profile not found."
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
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile on mount and route change
  useEffect(() => {
    console.log("Fetching profile due to route change:", location.pathname);
    fetchUserProfile();
  }, [token, userId, navigate, location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsDropdownOpen(false);
    navigate("/login", { replace: true });
  };

  // Enhanced image error handling with fallback URLs
  const handleImageError = (e, imagePath) => {
    console.log("Image load error for:", e.target.src);
    
    // Try alternative URL patterns
    const currentSrc = e.target.src;
    const possibleUrls = [
      `${imageBaseURL}${imagePath}?t=${Date.now()}`,
      `${baseURL}${imagePath}?t=${Date.now()}`,
      `${imageBaseURL}/uploads${imagePath}?t=${Date.now()}`,
      defaultImage
    ];
    
    const currentIndex = possibleUrls.findIndex(url => url.split('?')[0] === currentSrc.split('?')[0]);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < possibleUrls.length) {
      console.log("Trying next image URL:", possibleUrls[nextIndex]);
      e.target.src = possibleUrls[nextIndex];
    }
  };

  return (
    <header className="bg-[#FFFFFF] shadow flex items-center h-[98px] text-[#505050] w-full px-4">
      <div className="flex justify-between items-center w-full">
        {/* Dynamic page title */}
        <h1 className="text-2xl ms-2.5">{title}</h1>

        {/* Profile section */}
        <div className="flex items-center gap-[13px] me-[124px]">
          {loading ? (
            <span className="text-gray-600">Loading profile...</span>
          ) : error ? (
            <span className="text-red-600">{error}</span>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-[13px] cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={toggleDropdown}
              >
                <img
                  src={userProfile.image}
                  alt="Profile"
                  className="w-[58px] h-[58px] rounded-full object-cover border"
                  onError={(e) => handleImageError(e, userProfile.originalImagePath || "")}
                  onLoad={() => console.log("Image loaded successfully:", userProfile.image)}
                />
                <div className="leading-tight">
                  <p className="text-2xl font-medium text-[#000000]">{userProfile.name}</p>
                  <span className="text-sm font-medium text-[#000000]">{userProfile.role}</span>
                </div>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link to="/change-photo">
                    <button
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <img src="/public/camera.svg" alt="" />
                      Change Photo
                    </button>
                  </Link>
                  <Link to="/name-change">
                    <button
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <img src="/public/change-name.svg" alt="" />
                      Change Name
                    </button>
                  </Link>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                  >
                    <img src="/public/logout.svg" alt="" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;