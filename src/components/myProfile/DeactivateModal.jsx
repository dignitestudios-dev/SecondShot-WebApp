import React from "react";
import AuthInput from "../onboarding/AuthInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const DeactivateModal = ({ onClose, handleClick, loader }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-[461px] max-w-md p-6 relative">
        <button
          className="absolute -top-1 right-2 text-black text-2xl hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-[24px] mt-3 mb-1 font-semibold text-center text-[#202224]">
          Delete Account
        </h2>
        <p className="text-center mb-4 text-[16px] text-black">
          Are you sure you want to permanently delete your account? This action
          cannot be undone, and you will lose all data associated with your
          account. If you change your mind, you will not be able to reactivate
          your account.
        </p>

        <div className="flex  justify-between items-center">
          <div className="mt-3 w-[190px]" onClick={onClose}>
            <button className="w-full bg-gray-400 h-[49px] text-white p-3 text-center rounded-[12px] font-[500] leading-[21.6px]  text-[16px] font- ">
              <div className="flex  items-center justify-center">
                <span className="mr-1">No</span>
              </div>
            </button>
          </div>
          <div className="mt-3 w-[190px]">
            <AuthSubmitBtn
              text={"Yes"}
              handleSubmit={handleClick}
              loading={loader}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeactivateModal;
