import React from "react";
import AuthInput from "../onboarding/AuthInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const AddSupportModal = ({ showModal, handleClick }) => {
  return (
    showModal && (
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm ">
        <div className="bg-white rounded-xl shadow-lg w-[450px] h-[640px] py-10 px-2 relative">
          <button
            className="absolute top-0 right-2 text-[20px] text-gray-500 hover:text-gray-600"
            onClick={handleClick}
          >
            &times;
          </button>
          <div className="h-[570px] px-3 overflow-auto">
            <div className="flex justify-center mt-3">
              <div>
                <p className="text-[24px] text-center text-[#000000] font-[600]">
                  Add Support People
                </p>
                <p className="text-[16px] w-[376px] text-center font-[400] text-[#000000] leading-[21.6px] mt-2 mb-2 ">
                  Connect with individuals who can support you on your journey
                  towards achieving your goals.
                </p>
              </div>
            </div>
            <p className="text-[18px] font-[600] leading-[24.3px] ">
              1st Support Person
            </p>
            <div className="w-full flex flex-col items-start space-y-4 gap-1 my-2">
              <AuthInput text={"Full Name"} placeholder={"Enter Name"} />
              <AuthInput
                text={"Email Address"}
                placeholder={"Enter Email"}
              />
              <AuthInput
                text={"Phone Number"}
                placeholder={"Enter Phone Number"}
              />
            </div>
            <div className="w-full flex flex-col items-start gap-1 my-2"></div>

            <hr className="my-6 bg-slate-300" />
            <p className="text-[18px] font-[600] leading-[24.3px] ">
              2nd Support Person
            </p>
            <div className="w-full flex flex-col items-start space-y-4 gap-1 my-2">
              <AuthInput text={"Full Name"} placeholder={"Enter Name"} />
              <AuthInput
                text={"Email Address"}
                placeholder={"Enter Email"}
              />
              <AuthInput
                text={"Phone Number"}
                placeholder={"Enter Phone Number"}
              />
            </div>
            <div className="mt-2">
              <AuthSubmitBtn text={"Send"} handleSubmit={() => handleClick()} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddSupportModal;
