import React from "react";
import { FiLoader } from "react-icons/fi";

const AuthSubmitBtn = ({ text, loading, handleSubmit, type }) => {
  return (
    <button
      type={type}
      className="w-full bg-grad-button h-[49px] text-white p-3 text-center rounded-[12px] font-[500] leading-[21.6px]  text-[16px] font- "
      onClick={handleSubmit}
    >
      {text}
      {loading && <FiLoader className="animate-spin text-lg mx-auto" />}
    </button>
  );
};

export default AuthSubmitBtn;
