const UserDetails = () => {
    const paymentHistory = [
        {
            transactionId: "#TXN-12345",
            planTitle: "Pro Plan",
            email: "john.doe@example.com",
            amount: "$29.99",
            joinDate: "January 15, 2024",
            endDate: "January 15, 2025"
        },
        {
            transactionId: "#TXN-12344",
            planTitle: "Basic Plan",
            email: "john.doe@example.com",
            amount: "$9.99",
            joinDate: "December 10, 2023",
            endDate: "January 10, 2024"
        },
        {
            transactionId: "#TXN-12343",
            planTitle: "Pro Plan",
            email: "john.doe@example.com",
            amount: "$29.99",
            joinDate: "November 12, 2023",
            endDate: "December 12, 2023"
        },
        {
            transactionId: "#TXN-12342",
            planTitle: "Premium Plan",
            email: "john.doe@example.com",
            amount: "$49.99",
            joinDate: "October 05, 2023",
            endDate: "November 05, 2023"
        },
        {
            transactionId: "#TXN-12341",
            planTitle: "Basic Plan",
            email: "john.doe@example.com",
            amount: "$9.99",
            joinDate: "September 01, 2023",
            endDate: "October 01, 2023"
        }
    ];

    return (
        <div className="space-y-6 ms-16">
            
            {/* User Information Section */}
            <div className="bg-white rounded-lg shadow-md px-6 py-4">
                <h2 className="text-xl font-semibold mb-6">User Information</h2>
                
                <div className="grid grid-cols-2 gap-8">
                    {/* Left Side - Profile Picture and Basic Info */}
                    <div className="flex items-start gap-4 py-4">
                        <img
                            src="https://i.postimg.cc/3xBtfyJ5/Ellipse-1.png"
                            alt="Profile"
                            className="w-40 h-40 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="space-y-4">
                            <div>
                                <label className="text-lg font-medium">User Name</label>
                                <p className="text-sm font-semibold">John Doe</p>
                            </div>
                            <div>
                                <label className="text-lg font-medium">User ID</label>
                                <p className="text-sm font-semibold">#USR-12345</p>
                            </div>
                            <div>
                                <label className="text-lg font-medium text-gray-600">Account Status</label> 
                                <br />
                                <span className="inline-block px-3 py-1 text-sm font-medium text-[#167730] bg-[#A0D4AD] rounded-full">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Side - Additional Info */}
                    <div className="space-y-4 py-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            <p className="text-gray-800">john.doe@example.com</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Joining Date</label>
                            <p className="text-gray-800">January 15, 2024</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Account Type</label> <br />
                            <span className="inline-block px-3 py-1 text-sm font-medium text-[#C0AA00] bg-[#FFF39A] rounded-full">
                                    Pro
                                </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment History Section */}
            <div className="bg-white rounded-lg shadow-md px-6 py-4">
                <h2 className="text-xl font-semibold mb-6">Payment History</h2>
                
                <div className="overflow-x-auto border border-gray-200 rounded-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Transaction ID</th>
                                <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Plan Title</th>
                                <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Email</th>
                                <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Amount</th>
                                <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">Join Date</th>
                                <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600 border-b border-gray-200">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.map((payment, index) => (
                                <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {payment.transactionId}
                                    </td>
                                    <td className="px-4 py-4">{payment.planTitle}</td>
                                    <td className="px-4 py-4">{payment.email}</td>
                                    <td className="px-4 py-4 font-semibold text-gray-600">
                                        {payment.amount}
                                    </td>
                                    <td className="px-4 py-4">{payment.joinDate}</td>
                                    <td className="px-4 py-4">{payment.endDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Admin Actions Section */}
             <div className="bg-white rounded-lg shadow-md px-6 py-4">
                <h2 className="text-xl font-semibold mb-6">Admin Actions</h2>
                
                <div className="flex gap-4">
                    <button className="px-6 py-3 w-full text-white font-medium rounded-lg bg-[#00A62C] transition-colors flex items-center justify-center gap-2">
                        <img src="/shield-admin.svg" alt="Shield" className="w-5 h-5" />
                        Unblock User
                    </button>
                    <button className="px-6 py-3 w-full text-white font-medium rounded-lg bg-[#4A90E2] transition-colors flex items-center justify-center gap-2">
                        <img src="/verify.svg" alt="New Release" className="w-5 h-5" />
                        Assign as Pro
                    </button>
                    <button className="px-6 py-3 w-full text-white font-medium rounded-lg bg-[#D00000] transition-colors flex items-center justify-center gap-2">
                        <img src="/cancel-01.svg" alt="Cancel" className="w-5 h-5" />
                        Block User
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;