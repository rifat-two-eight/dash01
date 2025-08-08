import React from 'react';

const PhotoChange = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <div className="rounded-lg p-12 flex flex-col items-center space-y-6 max-w-md w-full">
                {/* Profile Icon */}
                <div className="flex items-center justify-center">
                    <img 
                        src="/profile-change.svg" 
                        alt="Change Profile" 
                        className="w-[400px] h-[400px]"
                    />
                </div>
                
                {/* Change Image Button */}
                {/* button */}
                <button className="bg-[#4A90E2] text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                    <img src="/public/change-name.svg" alt="" />
                    <span>Change Image</span>
                </button>
            </div>
        </div>
    );
};

export default PhotoChange;