import React from 'react';

const Shimmer = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-64 h-32 bg-gray-200 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"></div>
      </div>
    </div>
  );
};

export default Shimmer;
