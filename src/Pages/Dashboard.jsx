import { FaChevronDown } from "react-icons/fa6";
import Histogram from "../Components/Histogram";
import Revenue from "../Components/Revenue";
import PieChart from "../Components/PieChart";

const Dashboard = () => {
  // Sample data for charts

  return (
    <div className="space-y-6  ms-16">
      {/* Stats Cards */}
      <div className="grid grid-cols-10 gap-[34px]">
        {/* Card 1 */}
        <div className="col-span-3 bg-white p-3 rounded-xl shadow h-[142px]">
          <h3 className="text-xl font-medium">Total Users</h3>
          <p className="text-3xl font-bold mt-3">24,582</p>
          <span className="text-[#00a62c] mt-5 flex justify-end text-sm">
            +12% this month
          </span>
        </div>

        {/* Card 2 */}
        <div className="col-span-3 bg-white p-3 rounded-xl shadow h-[142px]">
          <h3 className="text-xl font-medium">Pro Users</h3>
          <p className="text-3xl font-bold mt-3">24,582</p>
          <span className="text-[#00a62c] mt-5 flex justify-end text-sm">
            +12% this month
          </span>
        </div>

        {/* Card 3 */}
        <div className="col-span-4 bg-white px-3 py-7 rounded-xl shadow h-[142px] flex flex-col justify-between">
          {/* Top: Title + Select */}
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-medium">Monthly Revenue</h3>

            <div className="relative">
              <select
                defaultValue="Monthly"
                className="bg-[#4A90E2] text-white text-sm px-3 py-2 rounded-md appearance-none pr-6 cursor-pointer focus:outline-none"
              >
                <option className="bg-white text-black">Monthly</option>
                <option className="bg-white text-black">Yearly</option>
              </select>
              <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs pointer-events-none" />
            </div>
          </div>

          {/* Bottom: Number + Percentage */}
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-gray-900">24,582</p>
            <span className="text-[#00a62c] text-sm me-24">
              +12% this month
            </span>
          </div>
        </div>
      </div>

      {/* Histogram Chart */}
      <Histogram></Histogram>

      {/* Revenue + user */}
      <div className="grid grid-cols-8 gap-[20px]">
        <div className="col-span-5">
          <Revenue></Revenue>
        </div>
        <div className="col-span-3">
          <PieChart></PieChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
