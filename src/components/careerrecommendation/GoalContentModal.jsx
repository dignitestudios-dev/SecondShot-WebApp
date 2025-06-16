import React from "react";
import { RxCross1 } from "react-icons/rx";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const GoalContentModal = ({ showModal, onClose }) => {
  return (
    showModal && (
      <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-custom-shadow w-[500px] z-10 p-4 relative">
          <div className="px-4 pt-2 pb-2">
            <div className="w-[419px] ">
              <p className="text-[18px] font-[500] mt-2 text-black text-center leading-[24.3px]  ">
                Type your goal in the chat and add make it a Smart Goal. Review
                and add the sub goals you want to focus on
              </p>
            </div>
            <div className="mt-5">
              <AuthSubmitBtn text={"Close"} handleSubmit={onClose}  />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default GoalContentModal;
