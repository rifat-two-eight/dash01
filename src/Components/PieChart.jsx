import React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaChevronDown } from "react-icons/fa";

const data = [
  { name: "Pro User", value: 6500 },
  { name: "Free User", value: 3500 },
];

const COLORS = ["#4A90E2", "#d3d3d3"]; // Blue for Pro, Gray for Free

const PieChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Header with dropdown */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm text-[#454b60] font-medium">User Distribution</h2>
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

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <RePieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #eee",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          />
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value) => (
              <span className="text-xs text-[#454b60]">{value}</span>
            )}
          />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
