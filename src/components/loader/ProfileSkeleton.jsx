import React from "react";

const ProfileSkeleton = () => {
  return (
    <div>
      <div className="flex flex-wrap items-center mb-8 animate-pulse">
        <div className="h-24 w-24 rounded-full object-cover bg-gray-300 shadow-lg mr-6"></div>
        <div>
          <div className=" w-[240px]    items-center cursor-pointer animate-pulse">
            <h2 className="text-[20px] capitalize font-[600] text-[#012C57] bg-gray-300 w-2/3 h-5 rounded"></h2>
            <h3 className="text-[14px] mt-1 text-[#0081FF] font-[500] text-center bg-gray-300 w-3/4 h-4 rounded"></h3>
          </div>
        </div>
        <div className="ml-auto text-right">
          <div className=" w-[240px] flex  justify-end mb-3   items-center cursor-pointer animate-pulse">
            <h3 className="text-[14px] mt-1 text-[#0081FF] font-[500] text-center bg-gray-300 w-3/4 h-4 rounded"></h3>
          </div>
          <div className=" w-[240px] flex  justify-end mb-3   items-center cursor-pointer animate-pulse">
            <h3 className="text-[14px] mt-1 text-[#0081FF] font-[500] text-center bg-gray-300 w-3/4 h-4 rounded"></h3>
          </div>
          <div className=" w-[240px] flex  justify-end mb-3   items-center cursor-pointer animate-pulse">
            <h3 className="text-[14px] mt-1 text-[#0081FF] font-[500] text-center bg-gray-300 w-3/4 h-4 rounded"></h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
