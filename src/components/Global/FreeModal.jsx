import React from "react";
import { Cancelicon } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const FreeModal = ({ isOpen, onClose, handleClick, text }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#FEFEFE] rounded-[26px] w-[471px]  p-6 shadow-[22px]">
        <div className="flex justify-end cursor-pointer" onClick={onClose}>
          <img src={Cancelicon} className="w-[15px] h-[15px] " alt="" />
        </div>

        <h2 className="text-[20px] font-[500] capitalize mt-5 mb-5 text-[#000000] text-center leading-[32.4px] ">
          Please enter your details to try it for free.
        </h2>
        <div className="w-[419px]  ">
          <p className="text-[16px] font-[500] mt-2 text-[#000000] text-center leading-[22.6px]  ">
            {text}
          </p>
        </div>
        <div className="flex items-center justify-center  mt-3">
          <div className=" w-[200px]">
            <AuthSubmitBtn text={"Close"} handleSubmit={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeModal;
