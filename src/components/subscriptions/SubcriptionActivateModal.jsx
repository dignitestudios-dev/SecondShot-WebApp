import React from "react";
import { TickIcon } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const SubcriptionActivateModal = ({ isOpen, handleClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50">
      <div className="bg-[#FEFEFE] rounded-lg flex items-center flex-col h-[446px]  p-6 shadow-[22px]">
        <div className="flex justify-center">
          <img src={TickIcon} className="w-[107px] h-[107px] " alt="" />
        </div>
        <h2 className="text-[36px] w-[460px] font-[600] mt-3 text-[#000000] text-center leading-[48.6px] ">
          Your Career Prep Toolbox has been unlocked
        </h2>
        <p className="text-[18px] w-[556.27px] font-[500] mt-4 text-[#000000] text-center leading-[24.3px] ">
          Your subscription has been successfully unlocked. You now have full
          access to all features and benefits. If you have any questions, please
          contact our For assistance contact{" "}
          <a href="mailto:help@yoursecondshot.com" className="underline">
            help@yoursecondshot.com
          </a>{" "}
          Enjoy your subscription!
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

export default SubcriptionActivateModal;
