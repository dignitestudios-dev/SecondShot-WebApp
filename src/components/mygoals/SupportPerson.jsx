import React from "react";
import { PiPencilLine } from "react-icons/pi";

const SupportPerson = ({ formData }) => {
  const phoneFormater = (input) => {
    if (!input) return "";

    const cleaned = input.replace(/\D/g, "");

    if (cleaned.length > 3 && cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else if (cleaned.length > 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6,
        10
      )}`;
    } else if (cleaned.length > 0) {
      return `(${cleaned}`;
    }

    return cleaned;
  };
  return (
    <div>
      {/* Check if formData for the first support person exists */}
      {formData?.fullname && formData?.email && formData?.phone ? (
        <div className="bg-white h-[161px] shadow-sm mt-3 rounded-[22px] p-6">
          <div className="flex justify-between">
            <h2 className="font-[500] text-[24px] text-gray-800">
              Support Person 01
            </h2>
            {/* <button className="top-4 right-4 p-2 w-10 h-10 bg-[#012C57] text-white rounded-md">
              <PiPencilLine size={24} />
            </button> */}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-x-2">
            <p className="border-r border-gray-300 pr-4 grid grid-cols-1">
              <span className="text-[16px] font-[600] leading-[21.6px] ">
                Full Name:
              </span>
              <span className="text-[14px] break-words leading-[18.9px] font-[400] ">
                {formData?.fullname}
              </span>
            </p>
            <p className="text-sm border-r break-words border-gray-300 pr-1">
              <span className="text-[16px] font-[600] leading-[21.6px] ">
                Email Address:
              </span>{" "}
              {formData?.email}
            </p>
            <p className="text-sm grid grid-cols-1">
              <span className="text-[16px] font-[600] leading-[21.6px] ">
                Phone Number:
              </span>
              <span className="text-[14px] leading-[18.9px] font-[400] ">
              +1{phoneFormater(formData?.phone)}   
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white h-[161px] text-center flex items-center justify-center shadow-sm mt-3 rounded-[22px] p-6">
          <p>No Support Person 01 found</p>
        </div>
      )}

      {/* Check if formData for the second support person exists */}
      {formData?.fullname_2 && formData?.email_2 && formData?.phone_2 ? (
        <div className="bg-white h-[161px] shadow-sm mt-3 rounded-[22px] p-6">
          <div className="flex justify-between">
            <h2 className="font-[500] text-[24px] text-gray-800">
              Support Person 02
            </h2>
            {/* <button className="top-4 right-4 p-2 w-10 h-10 bg-[#012C57] text-white rounded-md">
              <PiPencilLine size={24} />
            </button> */}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-x-2">
            <p className="border-r border-gray-300 pr-4 grid grid-cols-1">
              <span className="text-[16px]  font-[600] leading-[21.6px] ">
                Full Name:
              </span>
              <span className="text-[14px] break-words leading-[18.9px] font-[400] ">
                {formData?.fullname_2}
              </span>
            </p>
            <p className="text-sm border-r break-words border-gray-300 pr-1">
              <span className="text-[16px]  font-[600] leading-[21.6px] ">
                Email Address:
              </span>{" "}
              {formData?.email_2}
            </p>
            <p className="text-sm grid grid-cols-1">
              <span className="text-[16px] font-[600] leading-[21.6px] ">
                Phone Number:
              </span>
              <span className="text-[14px] leading-[18.9px] font-[400] ">
              +1{phoneFormater(formData?.phone_2)}   
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white h-[161px] flex items-center justify-center shadow-sm mt-3 rounded-[22px] p-6">
          <p>No Support Person 02 found</p>
        </div>
      )}
    </div>
  );
};

export default SupportPerson;
