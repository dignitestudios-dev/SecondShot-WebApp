import React from "react";
import { Welcomelibrary } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const WelcomeLibraryModal = ({ isOpen, onClose, handleClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#FEFEFE] rounded-[26px] w-[471px] h-[536px]  p-6 shadow-[22px]">
        <div className="flex justify-center ">
          <img src={Welcomelibrary} className="w-[313.3px] h-[224px] " alt="" />
        </div>
        <h2 className="text-[32px] font-[600] capitalize mt-3 text-[#000000] text-center leading-[43.2px] ">
          Welcome to your Library!
        </h2>
        <div className="w-[419px] ">
          <p className="text-[18px] font-[500] mt-4 text-[#9A9A9A] text-center leading-[24.3px]  ">
            Here, you can save and organize your favorite transferable skills
            and recommended careers from the Career Toolbox. Keep everything
            sorted and easily accessible to help you stay on track with your
            career goals. Ready to get started?
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

export default WelcomeLibraryModal;
