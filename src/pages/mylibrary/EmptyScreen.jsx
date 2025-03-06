import React from "react";
import { empty_img } from "../../assets/export";

const EmptyScreen = ({ text }) => {
  return (
    <div className="">
      <div className="text-center">
        <div className="mb-5">
          <img src={empty_img} alt="Empty" className="mx-auto" />
        </div>
        <div className="font-[500] text-[32px] leading-[43.2px] text-[#000000]">
          {text}
        </div>
        <div className="font-[400] text-[#999999] text-[14px] mt-3">
          Need some inspiration?
        </div>
      </div>
    </div>
  );
};

export default EmptyScreen;
