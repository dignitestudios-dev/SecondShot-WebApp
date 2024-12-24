import React, { useState } from "react";
import {
  Card1,
  Card2,
  Card3,
  Card4,
  Card5,
  Card6,
  Carriericon1,
  Carriericon2,
  Carriericon3,
  Carriericon4,
  Carriericon5,
  Carriericon6,
} from "../../assets/export";
import { useNavigate } from "react-router-dom";

const CareerToolbox = () => {
  const navigate = useNavigate();

  const CardData = [
    {
      cardicons: Carriericon1,
      bgcolors: "bg-gradient-to-t from-[#25314F] to-[#5470B5]",
      title: "Transferable Skills",
      cardimage: Card1,
      btnBg: "bg-[#FFFFFF1A]",
      para: "Discover the valuable skills you've acquired. Explore how to use them to shape your future and apply them across different areas of your life.",
      path: "/transferablekills",
    },
    {
      cardicons: Carriericon2,
      bgcolors: "bg-gradient-to-b from-[#FF6CAC] to-[#ED3283]",
      title: "Career Recommendation",
      cardimage: Card2,
      btnBg: "bg-[#FFFFFF1A]",
      para: "Take a short assessment to receive recommended careers, sample job descriptions, and recommended pathways to success. You will receive 5 Career matches.",
      path: "/careerrecommendation",
    },
    {
      cardicons: Carriericon4,
      bgcolors: "bg-gradient-to-t from-[#00303A] to-[#3893A7]",
      title: "Goal Setting",
      cardimage: Card3,
      btnBg: "bg-[#FFFFFF1A]",
      para: "Establish a clear action plan to turn your goals into reality. This Goal setting provides focus, drives motivation, keeps you accountable and offers a roadmap for success.",
      path: "/mygoals",
    },
    {
      cardicons: Carriericon3,
      bgcolors: "bg-gradient-to-t from-[#9156A2] to-[#DE6CFF]",
      title: "Resume Builder",
      cardimage: Card4,
      btnBg: "bg-[#FFFFFF1A]",
      para: "Use this template to build your resume and stand out from your competition.",
      path: "/myresume",
    },
    {
      cardicons: Carriericon5,
      bgcolors: "bg-gradient-to-t from-[#5A8D15] to-[#A8EA51]",
      title: "Success Stories",
      cardimage: Card5,
      btnBg: "bg-[#FFFFFF1A]",
      para: "Explore success stories from individuals who have similar experiences and share your interests.",
      path: "/success-story",
    },
    {
      cardicons: Carriericon6,
      bgcolors: "bg-gradient-to-t from-[#D39100] to-[#FFDF9B]",
      title: "My Library",
      cardimage: Card6,
      btnBg: "bg-[#FFFFFF1A]",
      para: "Mark and save your favorite skills and careers for quick reference.",
      path: "/my-library",
    },
  ];

  return (
    <div className="">
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {CardData?.map((item, index) => (
          <div
            key={index}
            className={`${item?.bgcolors} group cursor-pointer w-[380px] h-[438px] rounded-[28px] p-5 mx-auto transition-all duration-500 relative`}
          >
            <div className="flex items-center gap-4 mb-5 group-hover:hidden">
              <div className="bg-white w-[82px] h-[82px] rounded-[20px] p-3">
                <img src={item?.cardicons} alt={item?.title} />
              </div>
              <div className="text-[28px] w-[120px] text-start leading-[33px] font-[600] text-white">
                {item?.title}
              </div>
            </div>

            <div className="rounded-[20px] flex justify-center p overflow-hidden">
              <img
                src={item?.cardimage}
                alt="Card Background"
                className={`${
                  index === 5
                    ? "w-[208.32px] h-[214.04px] group-hover:w-[177px] group-hover:h-[177px]"
                    : "w-[342.63px] h-[218.5px] "
                } transform group-hover:scale-[0.92] group-hover:mt-2  group-hover:translate-y-[-10px] group-hover:h-[177px] group-hover:w-[230.51px] transition-all duration-700 ease-in-out`}
              />
            </div>

            <div className="text-[20px] text-center font-[500] leading-[27px] tracking-[0.41px] text-[#FFFFFF] hidden group-hover:block transition-opacity duration-1000">
              {item?.para}
            </div>

            <div
              className={`${item?.btnBg} flex w-[330px] justify-center items-center text-white h-[49px] rounded-[12px] text-[18px] uppercase tracking-[0.41px] font-[600] text-center mt-auto absolute bottom-5 left-0 right-0 mx-auto`}
              onClick={() => navigate(item?.path)}
            >
              Launch
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerToolbox;
