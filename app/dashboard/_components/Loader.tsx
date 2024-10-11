import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[300px]">
      <div className="w-12 h-12 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
