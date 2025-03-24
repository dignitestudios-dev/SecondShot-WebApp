import React from "react";
import { empty_img } from "../../assets/export";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import { useNavigate } from "react-router-dom";

const StartResume = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="text-center">
        <div className="mb-5">
          <img src={empty_img} alt="Empty" className="mx-auto" />
        </div>
        <div className="font-[500] text-[32px] leading-[43.2px] text-[#000000]">
          The Resume Builder will prompt you with questions to build your
          resume. All you have to do is answer the questions that the resume
          builder will format your resume for you.
        </div>
        <div className="flex justify-center">
          <div className=" w-[198px]  mt-5">
            <AuthSubmitBtn
              text={"Create Resume"}
              type={"button"}
              handleSubmit={() => navigate("/create-resume-info")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartResume;
