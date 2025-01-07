import React from "react";
import { empty_img } from "../../assets/export";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import { useNavigate } from "react-router-dom";

const MyRecommedation = () => {
    const navigate =useNavigate()
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="text-center">
        <div className="mb-5">
          <img src={empty_img} alt="Empty" className="mx-auto" />
        </div>
        <div className="font-[500] text-[32px] leading-[43.2px] text-[#000000]">
          Discover Your Career Path! Take the assessment <br /> and explore
          careers to find your perfect fit.
        </div>
        <div className="flex justify-center">
          <div className=" w-[198px]  mt-5">
            <AuthSubmitBtn text={"Start Assessment"} type={"button"} handleSubmit={()=>navigate('/start-assesment')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecommedation;
