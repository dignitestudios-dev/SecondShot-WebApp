import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Backbutton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center gap-1 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
        <div>
          <IoIosArrowBack className="font-[600]" onClick={() => navigate(-1)} />
        </div>
        <div onClick={() => navigate(-1)}>BACK</div>
      </div>
    </div>
  );
};

export default Backbutton;
