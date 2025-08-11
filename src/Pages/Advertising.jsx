import React, { useState } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Advertising = () => {

     const [activeTab, setActiveTab] = useState('Weekly');
     const [activeTable, setActiveTable] = useState('Weekly');

    const revenueData = [
        { name: 'Sat', value: 4900 },
        { name: 'Sun', value: 5500 },
        { name: 'Mon', value: 3000 },
        { name: 'Tue', value: 4500 },
        { name: 'Wed', value: 4000 },
        { name: 'Thu', value: 2000 },
        { name: 'Fri', value: 1500 }
    ];

  return (
    <div className="space-y-6 ms-16">
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-[#535353]">
              Total Ad Revenue(This Month)
            </h2>
          </div>
          <h2 className="text-3xl text-[#454B60] font-semibold">$24.582</h2>
          <h3 className="flex justify-self-end text-sm mt-2 text-[#20B146]">
            +12% this month
          </h3>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-[#535353]">
              Todays Revenue
            </h2>
          </div>
          <h2 className="text-3xl text-[#454B60] font-semibold">$832.13</h2>
          <h3 className="flex justify-self-end text-sm mt-2 text-[#20B146]">
            +12% this month
          </h3>
        </div>

         <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-[#535353]">
              Lifetime Revenue
            </h2>
          </div>
          <h2 className="text-3xl text-[#454B60] font-semibold">$12832.13</h2>
          <h3 className="flex justify-self-end text-sm mt-2 text-[#20B146]">
            +12% this month
          </h3>
        </div>
      </div>


      <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-[#535353] font-semibold">Revenue Trends</h2>
                <div className="flex space-x-2">
                    {['Weekly', 'Monthly'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                activeTab === tab
                                    ? 'bg-[#4A90E2] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                    <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                        domain={[0, 6000]}
                        ticks={[0, 1500, 3000, 4500, 6000]}
                    />
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value) => [`${value.toLocaleString()}`, 'Revenue']}
                        labelFormatter={(label) => `Day: ${label}`}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        fill="#F3FAFF"
                        fillOpacity={1}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>


        <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-[#535353] font-semibold">Revenue Breakdown</h2>
                <div className="flex space-x-2">
                    {['Weekly', 'Monthly'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTable(tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                activeTable === tab
                                    ? 'bg-[#4A90E2] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="overflow-x-auto border border-gray-200 rounded-sm">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Date</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Impressions</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Clicks</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-4 px-4 text-gray-800">07/07/2025</td>
                            <td className="py-4 px-4 text-gray-600">125,000</td>
                            <td className="py-4 px-4 text-gray-600">1,250</td>
                            <td className="py-4 px-4 text-gray-600">$1,250</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-4 px-4 text-gray-800">07/07/2025</td>
                            <td className="py-4 px-4 text-gray-600">118,000</td>
                            <td className="py-4 px-4 text-gray-600">1,180</td>
                            <td className="py-4 px-4 text-gray-600">$1,250</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-4 px-4 text-gray-800">07/07/2025</td>
                            <td className="py-4 px-4 text-gray-600">122,000</td>
                            <td className="py-4 px-4 text-gray-600">1,180</td>
                            <td className="py-4 px-4 text-gray-600">$1,250</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-4 px-4 text-gray-800">07/07/2025</td>
                            <td className="py-4 px-4 text-gray-600">115,000</td>
                            <td className="py-4 px-4 text-gray-600">1,180</td>
                            <td className="py-4 px-4 text-gray-600">$1,250</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default Advertising;