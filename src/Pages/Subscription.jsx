import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const Subscription = () => {
  const [revenueTab, setRevenueTab] = useState('Weekly');
  const [subscriptionTab, setSubscriptionTab] = useState('Weekly');

  const chartData = [
    { month: 'Jan', value: 450000 },
    { month: 'Feb', value: 300000 },
    { month: 'Mar', value: 280000 },
    { month: 'Apr', value: 320000 },
    { month: 'May', value: 350000 },
    { month: 'Jun', value: 380000 },
    { month: 'Jul', value: 340000 },
    { month: 'Aug', value: 320000 },
    { month: 'Sep', value: 330000 },
    { month: 'Oct', value: 360000 },
    { month: 'Nov', value: 340000 },
    { month: 'Dec', value: 350000 }
  ];

  const subscriptions = [
    {
      user: 'John Doe',
      plan: 'rahim@email.com',
      date: '07/07/2025',
      reason: '07/07/2025',
      admin: 'Admin User'
    },
    {
      user: 'John Doe',
      plan: 'rahim@email.com',
      date: '07/07/2025',
      reason: '07/07/2025',
      admin: 'Admin User'
    },
    {
      user: 'John Doe',
      plan: 'rahim@email.com',
      date: '07/07/2025',
      reason: '07/07/2025',
      admin: 'Admin User'
    }
  ];

  return (
    <div className="space-y-6 ms-16">
      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <img
              className="bg-gray-200 rounded-full p-2"
              src="/tick.svg"
              alt="tick"
            />
            <span className="text-sm text-gray-500">12%</span>
          </div>
          <h2 className="text-3xl text-[#454B60] font-semibold">182</h2>
          <h3 className="text-sm mt-2 text-gray-600">Active Users</h3>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <img
              className="bg-gray-200 rounded-full p-2"
              src="/calendar.svg"
              alt="calendar"
            />
            <span className="text-sm text-gray-500">12%</span>
          </div>
          <h2 className="text-3xl text-[#454B60] font-semibold">164</h2>
          <h3 className="text-sm mt-2 text-gray-600">Expiring in 30 days</h3>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <img
              className="bg-gray-200 rounded-full p-2"
              src="/user.svg"
              alt="user"
            />
            <span className="text-sm text-gray-500">12%</span>
          </div>
          <h2 className="text-3xl text-[#454B60] font-semibold">89</h2>
          <h3 className="text-sm mt-2 text-gray-600">This Month</h3>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <img
              className="bg-gray-200 rounded-full p-2"
              src="/tick.svg"
              alt="tick"
            />
            <span className="text-sm text-gray-500">12%</span>
          </div>
          <h2 className="text-3xl text-[#454B60] font-semibold">24.8%</h2>
          <h3 className="text-sm mt-2 text-gray-600">Free to Pro</h3>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-4 gap-4">
        {/* Chart Section - Takes 2 columns (half width like top 2 cards) */}
        <div className="col-span-2 bg-white rounded-lg p-6 h-80">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#454B60]">Revenue Overview</h2>
            <div className="flex space-x-1 rounded-lg">
              {['Weekly', 'Monthly', 'Lifetime'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setRevenueTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    revenueTab === tab
                      ? 'bg-[#4A90E2] text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                  tickFormatter={(value) => `${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value) => [`$${(value/1000).toFixed(0)}k`, 'Revenue']}
                  labelStyle={{ color: '#374151', fontWeight: '600' }}
                />
                <Bar dataKey="value" fill="#86B5EC" radius={[5, 5, 5, 5]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Cards Section - Flex column container */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-lg p-4 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <img
                className="bg-gray-200 rounded-full p-2"
                src="/user.svg"
                alt="user"
              />
              <span className="text-sm text-gray-500">12%</span>
            </div>
            <h3 className="text-2xl font-semibold text-[#454B60]">$47,892</h3>
            <p className="text-sm text-gray-600">Monthly Revenue</p>
          </div>

          <div className="bg-white rounded-lg p-4 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <img
                className="bg-gray-200 rounded-full p-2"
                src="/tick.svg"
                alt="tick"
              />
              <span className="text-sm text-gray-500">12%</span>
            </div>
            <h3 className="text-2xl font-semibold text-[#454B60]">$47,892</h3>
            <p className="text-sm text-gray-600">Annual Revenue</p>
          </div>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#454B60]">Subscriptions List</h2>
          <div className="flex space-x-1 rounded-lg">
            {['Weekly', 'Monthly', 'Lifetime'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSubscriptionTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  subscriptionTab === tab
                    ? 'bg-[#4A90E2] text-white'
                    : 'text-gray-600 hover:text-gray-800'
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
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Plan</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Reason</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Admin</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4 text-[#454B60]">{subscription.user}</td>
                  <td className="py-4 px-4 text-gray-600">{subscription.plan}</td>
                  <td className="py-4 px-4 text-gray-600">{subscription.date}</td>
                  <td className="py-4 px-4 text-gray-600">{subscription.reason}</td>
                  <td className="py-4 px-4 text-gray-600">{subscription.admin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subscription;