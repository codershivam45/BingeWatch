import React from 'react';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center  text-white h-full w-full">
            {/* Spinner with a smooth rotation */}
            <div className="w-10 h-10 border-4 border-t-4 border-gray-500 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;
