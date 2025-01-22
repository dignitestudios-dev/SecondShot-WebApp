import React, { useState } from "react";
import { AppleIcon, ArrowRight, GoogleIcon } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const InviteFriendModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [activeOption, setActiveOption] = useState("text");

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg  max-w-md p-6 relative">
        <button
          className="absolute top-0 right-2 text-xl text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="mx-2">
          <h2 className="text-[24px] font-[600] leading-[32.4px] text-[#000000] text-center mb-4">
            Refer a friend and help them build their own Career Toolbox!
          </h2>
          <div className="space-y-4 cursor-pointer">
            <div
              className={`flex justify-between p-3 items-center rounded-[12px] h-[61px] ${
                activeOption === "text"
                  ? "bg-grad-button text-white"
                  : "bg-[#F6F6F6] text-[#000000]"
              }`}
              onClick={() => handleOptionClick("text")}
            >
              Via Text
              <div
                className={`rounded-full flex items-center justify-center w-[26px] h-[26px] ${
                  activeOption === "text"
                    ? "bg-white"
                    : "border-[#dcdbdb] border-2 bg-[white]"
                }`}
              >
                <div
                  className={`w-[18px] h-[18px] border-2 ${
                    activeOption === "text"
                      ? "bg-[#02284F] border-[#02284F]"
                      : "border-white"
                  } rounded-full`}
                ></div>
              </div>
            </div>

            <div
              className={`flex justify-between p-3 items-center rounded-[12px] h-[61px] ${
                activeOption === "email"
                  ? "bg-grad-button text-white"
                  : "bg-[#F6F6F6] text-[#000000]"
              }`}
              onClick={() => handleOptionClick("email")}
            >
              Via Email
              <div
                className={`rounded-full flex items-center justify-center w-[26px] h-[26px] ${
                  activeOption === "email"
                    ? "bg-white"
                    : "border-[#dcdbdb] border-2 bg-[white]"
                }`}
              >
                <div
                  className={`w-[18px] h-[18px] border-2 ${
                    activeOption === "email"
                      ? "bg-[#02284F] border-[#02284F]"
                      : "border-white"
                  } rounded-full`}
                ></div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <AuthSubmitBtn text={"Next"} handleSubmit={() => onClose()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriendModal;
