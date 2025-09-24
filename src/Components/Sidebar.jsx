import { Link, useLocation } from "react-router";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "/square.svg" },
    { path: "/dashboard/user", label: "User", icon: "/user.svg" },
    { path: "/dashboard/subscription", label: "Subscription", icon: "/computer-dollar.svg" },
    { path: "/dashboard/advertising", label: "Advertising", icon: "/advertisiment.svg" },
    { path: "/dashboard/feedback", label: "Feedback", icon: "/Group 4.svg" },
    { path: "/dashboard/terms", label: "Terms & Conditions", icon: "/shield-01.svg" },
    { path: "/dashboard/api-key", label: "API Key", icon: "/api.svg" },
  ];

  return (
    <aside className="w-64 fixed bg-[#FFFFFF] shadow-lg text-[#505050] h-screen pt-[98px] px-5">
      <ul className="space-y-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center w-full h-[44px] rounded-[8px] px-3 ${
                isActive ? "bg-[#4A90E2] text-white" : "hover:bg-gray-100 text-[#505050]"
              }`}
            >
              <img
                src={item.icon}
                alt="icon"
                className={`mr-2 w-5 h-5 ${
                  isActive ? "filter invert brightness-0" : ""
                }`}
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
