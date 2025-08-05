import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

const Root = () => {
  return (
    <div className="grid h-screen" style={{ gridTemplateColumns: '256px 1fr' }}>
      {/* Fixed Sidebar - 256px width */}
      <div className="h-full">
        <Sidebar />
      </div>

      {/* Main content area with header */}
      <div className="grid grid-rows-[98px_1fr]">
        {/* Header - fixed height */}
        <Header />
        
        {/* Content area - takes remaining space */}
        <div className="px-4 py-6 bg-[#EDF1F4] overflow-y-auto" style={{ minHeight: 'calc(100vh - 50px)' }}>
          <div className="rounded-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Root;