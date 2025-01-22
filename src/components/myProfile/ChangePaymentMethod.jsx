import React from "react";
import { AppleIcon, ArrowRight, GoogleIcon } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const ChangePaymentMethodModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const payDetail = [
    {
      title: "Google Pay",
      img: GoogleIcon,
    },
    {
      title: "Apple Pay",
      img: AppleIcon,
    },
  ];
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] max-w-md p-6 relative">
        <button
          className="absolute top-0 right-2 text-xl text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="mx-2">
          <h2 className="text-[24px] font-[600] leading-[32.4px] text-[#202224] text-center mb-4">
            Change Payment Method
          </h2>

          <div className="space-y-4">
            {payDetail?.map((item, index) => (
              <div
                className="flex items-center justify-between bg-[#03223F0F] p-3  h-[56px] rounded-[12px] cursor-pointer hover:bg-gray-200"
                key={index}
              >
                <div className="flex items-center space-x-3">
                  <img src={item.img} className="w-[20px] h-[20px] " alt="" />
                  <span className="text-[#000000] font-[400] leading-[18px] text-[13px] ">
                    {item.title}
                  </span>
                </div>
                <img src={ArrowRight} className="w-[18px] h-[18px] " alt="" />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <AuthSubmitBtn text={"Save"} handleSubmit={() => onClose()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePaymentMethodModal;
