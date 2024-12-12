import React from "react";
import AuthInput from "../onboarding/AuthInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const DeactivateModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-[461px] h-[339px] max-w-md p-6 relative">
        <button
          className="absolute -top-1 right-2 text-black text-2xl hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-[24px] mt-3 mb-1 font-semibold text-center text-[#202224]">
          Deactivate Account
        </h2>
        <p className="text-center mb-4 text[16px] text-[#9A9A9A]">
          Are you sure you want to deactivate your account? This will
          temporarily suspend your access. You can reactivate anytime by logging
          back in. Contact support for assistance.
        </p>
        <div className="space-y-4">
          <AuthInput placeholder={"Confirm Password"} type={"password"} />
        </div>
        <div className="mt-3">
          <AuthSubmitBtn text={"Deactivate"} />
        </div>
      </div>
    </div>
  );
};

export default DeactivateModal;
