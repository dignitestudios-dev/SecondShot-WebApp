import React from "react";
import { Mygoalmodal } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const WelcomeGoalModal = ({ isOpen, onClose, handleClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#FEFEFE] rounded-[26px] w-[471px]   p-6 shadow-[22px]">
        <div className="flex justify-center mt-3">
          <img
            src={Mygoalmodal}
            className="w-[331.61px] h-[207.67px] "
            alt=""
          />
        </div>
        <h2 className="text-[32px] font-[600] capitalize mt-3 text-[#000000] text-center leading-[43.2px] ">
          Welcome to the Goal Setting Hub!
        </h2>
        <div className="w-[419px]  ">
          <p className="text-[18px] font-[500] mt-4 text-black text-center leading-[24.3px]  ">
            Here you can create goals, set deadlines, make them S.M.A.R.T. and
            even break them down into sub-goals. Share your goals with your
            support network and track your progress easily. Let’s start turning
            your aspirations into achievements!
          </p>
        </div>
        <div className="flex items-center justify-center  mt-6 ">
          <div className=" w-full">
            <AuthSubmitBtn text={"Okay"} handleSubmit={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeGoalModal;
