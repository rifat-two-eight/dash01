import React, { useState } from 'react';

const NameChange = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = () => {
        // Handle name change logic here
        console.log('Name change submitted:', { firstName, lastName });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white w-[715px] p-8 rounded-lg shadow-lg">
                {/* Logo/Icon */}
                <div className="flex justify-center mb-8">
                    <div className="p-4 rounded-lg">
                        <img src="/rectangle.png" alt="Logo" />
                    </div>
                </div>

                <div className="space-y-6">
                    {/* First Name Field */}
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                        </label>
                        <input
                            id="first-name"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Last Name Field */}
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                        </label>
                        <input
                            id="last-name"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    {/* Change Name Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A90E2] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                    >
                        Change Name
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NameChange;