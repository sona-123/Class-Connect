"use client"
import React, { useState, useEffect } from 'react';

const CircularProgress = ({ usedSpace, totalSpace }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const progress = (usedSpace / totalSpace) * 100;
    setPercentage(progress);
  }, [usedSpace, totalSpace]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full">
          <circle
            className="text-gray-300"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r="45%"
            cx="50%"
            cy="50%"
          />
          <circle
            className="text-blue-600"
            strokeWidth="5"
            strokeDasharray="282.6"
            strokeDashoffset={`${282.6 - (282.6 * percentage) / 100}`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45%"
            cx="50%"
            cy="50%"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-blue-600 font-bold">{Math.round(percentage)}%</span>
        </div>
      </div>
      <div className="text-center text-lg">
        <p>
          <span id="used-space" className="font-bold">{usedSpace}</span> GB used
        </p>
        <p>
          <span id="left-space" className="font-bold">{totalSpace - usedSpace}</span> GB left
        </p>
      </div>
    </div>
  );
};

export default CircularProgress;
