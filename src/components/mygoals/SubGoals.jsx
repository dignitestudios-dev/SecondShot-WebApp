import React from "react";

const SubGoals = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="bg-white rounded-[16px] shadow-md p-6 mt-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-[500] text-[24px] text-[#222222] ">
              Sub Goals
            </h2>
            <button className="bg-[#EAF8FF] bg-opacity-35 text-[#36B8F3] px-4 py-2 rounded-md border border-[#36B8F3]">
            In Progress
          </button>
          </div>
          {[...Array(4)]?.map((item) => (
            <div className="flex items-center gap-2 py-2 border-b border-gray-200 last:border-b-0 text-[14px]">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
              />
              <label className="text[#0F0F0F] text-[16px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubGoals;
