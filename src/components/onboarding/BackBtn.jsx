import React from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const BackBtn = ({ handleClick, type }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full flex justify-center items-center gap-1 cursor-pointer"
    >
      <IoIosArrowDropleftCircle className="text-lg text-blue-950" />
      <p className="text-[12px] uppercase font-bold leading-none  text-blue-950 ">
        Back
      </p>
    </button>
  );
};

export default BackBtn;
