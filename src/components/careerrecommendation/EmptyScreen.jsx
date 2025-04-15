import React from "react";
import { empty_img } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { useNavigate } from "react-router-dom";

const EmptyScreen = ({ text }) => {
    const navigate =useNavigate()
  return (
    <div className="">
      <div className="text-center">
        <div className="mb-5">
          <img src={empty_img} alt="Empty" className="mx-auto" />
        </div>
        <div className="font-[500] text-[32px] leading-[43.2px] text-[#000000]">
          Discover Your Career Path! Take the assessment <br /> and explore
          careers to find your perfect fit.
        </div>
        <div className="flex justify-center items-center mt-2">
          <div className="w-[198px]">
            <AuthSubmitBtn text={"Take Assessment"} handleSubmit={()=>navigate('/start-assesment')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyScreen;
