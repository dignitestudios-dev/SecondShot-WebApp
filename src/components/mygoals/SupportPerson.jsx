import React from "react";
import { PiPencilLine } from "react-icons/pi";

const SupportPerson = ({ formData }) => {
  console.log(formData?.fullname, "formData?.fullname");
  return (
    <div>
      <div className="">
        <div className="bg-white h-[161px] shadow-sm mt-3 rounded-[22px]  p-6">
          <div className="flex justify-between">
            <h2 className="font-[500] text-[24px] text-gray-800">
              Support Person 01
              <span className="text-[#56EC17] text-[24px] font-[500] "></span>
            </h2>
            <button className=" top-4 right-4 p-2 w-10 h-10 bg-[#012C57] text-white rounded-md">
              <PiPencilLine size={24} />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-x-2">
            <p className=" border-r border-gray-300 pr-4 grid grid-cols-1">
              <span className="text-[16px] font-[600] leading-[21.6px] ">
                Full Name:
              </span>
              <span className="text-[14px] leading-[18.9px] font-[400] ">
                {" "}
                {formData?.fullname}{" "}
              </span>
            </p>
            <p className="text-sm border-r border-gray-300 pr-1">
              <span className="text-[16px] font-[600] leading-[21.6px] ">
                Email Address:
              </span>{" "}
              {formData?.email}
              {/* "emmaava@gmail.com" : "johndoe@gmail.com" */}
            </p>
            <p className="text-sm grid grid-cols-1">
              <span className="text-[16px] font-[600] leading-[21.6px] ">
                Phone Number:
              </span>
              <span className="text-[14px] leading-[18.9px] font-[400] ">
                {" "}
                {formData?.phone}
              </span>
            </p>
          </div>
        </div>
        <div className="bg-white h-[161px] shadow-sm mt-3 rounded-[22px]  p-6">
          <div className="flex justify-between">
            <h2 className="font-[500] text-[24px] text-gray-800">
              Support Person 02
              <span className="text-[#56EC17] text-[24px] font-[500] "></span>
            </h2>
            <button className=" top-4 right-4 p-2 w-10 h-10 bg-[#012C57] text-white rounded-md">
              <PiPencilLine size={24} />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-x-2">
            <p className=" border-r border-gray-300 pr-4 grid grid-cols-1">
              <span className="text-[16px] font-[600] leading-[21.6px] ">
                Full Name:
              </span>
              <span className="text-[14px] leading-[18.9px] font-[400] ">
                {" "}
                {formData?.fullname_2}{" "}
              </span>
            </p>
            <p className="text-sm border-r border-gray-300 pr-1">
              <span className="text-[16px] font-[600] leading-[21.6px] ">
                Email Address:
              </span>{" "}
              {formData?.email_2}
              {/* "emmaava@gmail.com" : "johndoe@gmail.com" */}
            </p>
            <p className="text-sm grid grid-cols-1">
              <span className="text-[16px] font-[600] leading-[21.6px] ">
                Phone Number:
              </span>
              <span className="text-[14px] leading-[18.9px] font-[400] ">
                {" "}
                {formData?.phone_2}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPerson;
