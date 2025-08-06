import { Link } from "react-router";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center w-[715px] h-[500px] flex flex-col justify-between py-3 gap-6 px-6">
                <h1 className="text-9xl font-medium">404</h1>
                <Link to="/" className="w-full">
                    <button className="w-full bg-[#4A90E2] text-white font-medium px-8 py-3 rounded-md cursor-pointer transition-colors duration-200">
                        Go Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;