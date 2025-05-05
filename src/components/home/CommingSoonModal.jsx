import React from "react";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { Cancelicon, lockModal } from "../../assets/export";

const CommingSoonModal = ({ isOpen, onClose, handleClick, text }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#FEFEFE] rounded-[26px] w-[471px]  p-6 shadow-[22px]">
        <div className="flex justify-end cursor-pointer" onClick={onClose}>
          <img src={Cancelicon} className="w-[15px] h-[15px] " alt="" />
        </div>

        <h2 className="text-[18px] font-[600] capitalize mt-3 text-[#000000] text-center leading-[32.4px] ">
          You will be notified when this module will become available.
        </h2>
        <div className="w-[419px]  ">
          <p className="text-[16px] font-[500] mt-2 text-[#000000] text-center leading-[22.6px]  ">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommingSoonModal;
