import React from "react";
import { lockModal, Mygoalmodal } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const LockModal = ({ isOpen, onClose, handleClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#FEFEFE] rounded-[26px] w-[471px]  p-6 shadow-[22px]">
        <div className="flex justify-center mt-3">
          <img src={lockModal} className="w-[126px] h-[126px] " alt="" />
        </div>
        <h2 className="text-[24px] font-[600] capitalize mt-3 text-[#000000] text-center leading-[32.4px] ">
          Get Full Access
        </h2>
        <div className="w-[419px]  ">
          <p className="text-[16px] font-[500] mt-2 text-[#000000] text-center leading-[21.6px]  ">
            Buy a subscription to unlock this feature <br /> and enjoy exclusive
            benefits.
          </p>
        </div>
        <div className="flex items-center justify-center  mt-3">
          <div className=" w-full">
            <AuthSubmitBtn text={"Continue"} handleSubmit={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockModal;
