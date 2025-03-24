// components/Circle.jsx
import React from "react";

const Score = ({ score }) => {
    const radius = 30; // Keep the original ring size
    const circumference = 2 * Math.PI * radius;
    const progress = Math.max(0, Math.min(100, score)); // Ensure score stays between 0 and 100
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    // Dynamic ring colors based on score
    const getColors = (score) => {
        if (score >= 70) return ["stroke-green-400", "stroke-green-700"];
        if (score >= 50) return ["stroke-yellow-400", "stroke-yellow-700"];
        return ["stroke-red-400", "stroke-red-700"];
    };

    const [mainColor, dimColor] = getColors(progress);

    return (
        <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gray-800 shadow-md">
            {/* SVG Circle Progress (keeps original size) */}
            <svg className="absolute transform -rotate-90" width="100" height="100">
                {/* Dim Background Circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    strokeWidth="4"
                    className={`transition-all duration-500 ease-in-out ${dimColor}`}
                />
                {/* Progress Circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className={`transition-all duration-700 ease-in-out ${mainColor}`}
                />
            </svg>

            {/* Score Text */}
            <span className="absolute text-white text-sm font-bold">{progress}%</span>
        </div>
    );



};

export default Score;
