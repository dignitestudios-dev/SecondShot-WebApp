import React from "react";
import {
  Carriericon1,
  Carriericon2,
  Carriericon3,
  Carriericon4,
  Carriericon5,
  Carriericon6,
} from "../../assets/export";

const ToolboxSection = () => {
  const cards = [
    {
      imgcard: Carriericon1,
      title: "Transferable Skills",
      description:
        "Identify the skills where you excel and demonstrate strength.",
      gradient: "bg-gradient-to-r from-[#25314F] to-[#5470B5]",
    },
    {
      imgcard: Carriericon2,
      title: "Career Recommendations",
      description: "Discover careers that align with your skills.",
      gradient: "bg-gradient-to-r from-[#ED3283] to-[#FF6CAC]",
    },
    {
      imgcard: Carriericon3,
      title: "Resume Builder",
      description: "Create your resume in minutes!",
      gradient: "bg-gradient-to-r from-[#9156A2] to-[#DE6CFF]",
    },
    {
      imgcard: Carriericon4,
      title: "Goal Setting",
      description: "Plan your goals to set you up for success!",
      gradient: "bg-gradient-to-r from-[#00303A] to-[#3893A7]",
    },
    {
      imgcard: Carriericon5,
      title: "Success Stories",
      description: "Learn from those who have walked a similar path as you.",
      gradient: "bg-gradient-to-r from-[#5A8D15] to-[#A8EA51]",
    },
    {
      imgcard: Carriericon6,
      title: "Personal Plan",
      description: "Save your favorite careers and skills in your library.",
      gradient: "bg-gradient-to-r from-[#D39100] to-[#FFDF9B]",
    },
  ];

  return (
    <div className="text-white p-8 space-y-6 ">
      <h1 className="text-[30px] lg:text-[41px] font-[600] leading-[54.94px]">
        Your <span className="text-[#56EC17]"> Career Prep Toolbox</span>
      </h1>
      <p className="text-[20px] lg:text-[24px] font-[400] leading-[34.44px] capitalize">
        Discover your strengths and unlock New Opportunities awaiting for you
        within your career Prep toolbox.
      </p>

      <div className="opacity-[20%]">
        <hr className="bg-[#FFFFFF] mt-11 mb-11" />
      </div>
      <div className="text-[26px] lg:text-[32px] font-[600] leading-[42.88px] ">
        What's Inside
        <br />
        Your <span className="text-[#56EC17]"> Career Prep Toolbox</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.gradient} w-[178px] h-[208px]  rounded-[24px] p-4 shadow-md space-y-2`}
          >
            <div className="bg-white shadow-lg flex items-center justify-center w-[53px] h-[53px] rounded-[12px] ">
              <img src={card?.imgcard} className="h-[32px] w-[37px] " alt="" />
            </div>
            <h3 className="font-[600] text-[16px] leading-[18.24px] ">
              {card?.title}
            </h3>
            <p className="text-[15px] leading-[17.1px] font-[500] ">
              {card?.description}
            </p>
          </div>
        ))}
      </div>
      <p className="capitalize text-end text-md font-semibold text-gray-300 italic">
       and more...
      </p>
    </div>
  );
};

export default ToolboxSection;
