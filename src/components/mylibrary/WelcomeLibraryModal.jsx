import React from "react";
import { Welcomelibrary } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const WelcomeLibraryModal = ({ isOpen, onClose, handleClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#FEFEFE] rounded-[26px] w-[471px]  p-6 shadow-[22px]">
        <div className="flex justify-center ">
          <img src={Welcomelibrary} className="w-[214.3px] h-[214px] " alt="" />
        </div>
        <h2 className="text-[32px] font-[600] capitalize mt-3 text-[#000000] text-center leading-[43.2px] ">
          Welcome to your Library!
        </h2>
        <div className="w-[419px] ">
          <p className="text-[18px] font-[500] mt-4 text-[#9A9A9A] text-center leading-[24.3px]  ">
            You can view your saved transferable skills and matched careers.
            View your library as a snapshot of your strengths and abilities.
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
