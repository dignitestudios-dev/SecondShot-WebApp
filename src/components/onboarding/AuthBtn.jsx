import React from "react";
import { FiLoader } from "react-icons/fi";

const AuthSubmitBtn = ({ text, loading, handleSubmit, type, disabled }) => {
  return (
    <button
      type={type}
      className={`w-full h-[49px] text-white p-3 text-center rounded-[12px] font-[500] leading-[21.6px] text-[16px] ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-grad-button"
      }`}
      onClick={handleSubmit}
      disabled={disabled}
    >
      <div className="flex items-center justify-center">
        <span className="mr-1">{text}</span>
        {loading && <FiLoader className="animate-spin text-lg" />}
      </div>
    </button>
  );
};

export default AuthSubmitBtn;
