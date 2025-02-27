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
  homelock,
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
      btn: "Launch",
    },
    {
      cardicons: Carriericon2,
      bgcolors: "bg-gradient-to-b from-[#FF6CAC] to-[#ED3283]",
      title: "Career Recommendation",
      cardimage: Card2,
      btnBg: isFirst.recommendation === true ? "bg-gray-400" : "bg-[#FFFFFF1A]",
      para: "Take a short assessment to receive recommended careers, sample job descriptions, and recommended pathways to success. You will receive 5 career matches.",
      path: "/careerrecommendation",
      btn: subscriptionpaid === false ? "Unlock" : "Launch",
    },
    {
      cardicons: Carriericon3,
      bgcolors: "bg-gradient-to-t from-[#9156A2] to-[#DE6CFF]",
      title: "Resume Builder",
      cardimage: Card3,
      btnBg: isFirst.myresume === true ? "bg-gray-400" : "bg-[#FFFFFF1A]",
      para: "Use this template to build your resume and stand out from your competition.",
      path: "/myresume",
      btn: subscriptionpaid === false ? "Unlock" : "Launch",
    },
    {
      cardicons: Carriericon4,
      bgcolors: "bg-gradient-to-t from-[#00303A] to-[#3893A7]",
      title: "Goal Setting",
      cardimage: Card4,
      btnBg: isFirst.mygoals === true ? "bg-gray-400" : "bg-[#FFFFFF1A]",
      para: "Establish a clear action plan to turn your goals into reality. This goal setting provides focus, drives motivation, keeps you accountable and offers a roadmap for success.",
      path: "/mygoals",
      btn: subscriptionpaid === false ? "Unlock" : "Launch",
    },

    {
      cardicons: Carriericon5,
      bgcolors: "bg-gradient-to-t from-[#5A8D15] to-[#A8EA51]",
      title: "Success Stories",
      cardimage: Card5,
      btnBg: isFirst.successstory === true ? "bg-gray-400" : "bg-[#FFFFFF1A]",
      para: "Explore success stories from individuals who have similar experiences and share your interests.",
      path: "/success-story",
      btn: subscriptionpaid === false ? "Unlock" : "Launch",
    },
    {
      cardicons: Carriericon6,
      bgcolors: "bg-gradient-to-t from-[#D39100] to-[#FFDF9B]",
      title: "My Library",
      cardimage: Card6,
      btnBg: isFirst.mylibrary === true ? "bg-gray-400" : "bg-[#FFFFFF1A]",
      para: "Mark and save your favorite skills and careers for quick reference.",
      path: "/my-library",
      btn: subscriptionpaid === false ? "Unlock" : "Launch",
    },
  ];
  const handleNavigation = (item) => {
    if (!subscriptionpaid && item.title !== "Transferable Skills") {
      setLock(true);
      return;
    }

    if (item.title === "Transferable Skills") {
      setIsFirst((prev) => ({ ...prev, transferable: true }));
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
              {item.btn === "Unlock" && (
                <div>
                  <img src={homelock} className="w-[33.5px]" alt="" />
                </div>
              )}
              <div className={`text-[18px]`}>
                {subscriptionpaid ? item.btn : item.btn}
              </div>
            </div>
          </div>
        ))}

        <LockModal
          isOpen={lock}
          handleClick={() => navigate("/subscriptionplans")}
          onClose={() => setLock(false)}
        />
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[commingsoon1, commingsoon2, commingsoon3]?.map((item, index) => (
          <div
            className={`group cursor-pointer w-[420px] h-[438px] rounded-[28px] p-5 mx-auto transition-all duration-500 relative`}
          >
            <img
              src={item}
              alt="Coming Soon"
              className=" lg:w-[580px] h-[438px] "
            />
          </div>
        ))}

      </div>
        <LockModal
          isOpen={lock}
          handleClick={() => navigate("/subscriptionplans")}
          onClose={() => setLock(false)}
        />
    </div>
  );
};

export default CareerToolbox;
