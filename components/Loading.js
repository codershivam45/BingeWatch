import React from 'react';

const Loading = () => {
    return (
        <div className=" flex flex-col items-center justify-center bg-gray-100">
            {/* Spinner with a smooth rotation */}
            <div className="w-10 h-10 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

            {/* Animated Dots for Text */}
            <div className="mt-6 flex items-center space-x-2">
                <p className="text-lg font-semibold text-gray-700">Loading</p>
                
            </div>
        </div>
    );
};

export default Loading;
