import React from "react";
import { Tick } from "../../assets/export";

const SubriptionCardPath = ({ selected, cardsubdata }) => {
  console.log(cardsubdata, "cardsubdata");

  return (
    <div>
      <div>
        <div className="  bg-white rounded-[22px]   overflow-y-auto   shadow-lg   p-2 w-[438px] max-w-sm">
          <div className="flex justify-between items-center  mt-3 ">
            <h2 className="text-[24px] px-3 font-[500] text-[#000000] leading-[32.4px] ">
              {cardsubdata?.subscription_duration}
            </h2>
            <h2 className="text-[32px] font-[600] leading-[43.2px] pe-3 text-[#56EC17]">
              {cardsubdata?.price} /
              <span className="text-[12px] text-black">
                {cardsubdata?.subscription_duration}
              </span>
            </h2>
          </div>
          <div>
            <hr className="bg-[#000000] mb-4 mt-3" />
          </div>

          <div className="p-3">
            <div className="text-[22px] font-[600] text-gray-900 ">
              {cardsubdata?.product_name}
            </div>
            <ul className="space-y-2 mb-6 text-gray-700">
              {/* {cardsubdata?.benefitsList.map((item, index) => (
                <li className="flex items-center space-x-2 space-y-3 mt-3 " key={index}>
                  <img src={Tick} className="h-[10.5px] mt-3  w-[13.5px]" alt="" />
                  <span className="text-[17px] leading-[22.95px] font-[500] text-[#181818]">
                    {item}
                  </span>
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubriptionCardPath;
