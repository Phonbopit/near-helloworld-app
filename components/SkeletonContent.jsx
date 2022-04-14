import React from 'react';

const SkeletonContent = ({ viewMesage }) => {
  return (
    <div className="mt-20 border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-200 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
      <button
        className="block mx-auto mt-4 rounded-md py-2 px-4 border-transparent bg-pink-600 hover:bg-pink-700 text-slate-200 font-medium disabled:bg-indigo-200"
        onClick={viewMesage}
      >
        Show a message
      </button>
    </div>
  );
};

export default SkeletonContent;
