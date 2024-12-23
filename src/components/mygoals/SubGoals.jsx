import React from "react";

const SubGoals = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="bg-white rounded-[16px] shadow-md p-6 mt-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-[600] text-[18px] text-[#222222] ">
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
            id="custom-checkbox"
            className="h-5 w-5 rounded-md border border-gray-300 bg-white checked:bg-[#012C57] checked:border-[#012C57] appearance-none cursor-pointer 
  checked:before:block checked:before:content-['✓'] checked:before:text-white checked:before:text-sm text-center 
 checked:before:justify-center checked:before:items-center"
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
