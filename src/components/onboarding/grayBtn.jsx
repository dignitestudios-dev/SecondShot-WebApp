import React from "react";
import { FiLoader } from "react-icons/fi";

const GrayBtn = ({ text, loading, handleSubmit }) => {
  return (
    <button
      type="submit"
      className={`w-full py-3 h-[49px] px-4 text-sm font-[500] rounded-xl text-gray-600 bg-[#CACACA] hover:bg-opacity-85 `}
      onClick={handleSubmit}
    >
      {text}
      {loading && <FiLoader className="animate-spin text-lg mx-auto" />}
    </button>
  );
};

export default GrayBtn;
