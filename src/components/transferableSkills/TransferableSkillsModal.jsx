import React, { useState } from "react";
import { Badge, TransferableSkills } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const TransferableSkillsModal = ({ isOpen, onClose, handleClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#FEFEFE] rounded-[26px] w-[471px] h-[665px]  text-center px-9 shadow-[22px]">
        <div className="flex justify-center mt-4">
          <img
            src={TransferableSkills}
            className="w-[342.63px] h-[200.5px] "
            alt=""
          />
        </div>
        <h2 className="text-[32px] font-[600] capitalize  text-[#000000] text-center leading-[43.2px] ">
          My transferable skills
        </h2>
        <div className="w-[395px]  h-[286px] ">
          <p className="text-[18px] font-[500] mt-4 text-[#9A9A9A] text-center leading-[24.3px]  ">
            Here is a map of your transferable skills. Take a look at all the
            soft skills you have inside of you that you have have learned over
            your life.
          </p>
          <p className="text-[18px] font-[500] mt-5 text-[#9A9A9A] text-center leading-[24.3px] ">
            Click on each circle to expand to learn about how you can use your
            soft skills in other areas of your life.
          </p>
          <p className="text-[18px]   font-[500] mt-5 text-[#9A9A9A] text-center leading-[24.3px] ">
            Click the ribbon to save your favorite skills. Once it turns green,
            your skill is stored in your library and ready to be added to your
            resume{" "}
            <span className="flex justify-center items-center gap-2">
              anytime! <img src={Badge} className="w-[12px] h-[18px] " alt="" />
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center  mt-3 ">
          <div className=" w-[295px]">
            <AuthSubmitBtn text={"Okay"} handleSubmit={handleClick} />
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default TransferableSkillsModal;
