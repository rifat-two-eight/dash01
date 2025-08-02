import { Outlet } from "react-router";
import Sidebar from "../Components/Slidebar";
import Header from "../Components/Header";

const Root = () => {
  return (
    <div className="flex overflow-hidden h-screen bg-[#edf1f4]">
      {/* Sidebar - Independent scroll */}
      <Sidebar />

      {/* Main content area: Header + Content */}
      <div className="flex-1 flex flex-col">
        {/* Header - Fixed at top */}
        <Header />

        {/* Main content - Independent scroll */}
        <main className="flex-1 bg-gray-100 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
