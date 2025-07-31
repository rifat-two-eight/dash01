const Sidebar = () => {
  return (
    <aside className="w-64 sticky top-[98px] mt-[98px] bg-[#FFFFFF] shadow-lg text-[#505050] h-[1024px] px-5">
      <ul className="space-y-2">
        {/* Dashboard (Active) */}
        <div className="flex items-center w-[216px] h-[44px] bg-[#4A90E2] rounded-[8px]">
          <img className="px-3" src="/public/square.svg" alt="icon" />
          <li className="font-medium text-[#FFFFFF]">Dashboard</li>
        </div>

        {/* User */}
        <div className="flex items-center w-[216px] h-[44px] rounded-[8px]">
          <img className="px-3" src="/public/user.svg" alt="icon" />
          <li className="font-medium ">User</li>
        </div>

        {/* Subscription */}
        <div className="flex items-center w-[216px] h-[44px]  rounded-[8px]">
          <img className="px-3" src="/public/computer-dollar.svg" alt="icon" />
          <li className="font-medium ">Subscription</li>
        </div>

        {/* Advertising */}
        <div className="flex items-center w-[216px] h-[44px]  rounded-[8px]">
          <img className="px-3" src="/public/advertisiment.svg" alt="icon" />
          <li className="font-medium ">Advertising</li>
        </div>

        {/* Feedback */}
        <div className="flex items-center w-[216px] h-[44px]  rounded-[8px]">
          <img className="px-3" src="/public/Group 4.svg" alt="icon" />
          <li className="font-medium ">Feedback</li>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center w-[216px] h-[44px]  rounded-[8px]">
          <img className="px-3" src="/public/shield-01.svg" alt="icon" />
          <li className="font-medium ">Terms & Conditions</li>
        </div>
      </ul>
    </aside>
  );
};

export default Sidebar;
