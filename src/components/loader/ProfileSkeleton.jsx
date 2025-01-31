import React from "react";

const ProfileSkeleton = () => {
  return (
    <div>
      <div className="flex flex-wrap items-center mb-8">
        <img
          src="https://placehold.co/600x400"
          alt="User Avatar"
          className="h-24 w-24 rounded-full object-cover shadow-lg mr-6"
        />
        <div>
          <h2 className="text-[20px] font-[600] text-[#050405] text-left">
            {"....."}
          </h2>
          <p>{"....."}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-[#050405] text-[16px] ">{'0000000000'}</p>
          <p className="text-[#050405] text-[16px] mb-3">Toronto, Canada</p>
          <p className="text-[#222222] font-[500] text-[16px] leading-[21.6px] ">
            Visit our website
          </p>
          <p className="text-[#222222] font-[400] text-[16px] leading-[21.6px] underline ">
            www.secondshot.com/56et
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
