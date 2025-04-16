import React, { useContext, useState } from "react";
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
  commingsoon1,
  commingsoon2,
  commingsoon3,
  Comunityser,
  Comunityservice,
  Entrepreneurship,
  Entrepreneurshipicon,
  homelock,
  Mockicon,
  MockInterview,
} from "../../assets/export";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../context/GlobalContext";
import { AuthContext } from "../../context/AuthContext";
import LockModal from "./LockModal";

const CareerToolbox = () => {
  const navigate = useNavigate();
  const { showModal, closeModal, isFirst, setIsFirst } =
    useContext(ModalContext);

  const [lock, setLock] = useState(false);

  const { subscriptionpaid } = useContext(AuthContext);

  const CardData = [
    {
      cardicons: Carriericon1,
      bgcolors: "bg-gradient-to-t from-[#25314F] to-[#5470B5]",
      title: "Transferable Skills",
      cardimage: Card1,
      btnBg: isFirst.transferable === true ? "bg-gray-400" : "bg-[#FFFFFF1A]",
      para: "Discover the valuable skills you've acquired. Explore how to use them to shape your future and apply them across different areas of your life.",
      path: "/transferablekills",
      btn: isFirst.transferable === false ? "Launch" : "Unlock",
    },
    {
      cardicons: Carriericon2,
      bgcolors: "bg-gradient-to-b from-[#FF6CAC] to-[#ED3283]",
      title: "Career Recommendation",
      cardimage: Card2,
      btnBg: isFirst.recommendation === true ? "bg-gray-400" : "bg-[#FFFFFF1A]",
      para: "Take a short assessment to receive recommended careers, sample job descriptions, and recommended pathways to success. You will receive 5 career matches.",
      path: "/careerrecommendation",
      btn: !isFirst.recommendation && subscriptionpaid ? "Launch" : "Unlock",
    },
    {
      cardicons: Carriericon3,
      bgcolors: "bg-gradient-to-t from-[#9156A2] to-[#DE6CFF]",
      title: "Resume Builder",
      cardimage: Card3,
      btnBg: isFirst.myresume === true ? "bg-gray-400" : "bg-[#FFFFFF1A]",
      para: "Use this template to build your resume and stand out from your competition.",
      path: "/myresume",
      btn: !isFirst.myresume && subscriptionpaid ? "Launch" : "Unlock",
    },
    {
      cardicons: Carriericon4,
      bgcolors: "bg-gradient-to-t from-[#00303A] to-[#3893A7]",
      title: "Goal Setting",
      cardimage: Card4,
      btnBg: isFirst.mygoals === true ? "bg-gray-400" : "bg-[#FFFFFF1A]",
      para: "Establish a clear action plan to turn your goals into reality. This goal setting provides focus, drives motivation, keeps you accountable and offers a roadmap for success.",
      path: "/mygoals",
      btn: !isFirst.mygoals && subscriptionpaid ? "Launch" : "Unlock",
    },

    {
      cardicons: Carriericon5,
      bgcolors: "bg-gradient-to-t from-[#5A8D15] to-[#A8EA51]",
      title: "Success Stories",
      cardimage: Card5,
      btnBg: isFirst.successstory === true ? "bg-gray-400" : "bg-[#FFFFFF1A]",
      para: "Explore success stories from individuals who have similar experiences and share your interests.",
      path: "/success-story",
      btn: !isFirst.successstory && subscriptionpaid ? "Launch" : "Unlock",
    },
    {
      cardicons: Carriericon6,
      bgcolors: "bg-gradient-to-t from-[#D39100] to-[#FFDF9B]",
      title: "My Library",
      cardimage: Card6,
      btnBg: isFirst.mylibrary === true ? "bg-gray-400" : "bg-[#FFFFFF1A]",
      para: "Mark and save your favorite skills and careers for quick reference.",
      path: "/my-library",
      btn: !isFirst.mylibrary && subscriptionpaid ? "Launch" : "Unlock",
    },
    {
      cardicons: Comunityser,
      bgcolors: "bg-gradient-to-b from-[#f68a20] to-[#f36c28]",
      title: "Branding / NIL",
      cardimage: Comunityservice,
      btnBg: "bg-[#FFFFFF1A]",
      para: "",
      btn: "coming  Soon",
    },
    {
      cardicons: Mockicon,
      bgcolors: "bg-gradient-to-t from-[#b11f2b] to-[#e91f25]",
      title: "Mock Interview",
      cardimage: MockInterview,
      btnBg: "bg-[#FFFFFF1A]",
      para: "",
      btn: "coming  Soon",
    },
    {
      cardicons: Entrepreneurshipicon,
      bgcolors: "bg-gradient-to-t from-[#99227b] to-[#9c206f]",
      title: "Enterpreneurship",
      cardimage: Entrepreneurship,
      btnBg: "bg-[#FFFFFF1A]",
      para: "",
      btn: "coming  Soon",
    },
  ];
  const handleNavigation = (item) => {
    if (!subscriptionpaid && item.title !== "Transferable Skills") {
      setLock(true);
      return;
    }

    if (item.title === "Transferable Skills") {
      setIsFirst((prev) => ({ ...prev, transferable: false }));
    }

    navigate(item.path);
  };

  return (
    <div className="">
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {CardData?.map((item, index) => (
          <div
            key={index}
            className={`${item?.bgcolors} group cursor-pointer w-[380px] h-[438px] rounded-[28px] p-5 mx-auto transition-all duration-500 relative`}
          >
            <div className="flex items-center gap-4 mb-5 group-hover:hidden">
              <div className="bg-white w-[82px] flex justify-center items-center h-[82px] rounded-[20px] ">
                <img
                  src={item?.cardicons}
                  alt={item?.title}
                  className="w-[60px] object-contain h-[60px] "
                />
              </div>
              <div className="text-[24px] w-[120px] text-start  uppercase leading-[33px] font-[600] text-white">
                {item?.title}
              </div>
            </div>

            <div className="rounded-[20px] flex justify-center p overflow-hidden">
              <img
                src={item?.cardimage}
                alt="Card Background"
                className={`${
                  index === 5
                    ? "w-[208.32px] h-[214.04px] group-hover:custom-hover"
                    : "w-[342.63px] h-[218.5px] "
                } transform group-hover:scale-[0.92] group-hover:mt-2  group-hover:translate-y-[-10px] group-hover:h-[177px] group-hover:w-[230.51px] transition-all duration-700 ease-in-out`}
              />
            </div>

            <div className="text-[20px] text-center font-[500] leading-[27px] tracking-[0.41px] text-[#FFFFFF] hidden group-hover:block transition-opacity duration-1000">
              {item?.para}
            </div>

            <div
              className={`${item?.btnBg} flex w-[330px] justify-center items-center text-white h-[49px] rounded-[12px]  uppercase tracking-[0.41px] font-[600] text-center mt-auto absolute bottom-5 left-0 right-0 mx-auto`}
              onClick={() => handleNavigation(item)}
            >
              {item?.btn === "Unlock" && (
                <div>
                  <img src={homelock} className="w-[33.5px]" alt="" />
                </div>
              )}
              <div className={`text-[18px]`}>
                {subscriptionpaid ? item?.btn : item?.btn}
              </div>
            </div>
          </div>
        ))}

        <LockModal
          isOpen={lock}
          handleClick={() => navigate("/subscriptionplans")}
          onClose={() => setLock(false)}
          text={
            "Buy a subscription to unlock this feature and access all of the modules."
          }
        />
      </div>
    </div>
  );
};

export default CareerToolbox;
