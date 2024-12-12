import React from "react";
import { CareerModal } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const CareerRecommendationsModal = ({ isOpen, onClose, handleClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50">
      <div className="bg-[#FEFEFE] rounded-[26px] w-[471px] h-[703px]  p-6 shadow-[22px]">
        <div className="flex justify-center mt-3">
          <img src={CareerModal} className="w-[342.63px] h-[218.5px] " alt="" />
        </div>
        <h2 className="text-[32px] font-[600] capitalize mt-3 text-[#000000] text-center leading-[43.2px] ">
          Career Recommendation
        </h2>
        <div className="w-[419px]  h-[286px] ">
          <p className="text-[18px] font-[500] mt-4 text-[#9A9A9A] text-center leading-[24.3px]  ">
            You’ve been matched with five potential careers! Take a moment to
            click through each one and explore sample job titles, career
            pathways, and recommended education.
          </p>
          <p className="text-[18px] font-[500] mt-5 text-[#9A9A9A] text-center leading-[24.3px] ">
            Be sure to mark your favorites so you can save them in your library.
            This way, you’ll have easy access to revisit and review them later.
          </p>
          <p className="text-[18px]   font-[500] mt-5 text-[#9A9A9A] text-center leading-[24.3px] ">
            If you’re interested in exploring even more career options, you can
            always retake the assessment for additional matches
          </p>
        </div>
        <div className="flex items-center justify-center  mt-6 ">
          <div className=" w-[295px]">
            <AuthSubmitBtn text={"Okay"} handleSubmit={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRecommendationsModal;
