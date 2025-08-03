import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Revenue = () => {
  const revenueData = [
    { month: "Jan", subscription: 3200, advertisement: 2200 },
    { month: "Feb", subscription: 4000, advertisement: 2400 },
    { month: "Mar", subscription: 4600, advertisement: 2800 },
    { month: "Apr", subscription: 3500, advertisement: 2000 },
    { month: "May", subscription: 4800, advertisement: 2700 },
    { month: "Jun", subscription: 5000, advertisement: 3100 },
    { month: "Jul", subscription: 5300, advertisement: 3000 },
    { month: "Aug", subscription: 4700, advertisement: 2800 },
    { month: "Sep", subscription: 5100, advertisement: 3200 },
    { month: "Oct", subscription: 5500, advertisement: 3300 },
    { month: "Nov", subscription: 5000, advertisement: 2900 },
    { month: "Dec", subscription: 5200, advertisement: 3100 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Legend */}
      <div className="flex justify-between items-center mb-4 p-5">
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

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={revenueData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {/* Grid lines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          {/* Axes */}
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
          {/* Tooltip on hover */}
          <Tooltip
            cursor={{ stroke: "#ccc", strokeWidth: 1 }}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #eee",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          />

          {/* Monthly baseline (one line across all months) */}
          <Line
            type="linear"
            dataKey={() => 0} // placeholder to use static line
            stroke="#4A90E2"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            activeDot={false}
          />

          {/* Subscription Revenue */}
          <Line
            type="monotone"
            dataKey="subscription"
            stroke="#00c471"
            strokeWidth={2}
            dot={{ r: 4 }}
          />

          {/* Advertisement Revenue */}
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
  );
};

export default Revenue;
