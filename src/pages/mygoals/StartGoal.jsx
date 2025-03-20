import React from "react";
import { empty_img } from "../../assets/export";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import { useNavigate } from "react-router-dom";

const StartGoal = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="text-center">
        <div className="mb-5">
          <img src={empty_img} alt="Empty" className="mx-auto" />
        </div>
        <div className="font-[500] text-[32px] leading-[43.2px] text-[#000000]">
          Let's Set Your Goals! Define your career aspirations and <br /> keep
          them on track with our goal setting tools.
        </div>
        <div className="flex justify-center">
          <div className=" w-[198px]  mt-5">
            <AuthSubmitBtn
              text={"Create Goal"}
              type={"button"}
              handleSubmit={() => navigate("/create-goals")}
            />
          </div>
        </div>
        <div className="font-[400] text-[#999999] text-[14px] mt-3 ">
         
        </div>
      </div>
    </div>
  );
};

export default StartGoal;
