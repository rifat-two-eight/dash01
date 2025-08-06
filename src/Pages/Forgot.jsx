import { Link } from "react-router";

const Forgot = () => {
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
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your email to reset password
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="example@gmail.com"
                        />
                    </div>
                    

                    {/* Login Button */}
                    <Link to="/set-password"><button
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A90E2] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                    >
                        Login
                    </button></Link>
                </div>
            </div>
        </div>
    );
};

export default Forgot;