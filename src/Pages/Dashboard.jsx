
const Dashboard = () => {
  // Sample data for charts
  

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900">24,582</p>
          <span className="text-green-500 text-sm">+12% this month</span>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Pro Users</h3>
          <p className="text-3xl font-bold text-gray-900">24,582</p>
          <span className="text-green-500 text-sm">+12% this month</span>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">24,582</p>
          <span className="text-green-500 text-sm">+12% this month</span>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">User Activity</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Use Recharts here</p>
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

      {/* Add more content to test scrolling */}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Additional Content {i + 1}</h3>
          <p className="text-gray-600">
            This is additional content to test the independent scrolling functionality. 
            The sidebar should scroll independently from this main content area.
          </p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;