import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = () => {
        // Handle set password logic here
        console.log('Set password submitted:', { newPassword, confirmPassword });
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
                    {/* New Password Field */}
                    <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                id="new-password"
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                                placeholder="********"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                            >
                                {showNewPassword ? (
                                    <AiOutlineEyeInvisible className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <AiOutlineEye className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password Field */}
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                                placeholder="********"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                            >
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <AiOutlineEye className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                    
                    {/* Set Password Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A90E2] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetPassword;