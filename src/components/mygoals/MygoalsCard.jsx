import React from "react";
import { Dotedimg } from "../../assets/export";
import { useNavigate } from "react-router-dom";

const MygoalsCard = () => {
  const MyGoalsData = [
    {
      badge: "Completed",
      heading: "Digital Marketing Course",
      para: "Increase my average test score in Algebra from 80% to 90% by consistently studying and completing assignments.",
      tags: ["Specific", "Measurable", "Achievable", "Relevant"],
      bgCardColor: "bg-[#D4F6ED]",
      badgeColor: "text-[#36B8F3]",
    },
    {
      badge: "Not Started yet",
      heading: "Digital Marketing Course",
      para: "Increase my average test score in Algebra from 80% to 90% by consistently studying and completing assignments.",
      tags: ["Specific", "Measurable", "Achievable", "Relevant"],
      bgCardColor: "bg-[#f0340040]",
      badgeColor: "text-[#f01800]",
    },
    {
      badge: "In Progress",
      heading: "Digital Marketing Course",
      para: "Increase my average test score in Algebra from 80% to 90% by consistently studying and completing assignments.",
      tags: ["Specific", "Measurable", "Achievable", "Relevant"],
      bgCardColor: "bg-[#F0C00042]",
      badgeColor: "text-[#F0C000]",
    },
   
    {
      badge: "Completed",
      heading: "Digital Marketing Course",
      para: "Increase my average test score in Algebra from 80% to 90% by consistently studying and completing assignments.",
      tags: ["Specific", "Measurable", "Achievable", "Relevant"],
      bgCardColor: "bg-[#D4F6ED]",
      badgeColor: "text-[#36B8F3]",
    },
    {
      badge: "Not Started yet",
      heading: "Digital Marketing Course",
      para: "Increase my average test score in Algebra from 80% to 90% by consistently studying and completing assignments.",
      tags: ["Specific", "Measurable", "Achievable", "Relevant"],
      bgCardColor: "bg-[#f0340040]",
      badgeColor: "text-[#f01800]",
    },
    {
      badge: "In Progress",
      heading: "Digital Marketing Course",
      para: "Increase my average test score in Algebra from 80% to 90% by consistently studying and completing assignments.",
      tags: ["Specific", "Measurable", "Achievable", "Relevant"],
      bgCardColor: "bg-[#F0C00042]",
      badgeColor: "text-[#F0C000]",
    },
   
  ];
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MyGoalsData?.map((item, index) => (
          <div
            className="bg-white rounded-2xl border border-gray-200 p-2"
            key={index}
          >
            <div
              className={`p-6 rounded-[22px]  relative ${item?.bgCardColor}`}
            >
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`leading-[39px] h-[39px] w-[120px] text-center rounded-full text-[14px] font-[500] bg-white ${item?.badgeColor}`}
                >
                  {item.badge}
                </span>
                {/* <div className="bg-white w-[32px] h-[32px] flex justify-center items-center  rounded-[25px] cursor-pointer">
                  <img src={Dotedimg} className="w-[18px]  " alt="" />
                </div> */}
              </div>
              {/* <h3 className="text-[20px] leading-[32.4px] font-[500] text-gray-800 mb-2">
                {item.heading}
              </h3> */}
              <p className="text-md text-gray-600 font-[500] mb-4">{item.para}</p>
              {/* <div className="grid grid-cols-3 gap-2 mb-4">
                {item?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="leading-[43px] text-center h-[43px] text-[14px] font-[400] text-[#000000] border border-gray-400 rounded-full bg-transparent"
                  >
                    {tag}
                  </span>
                ))}
              </div> */}
            </div>
            <div className="flex justify-between items-start text-sm text-black mt-6 pb-3 pr-3">
              <div className="flex flex-col">
                <span className="bg-white p-1 rounded-md font-[500] px-6 text-lg">
                  Deadline
                </span>
                <span className="bg-white p-1 px-6 text-[#00000070] rounded-md mt-[-2px]">
                  July 01, 2024 | Sept 01, 2024
                </span>
              </div>
              <button
                onClick={() => navigate("/goal-detail")}
                className="px-4 py-2 text-sm font-[500] text-[#012C57] bg-gray-200 border border-gray-300 rounded-lg mt-3"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MygoalsCard;
