import React from "react";

export default function Loading() {
  return (
    <>
      <div className="fixed z-10 top-0 left-0 flex flex-col bg-gray-500 w-screen h-screen justify-center items-center transition-all ease-in-out">
        <div className="flex justify-center items-center">
          <img src="/resources/loading.svg" alt="loading" className="w-20 h-20" />
        </div>
        <div className="text-2xl mt-4">Loading...</div>
      </div>
    </>
  );
}
