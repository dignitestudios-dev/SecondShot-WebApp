import React, { useContext } from "react";
import { TickIcon, WelcomeImg } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { AuthContext } from "../../context/AuthContext";

const WelcomeModal = ({ isOpen, handleClick }) => {
  if (!isOpen) return null;
  const { subscriptionpaid } = useContext(AuthContext);
  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#FEFEFE] rounded-[26px] w-[471px]   p-6 shadow-[22px]">
        <div className="flex justify-center mt-3">
          <img src={WelcomeImg} className="w-[199.02px] h-[191.21px] " alt="" />
        </div>
        <h2 className="text-[32px] font-[600] capitalize mt-3 text-[#000000] text-center leading-[43.2px] ">
          Welcome to career toolbox!
        </h2>
        {subscriptionpaid === false ? (
          <p className="text-[18px] font-[500] mt-4 text-black text-center leading-[24.3px] ">
            Thank you for trying out Career Prep. Your free access lets you try
            out our Transferable Skills Module. Click anywhere else on the
            screen to subscribe and get access to all modules.
          </p>
        ) : (
          <p className="text-[18px] font-[500] mt-4 text-black text-center leading-[24.3px] ">
            You can start with any tool first. Click on each tool to learn more
            of how to use it in your life.
          </p>
        )}
        <div className="flex items-center justify-center  mt-6 ">
          <div className=" w-[295px]">
            <AuthSubmitBtn text={"Okay"} handleSubmit={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
