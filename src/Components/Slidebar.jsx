const Sidebar = () => {
  return (
    <aside className="w-64 mt-[98px] bg-[#FFFFFF] shadow-md text-[#505050] h-[1024px] px-5">
      <ul className="space-y-2">
        <div className="flex items-center w-[216px] h-[44px] bg-[#4A90E2] rounded-[8px]">
            <img src="/public/square.png" alt="" />
            <li className="font-medium p-2 rounded text-[#FFFFFF]">Dashboard</li>
        </div>
        <li className="font-medium p-2 rounded">Profile</li>
        <li className="font-medium p-2 rounded">Settings</li>
        <li className="font-medium p-2 rounded">Logout</li>
      </ul>
    </aside>
  );
};

export default Sidebar;