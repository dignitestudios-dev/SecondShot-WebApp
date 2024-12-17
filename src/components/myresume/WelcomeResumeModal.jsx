import React from "react";
import { Myresumemodal } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const WelcomeResumeModal = ({ isOpen, onClose, handleClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#FEFEFE] rounded-[26px] w-[471px] h-[569px]  p-6 shadow-[22px]">
        <div className="flex justify-center ">
          <img src={Myresumemodal} className="w-[313.3px] h-[224px] " alt="" />
        </div>
        <h2 className="text-[32px] font-[600] capitalize mt-3 text-[#000000] text-center leading-[43.2px] ">
          Welcome to the Resume Builder!
        </h2>
        <div className="w-[419px] ">
          <p className="text-[18px] font-[500] mt-4 text-[#9A9A9A] text-center leading-[24.3px]  ">
            Easily create your professional resume with our guided example, step
            by step. Once you're done, forward it to your support network for
            feedback or download it for future use. Let's get started on your
            path to success!"
          </p>
        </div>
        <div className="flex items-center justify-center  mt-6">
          <div className="w-full ">
            <AuthSubmitBtn text={"Okay"} handleSubmit={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeResumeModal;
