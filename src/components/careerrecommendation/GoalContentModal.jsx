import React from "react";
import { RxCross1 } from "react-icons/rx";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const GoalContentModal = ({ showModal, onClose }) => {
  return (
    showModal && (
      <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-custom-shadow w-[500px] z-10 p-4 relative">
          <div className="px-4 pt-2 pb-2">
            <div className="w-[419px] space-y-4">
              <h2 className="text-[20px] font-semibold text-center text-[#181818]">
                You have 2 options
              </h2>

              <div className="space-y-3">
                <div className="bg-[#F9FAFB] border border-gray-200 rounded-xl p-3">
                  <p className="text-[16px] font-medium text-[#111827] leading-6">
                    <span className="font-semibold text-[#012c57] mr-2">
                      Option 1:
                    </span>
                    Type your goal in the AI chat and ask it to revise it and
                    make it a SMART goal.
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-gray-200 rounded-xl p-3">
                  <p className="text-[16px] font-medium text-[#111827] leading-6 ">
                    <span className="font-semibold text-[#012c57] mr-2">
                      Option 2:
                    </span>
                    Go through the steps to create your SMART goals by following
                    the instructions.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <AuthSubmitBtn text={"Close"} handleSubmit={onClose} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default GoalContentModal;
