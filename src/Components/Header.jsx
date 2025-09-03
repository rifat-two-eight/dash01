import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Map route paths to titles
  const getTitle = (path) => {
    // Handle dynamic user/:id route
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
      case "/dashboard/notification":
        return "Notifications";
      default:
        return "";
    }
  };

  const title = getTitle(location.pathname);

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
    // Clear token and other stored data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("rememberEmail");
    localStorage.removeItem("rememberPassword");
    localStorage.removeItem("rememberMe");
    
    // Close dropdown and redirect to login
    setIsDropdownOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-[#FFFFFF] shadow flex items-center h-[98px] text-[#505050] w-full px-4">
      <div className="flex justify-between items-center w-full">
        {/* Dynamic page title */}
        <h1 className="text-2xl ms-2.5">{title}</h1>

        {/* Profile section */}
        <div className="flex items-center gap-[13px] me-[124px]">
          <Link to="/dashboard/notification">
            <img className="me-4" src="/notification-01.svg" alt="Notification" />
          </Link>

          {/* Profile dropdown container */}
          <div className="relative" ref={dropdownRef}>
            {/* Clickable profile section */}
            <div
              className="flex items-center gap-[13px] cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              onClick={toggleDropdown}
            >
              <img
                src="https://i.postimg.cc/3xBtfyJ5/Ellipse-1.png"
                alt="Profile"
                className="w-[58px] h-[58px] rounded-full object-cover border"
              />

              <div className="leading-tight">
                <p className="text-2xl font-medium text-[#000000]">John Doe</p>
                <span className="text-sm font-medium text-[#000000]">
                  Admin
                </span>
              </div>
            </div>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* Change Photo */}
                <Link to="/change-photo">
                  <button
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  >
                    <img src="/public/camera.svg" alt="" />
                    Change Photo
                  </button>
                </Link>

                {/* Change Name */}
                <Link to="/name-change">
                  <button
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  >
                    <img src="/public/change-name.svg" alt="" />
                    Change Name
                  </button>
                </Link>

                {/* Divider */}
                <hr className="my-2 border-gray-200" />

                {/* Logout */}
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
        </div>
      </div>
    </header>
  );
};

export default Header;