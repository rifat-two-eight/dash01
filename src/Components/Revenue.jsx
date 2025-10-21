import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Revenue = ({ revenueData = [] }) => {
  // DEBUG: Log incoming data
  console.log("📥 Revenue Data RECEIVED:", revenueData);

  // ✅ FIXED: Handle CORRECT AdMob API response structure
  const chartData = (revenueData || []).map((item, index) => {
    // AdMob API returns: { dimensions: [{value: "2025-10-01"}], metricValues: [{value: "5.23"}] }
    const date = item.dimensions?.[0]?.value || `Day ${index + 1}`;
    const revenue = parseFloat(item.metricValues?.[0]?.value || item.revenue || 0);
    
    return {
      month: date.split('-')[2], // Extract day: "2025-10-01" → "01"
      subscription: 0,
      advertisement: revenue
    };
  });

  console.log("📈 Chart Data AFTER Transform:", chartData);

  // If no data, show loading
  if (chartData.length === 0 || chartData.every(item => item.advertisement === 0)) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm h-[500px] flex flex-col">
        <div className="flex justify-between items-center p-5 mb-4">
          <h2 className="text-lg ms-5 text-[#454b60] font-medium">Revenue</h2>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 bg-[#4A90E2]"></span>
              <span className="text-xs text-[#454b60]">Monthly Baseline</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 bg-[#00c471]"></span>
              <span className="text-xs text-[#454b60]">Subscription Revenue</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 bg-[#ffc107]"></span>
              <span className="text-xs text-[#454b60]">Advertisement Revenue</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-sm">Loading AdMob revenue data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-[500px] flex flex-col">
      <div className="flex justify-between items-center p-5 mb-4">
        <h2 className="text-lg ms-5 text-[#454b60] font-medium">Revenue</h2>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-[#4A90E2]"></span>
            <span className="text-xs text-[#454b60]">Monthly Baseline</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-[#00c471]"></span>
            <span className="text-xs text-[#454b60]">Subscription Revenue</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-[#ffc107]"></span>
            <span className="text-xs text-[#454b60]">Advertisement Revenue</span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: "#666" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: "#666" }}
            />
            <Tooltip
              cursor={{ stroke: "#ccc", strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #eee",
                borderRadius: "6px",
                fontSize: "14px",
              }}
              formatter={(value) => [`$${value.toFixed(2)}`, "Advertisement"]}
            />
            <Line
              type="linear"
              dataKey={() => 0}
              stroke="#4A90E2"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="subscription"
              stroke="#00c471"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="advertisement"
              stroke="#ffc107"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Revenue;