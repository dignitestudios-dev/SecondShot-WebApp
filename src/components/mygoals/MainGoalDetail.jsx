import React from "react";
import { PiPencilLine } from "react-icons/pi";

const MainGoalDetail = () => {
  const datamaingoal = [
    {
      title: "Title",
      para: "Digital Marketing Course",
    },
    {
      title: "Description",
      para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Specific",
      para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Measurable",
      para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Achievable",
      para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Relevant",
      para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Time-Bound",
      para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];
  return (
    <div>
      <div className="w-[575px] space-y-6">
        <div className="bg-white  h-[732px] overflow-y-auto rounded-[22px] p-6  ">
          <h2 className="text-[24px] font-[500] leading-[32.4px] mb-2">
            Main Goal Details
          </h2>

          <button className="absolute top-4 right-4 p-2 w-10 h-10 bg-[#012C57] text-white rounded-md">
            <PiPencilLine size={24} />
          </button>

          <div className="mt-6">
            <div className="space-y-6">
              {datamaingoal.map((item, index) => (
                <div key={index} className="">
                  <div className="text-[#222222]  ">
                    <span className="block text-[16px] font-[600] leading-[21.6px] ">
                      {item.title}
                    </span>
                  </div>
                  <div className="text-[#000000] text-[14px] leading-[18.9px] mb-2 pb-2 border-b border-b-gray-400">
                    {item.para}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 text-gray-700">
              <div className="flex justify-between w-full">
                <p className="text-[16px] text-[#222222] font-[400] ">
                  Deadline for Sub-goals:
                </p>
                <p className="font-[600] text-[16px] text-[#012C57] mb-4">
                  23/Mar/2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainGoalDetail;
