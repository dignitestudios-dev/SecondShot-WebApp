import React from "react";
import { TickIcon } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const SubscriptionModal = ({ isOpen, onClose, handleClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#FEFEFE] rounded-lg w-[753px] h-[446px]  p-6 shadow-[22px]">
        <div className="flex justify-center">
          <img src={TickIcon} className="w-[107px] h-[107px] " alt="" />
        </div>
        <h2 className="text-[36px] font-[600] mt-3 text-[#000000] text-center leading-[48.6px] ">
          Your Career Prep Toolbox has <br /> been unlocked
        </h2>
        <p className="text-[18px] font-[500] mt-4 text-[#000000] text-center leading-[24.3px] ">
          Your subscription has been successfully unlocked. You now have full
          access <br /> to all features and benefits. If you have any questions,
     
          contact{" "}
          <a href="mailto:help@yoursecondshot.com" className="underline px-1">
            help@yoursecondshot.com
          </a>
        </p>
        <div className="flex items-center justify-center  mt-6 ">
          <div className=" w-[295px]">
            <AuthSubmitBtn text={"Get Started"} handleSubmit={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
