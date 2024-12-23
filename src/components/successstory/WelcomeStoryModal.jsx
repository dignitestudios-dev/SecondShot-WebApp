import React from "react";
import { WelcomeStoryimg } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const WelcomeStoryModal = ({ isOpen, onClose, handleClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#FEFEFE] rounded-[26px] w-[471px] h-[523px]  p-6 shadow-[22px]">
        <div className="flex justify-center  ">
          <img src={WelcomeStoryimg} className="w-[304px] h-[204px] " alt="" />
        </div>
        <h2 className="text-[32px] font-[600] capitalize mt-3 text-[#000000] text-center leading-[43.2px] ">
          Success Stories
        </h2>
        <div className="w-[419px] ">
          <p className="text-[18px] font-[500] mt-4 text-[#9A9A9A] text-center leading-[24.3px]  ">
            Here are success stories of people who have walked similar paths in
            life as you. You can search by profession, sport, military rank, or
            school. If they can do it, you can do it too!
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

export default WelcomeStoryModal;
