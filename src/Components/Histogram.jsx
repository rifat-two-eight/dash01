import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Histogram = () => {
  const userChartData = [
    { month: "Jan", proUser: 4200, freeUser: 3000 },
    { month: "Feb", proUser: 4800, freeUser: 2900 },
    { month: "Mar", proUser: 5200, freeUser: 3100 },
    { month: "Apr", proUser: 3900, freeUser: 2800 },
    { month: "May", proUser: 5500, freeUser: 3300 },
    { month: "Jun", proUser: 5100, freeUser: 3400 },
    { month: "Jul", proUser: 5800, freeUser: 3600 },
    { month: "Aug", proUser: 4900, freeUser: 3200 },
    { month: "Sep", proUser: 5300, freeUser: 3100 },
    { month: "Oct", proUser: 5600, freeUser: 2900 },
    { month: "Nov", proUser: 4800, freeUser: 3000 },
    { month: "Dec", proUser: 5000, freeUser: 3100 },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      {/* Title and Legend */}
      <div className="flex justify-between items-center p-5 mb-4">
        <h2 className="text-lg ms-5 text-[#454b60] font-medium">User Activity</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-[#86b5ec]"></span>
            <span className="text-xs text-[#454b60]">Pro User</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-[#afdbbb]"></span>
            <span className="text-xs me-2 text-[#454b60]">Free User</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={userChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barCategoryGap="30%"
          barGap={0}
        >
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
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #eee",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          />
          <Bar
            dataKey="proUser"
            fill="#86b5ec"
            radius={[5, 5, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="freeUser"
            fill="#afdbbb"
            radius={[5, 5, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Histogram;
