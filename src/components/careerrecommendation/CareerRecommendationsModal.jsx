import React from "react";
import { CareerModal } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const CareerRecommendationsModal = ({ isOpen, onClose, handleClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#FEFEFE] rounded-[26px] w-[471px] h-[703]px] px-8  shadow-[22px]">
        <div className="flex justify-center mt-3">
          <img src={CareerModal} className="w-[342.63px] h-[218.5px] " alt="" />
        </div>
        <h2 className="text-[32px] font-[600] capitalize mt-2 text-[#000000] text-center leading-[43.2px] ">
          My Career Recommendations
        </h2>
        <div className="w-[419px]  mb-5 ">
          <p className="text-[18px] font-[500] mt-2 text-[#9A9A9A] text-center leading-[24.3px]  ">
            You will be given a short 24 question survey. Make sure you choose
            the answer that comes to mind first. Once you are finished you can
            review your 5 matched careers. You are able to retake the survey to
            receive a new set of matches.
          </p>
        </div>
        <div className="flex items-center justify-center mb-2 ">
          <div className=" w-[295px]">
            <AuthSubmitBtn text={"Okay"} handleSubmit={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRecommendationsModal;
