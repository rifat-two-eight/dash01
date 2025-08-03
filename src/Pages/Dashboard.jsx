import { FaChevronDown } from "react-icons/fa6";

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

            <select
              defaultValue="Monthly"
              className="bg-[#4a90e2] focus:border-amber-200 text-white text-sm p-2 rounded-md cursor-pointer outline-none focus:ring-0 focus:border-none"
            >
              <option className="bg-white text-black" value="Monthly">
                Monthly
              </option>
              <option className="bg-white text-black" value="Yearly">
                Yearly
              </option>
            </select>
            <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-white pointer-events-none text-xs" />
          </div>

          {/* Bottom: Number + Percentage */}
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-gray-900">24,582</p>
            <span className="text-[#00a62c] text-sm me-24">+12% this month</span>
          </div>
        </div>
      </div>
      Charts Row
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">User Activity</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-500">
              Chart placeholder - Use Recharts here
            </p>
          </div>
        </div>

        {/* User Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">User Distributions</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-500">Pie chart placeholder</p>
          </div>
        </div>
      </div>
      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Revenue</h3>
        <div className="h-80 bg-gray-50 rounded flex items-center justify-center">
          <p className="text-gray-500">Revenue chart placeholder</p>
        </div>
      </div>
      Add more content to test scrolling
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            Additional Content {i + 1}
          </h3>
          <p className="text-gray-600">
            This is additional content to test the independent scrolling
            functionality. The sidebar should scroll independently from this
            main content area.
          </p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
