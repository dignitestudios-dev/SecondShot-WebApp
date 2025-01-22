import React from "react";
import { PiPencilLine } from "react-icons/pi";

const SupportPerson = () => {
  return (
    <div>
      <div className="">
        {["Support Person ", "Support Person "].map((supportTitle, index) => (
          <div key={index} className="bg-white h-[161px] shadow-sm mt-3 rounded-[22px]  p-6">
            <div className="flex justify-between">
              <h2 className="font-[500] text-[24px] text-gray-800">
                {supportTitle}
                <span className="text-[#56EC17] text-[24px] font-[500] ">(0{index + 1})</span>
              </h2>
              <button className=" top-4 right-4 p-2 w-10 h-10 bg-[#012C57] text-white rounded-md">
                <PiPencilLine size={24} />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-x-4">
              <p className=" border-r border-gray-300 pr-4 grid grid-cols-1">
                <span className="text-[16px] font-[600] leading-[21.6px] " >Full Name:</span>
                <span className="text-[14px] leading-[18.9px] font-[400] "> {index === 0 ? "Emma Ava" : "John Doe"} </span>
              </p>
              <p className="text-sm border-r border-gray-300 pr-4">
                <span className="text-[16px] font-[600] leading-[21.6px] ">Email Address:</span>{" "}
                {index === 0 ? "emmaava@gmail.com" : "johndoe@gmail.com"}
              </p>
              <p className="text-sm grid grid-cols-1">
                <span className="text-[16px] font-[600] leading-[21.6px] " >Phone Number:</span>
                <span className="text-[14px] leading-[18.9px] font-[400] "> +1000 0000 0000</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportPerson;
