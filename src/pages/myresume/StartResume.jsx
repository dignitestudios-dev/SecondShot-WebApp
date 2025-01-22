import React from "react";
import { empty_img } from "../../assets/export";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import { useNavigate } from "react-router-dom";

const StartResume = () => {
    const navigate =useNavigate()
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="text-center">
        <div className="mb-5">
          <img src={empty_img} alt="Empty" className="mx-auto" />
        </div>
        <div className="font-[500] text-[32px] leading-[43.2px] text-[#000000]">
        Build Your Perfect Resume! Get started crafting a resume <br /> that showcases your skills and achievements.
        </div>
        <div className="flex justify-center">
          <div className=" w-[198px]  mt-5">
            <AuthSubmitBtn text={"Create Resume"} type={"button"} handleSubmit={()=>navigate('/create-resume-info')} />
          </div>
        </div>
        <div className="font-[400] text-[#999999] text-[14px] mt-3 " >Need some inspiration?</div>
      </div>
    </div>
  );
};

export default StartResume;
