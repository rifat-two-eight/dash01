const UserDetails = () => {
    return (
        <div className="space-y-6 ms-16">
            
            {/* User Information Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">User Information</h2>
                
                <div className="grid grid-cols-2 gap-8">
                    {/* Left Side - Profile Picture and Basic Info */}
                    <div className="flex items-start gap-4">
                        <img
                            src="https://i.postimg.cc/3xBtfyJ5/Ellipse-1.png"
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="space-y-2">
                            <div>
                                <label className="text-sm font-medium text-gray-600">User Name</label>
                                <p className="text-lg font-semibold text-gray-800">John Doe</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">User ID</label>
                                <p className="text-gray-800">#USR-12345</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Status</label>
                                <span className="inline-block px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Side - Additional Info */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            <p className="text-gray-800">john.doe@example.com</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Joining Date</label>
                            <p className="text-gray-800">January 15, 2024</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Account Type</label>
                            <p className="text-gray-800">Premium Member</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;