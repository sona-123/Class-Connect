import React from 'react';

export default function ProgressBar({ progress }) {
  return (
    <div className='bg-gray-400 w-full p-1 m-3 rounded-full'>
      <div
        className='p-1 bg-primary rounded-full text-[10px] transition-width duration-500 ease-in-out'
        style={{ width: `${progress}%`, minWidth: '2%' }} // Ensure minimum visibility
      >
        <span className='text-white text-sm'>{`${Number(progress).toFixed(0)}%`}</span>
      </div>
    </div>
  );
}
