import React, { useState } from 'react';
import { FaUser, FaEllipsisV, FaChevronDown } from 'react-icons/fa';
import { FaRegEye } from "react-icons/fa";
import { Link } from 'react-router';


const User = () => {
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const userData = [
        { name: "John Doe", email: "john@example.com", accountType: "Pro", registrationDate: "2024-01-15", id: 1 },
        { name: "Jane Smith", email: "jane@example.com", accountType: "Free", registrationDate: "2024-01-20", id: 2 },
        { name: "Mike Johnson", email: "mike@example.com", accountType: "Pro", registrationDate: "2024-02-01", id: 3 },
        { name: "Sarah Wilson", email: "sarah@example.com", accountType: "Free", registrationDate: "2024-02-10", id: 4 },
        { name: "David Brown", email: "david@example.com", accountType: "Pro", registrationDate: "2024-02-15", id: 5 },
        { name: "John Doe", email: "john@example.com", accountType: "Pro", registrationDate: "2024-01-15", id: 6 },
        { name: "Jane Smith", email: "jane@example.com", accountType: "Free", registrationDate: "2024-01-20", id: 7 },
    ];

    const toggleDropdown = (id) => {
        setDropdownOpen(dropdownOpen === id ? null : id);
    };

    return (
        <div className='space-y-6 ms-16'>
            {/* 3 Stats Cards Grid */}
            <div className="grid grid-cols-10 gap-6">
                {/* 1st Card - Total Users (bigger) */}
                <div className="col-span-4 bg-white px-2 py-4 rounded-xl shadow-sm">
                    <div className="flex items-start justify-between">
                        {/* Left side - User icon with blue round bg */}
                        <div className="bg-[#4383CE] p-3 rounded-full">
                            <FaUser className="text-white text-xl" />
                        </div>
                        {/* Right side - Total Users text and number */}
                        <div className="text-right">
                            <p className="text-2xl">Total User</p>
                            <p className="text-2xl mt-3 font-medium text-gray-800">24,582</p>
                        </div>
                    </div>
                </div>

                {/* 2nd Card - Pro Users (same size as 3rd) */}
                <div className="col-span-3 bg-white px-2 py-4 rounded-xl shadow-sm">
                    <div className="flex items-start justify-between">
                        {/* Left side - User icon with blue round bg */}
                        <div className="bg-[#4383CE] p-3 rounded-full">
                            <FaUser className="text-white text-xl" />
                        </div>
                        {/* Right side - Total Users text and number */}
                        <div className="text-right">
                            <p className="text-2xl">Pro User</p>
                            <p className="text-2xl mt-3 font-medium text-gray-800">4,342</p>
                        </div>
                    </div>
                </div>

                {/* 3rd Card - Free Users (same size as 2nd) */}
                <div className="col-span-3 bg-white px-2 py-4 rounded-xl shadow-sm">
                    <div className="flex items-start justify-between">
                        {/* Left side - User icon with blue round bg */}
                        <div className="bg-[#4383CE] p-3 rounded-full">
                            <FaUser className="text-white text-xl" />
                        </div>
                        {/* Right side - Total Users text and number */}
                        <div className="text-right">
                            <p className="text-2xl">Free User</p>
                            <p className="text-2xl mt-3 font-medium text-gray-800">12,423</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* 3 Dropdowns above table */}
                <div className="flex gap-4 mb-6">
                    {/* Filter Dropdown */}
                    <div className="relative">
                        <select className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md appearance-none pr-8 cursor-pointer focus:outline-none focus:border-blue-500">
                            <option>Filter</option>
                            <option>Name A-Z</option>
                            <option>Name Z-A</option>
                            <option>Recent</option>
                            <option>Oldest</option>
                        </select>
                        <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none" />
                    </div>

                

                    {/* All Account Type Dropdown */}
                    <div className="relative">
                        <select className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md appearance-none pr-8 cursor-pointer focus:outline-none focus:border-blue-500">
                            <option>All Account Type</option>
                            <option>Pro</option>
                            <option>Free</option>
                        </select>
                        <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none" />
                    </div>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-sm">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Name</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Email</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Account Type</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Registration Date</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user) => (
                                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-4 px-4 text-gray-800">{user.name}</td>
                                    <td className="py-4 px-4 text-gray-600">{user.email}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            user.accountType === 'Pro' 
                                                ? 'bg-blue-100 text-[#4383CE]' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {user.accountType}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-gray-600">{user.registrationDate}</td>
                                    <td className="py-4 px-4">
                                        <div className="relative">
                                            <button 
                                                onClick={() => toggleDropdown(user.id)}
                                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                            >
                                                <FaEllipsisV className="text-gray-500" />
                                            </button>
                                            
                                            {/* Dropdown Menu */}
                                            {dropdownOpen === user.id && (
                                                <div className="absolute right-0 bottom-10 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                                                    <button 
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
                                                        
                                                    >
                                                       <Link to={`/user/id`}><div className='flex items-center gap-3'><FaRegEye></FaRegEye> View Profile</div></Link>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default User;