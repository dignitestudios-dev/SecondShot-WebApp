import React, { useState } from "react";
import Backbutton from "../../components/Global/Backbutton";
import SubGoals from "../../components/mygoals/SubGoals";
import { Dottedvertical } from "../../assets/export";
import SupportPeople from "../../components/mygoals/SupportPeople";
import GoalCreatedModal from "../../components/mygoals/GoalCreatedModal";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import AddSupportModal from "../../components/myresume/AddSupportModal";
import DeleteGoalModal from "../../components/mygoals/DeleteGoalModal";

const GoalDetail = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [goalDetailModal, setGoalDetailModal] = useState(false);
  const [supportModal, setSupportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <div>
      <Backbutton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          Finalized Goal Statement
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
          <button className="bg-[#FFFCF2] bg-opacity-35 text-[#F0C000] px-4 py-2 rounded-md border border-[#F0C000]">
            Pending
          </button>
          <div>
            <AuthSubmitBtn
              text={"Mark As Completed"}
              handleSubmit={() => setGoalDetailModal(true)}
            />
          </div>

          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="relative flex     flex-col justify-start items-start"
          >
            <img src={Dottedvertical} className="w-[20px] h-[20px] " alt="" />

            {dropdownOpen && (
              <div className=" absolute top-12 bg-white z-[5000] border rounded-lg shadow-lg mt-2 p-2  right-0 w-64 text-left">
                <ul>
                  <li
                    className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                    onClick={() => setSupportModal(true)}
                  >
                    Add Support Network
                  </li>
                  <li
                    className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </button>
        </div>
      </div>
      <div className="flex mt-4 justify-between">
        <div>
          <input
            type="checkbox"
            id="custom-checkbox"
            className="h-5 w-5 rounded-md border border-gray-300 bg-white checked:bg-[#012C57] checked:border-[#012C57] appearance-none cursor-pointer 
  checked:before:block checked:before:content-['✓'] checked:before:text-white checked:before:text-sm text-center 
 checked:before:justify-center checked:before:items-center"
            onClick={() => setGoalDetailModal(true)}
          />
        </div>
        <p className=" text-[#000000] font-[400] text-[16px] leading-[21.6px] px-2 ">
          Lorem ipsum dolor sit amet consectetur. malesuada dolor diam Vitae
          facilisis nulla id dignissim erat arcu pretium. Proin sed curabitur id
          aenean. Nulla nunc tristique sit tortor euismod quis est ut. Erat nisi
          scelerisque a porta ullamcorper lectus phasellus tortor. Eu non cursus
          adipiscing.
        </p>
      </div>

      <GoalCreatedModal
        showModal={goalDetailModal}
        handleClick={() => setGoalDetailModal(false)}
        heading={"Congratulations"}
        para={"Goal Successfully Completed."}
        onclick={() => setGoalDetailModal(false)}
      />

      <SubGoals />
      <SupportPeople />
      <AddSupportModal
        showModal={supportModal}
        handleClick={() => setSupportModal(false)}
      />
      <DeleteGoalModal
        showModal={showDeleteModal}
        onclick={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default GoalDetail;
