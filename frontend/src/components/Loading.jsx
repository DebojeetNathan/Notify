import React from "react";

const Loading = () => {
  return (
    <div class="flex justify-center items-center h-screen">
      <div class="relative inline-flex">
        <div class="w-20 h-20 bg-green-400 rounded-full"></div>
        <div class="w-20 h-20 bg-green-400 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div class="w-20 h-20 bg-green-400 rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;
