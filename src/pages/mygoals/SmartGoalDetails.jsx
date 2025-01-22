import React, { useState } from "react";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import DetailCards from "../../components/mygoals/DetailCards";
import Backbutton from "../../components/Global/Backbutton";
import SubGoals from "../../components/mygoals/SubGoals";
import { Dottedvertical } from "../../assets/export";
import SupportPeople from "../../components/mygoals/SupportPeople";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";

const SmartGoalDetails = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div>
      <Backbutton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          Smart Goal Details
        </h1>
        <div className="flex space-x-4 items-center">
          <div className="text-center">
            <span className="text-[#000000] text-[18px] block text-left font-[500] ">
              Deadline
            </span>
            <span className="text-[#00000070] font-[500] text-[14px]">
              July 01, 2024 | Sept 01, 2024
            </span>
          </div>
          <button className="bg-[#EAF8FF] bg-opacity-35 text-[#36B8F3] px-4 py-2 rounded-md border border-[#36B8F3]">
            In Progress
          </button>
          {/* <div className="w-[198px]">
            <AuthSubmitBtn text={" Mark As Completed"} />
          </div> */}

          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="relative flex flex-col justify-start items-start"
          >
            <img src={Dottedvertical} className="w-[20px] h-[20px] " alt="" />

            {dropdownOpen && (
              <div className=" absolute top-12 bg-white z-[5000] border rounded-lg shadow-lg mt-2 p-2  right-0 w-64 text-left">
                <ul>
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Add Support Network
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </button>
        </div>
      </div>
      <DetailCards />
      <SubGoals />
      <SupportPeople />
    </div>
  );
};

export default SmartGoalDetails;
