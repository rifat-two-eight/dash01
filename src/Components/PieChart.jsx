import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaChevronDown } from "react-icons/fa";

const COLORS = ["#4A90E2", "#d3d3d3"];

const PieChart = ({ metrics, timePeriod, setTimePeriod }) => {
  const data = [
    { name: "Pro User", value: metrics.proUsers || 0 },
    { name: "Free User", value: metrics.freeUsers || 0 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-[500px] flex flex-col">
      {/* Header with dropdown */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-[#454b60] font-medium">
          User Distributions
        </h2>
        <div className="relative">
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="bg-[#4A90E2] text-white text-sm px-3 py-2 rounded-md appearance-none pr-6 cursor-pointer focus:outline-none"
          >
            <option className="bg-white text-black" value="All">All</option>
            <option className="bg-white text-black" value="Monthly">Monthly</option>
            <option className="bg-white text-black" value="Yearly">Yearly</option>
          </select>
          <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs pointer-events-none" />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="flex-1 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={140}
              dataKey="value"
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
          </RePieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-between items-center px-4">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div className="w-4 h-4" style={{ backgroundColor: COLORS[index] }}></div>
            <span className="text-lg text-[#454b60]">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
