import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Backbutton from "../../components/Global/Backbutton";
import { Creategoalimg } from "../../assets/export";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import CreateGoalModal from "../../components/mygoals/CreateGoalModal";

const AddGoals = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {};

  // For Modal
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="max-w-screen-xl min-h-screen mx-auto p-8">
      <Backbutton />
      <CreateGoalModal showModal={showModal} handleClick={handleModal} />
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-[32px] text-left leading-[43.2px] font-[500] text-[#000000]">
          Create Goals
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
        <div className="bg-gradient-to-r from-[#061523] to-[#012C57] rounded-2xl p-6 text-white ">
          <h2 className="text-[20px] font-[500] leading-[27px] ">Main Goal</h2>
          <p className="text-[16px] leading-[22.96px] mt-3 font-[400] text-[#FFFFFF80] ">
            The main goal is the primary objective or target that an individual,
            group, organization, or project aims to achieve.
          </p>
          <div className="my-7">
            <hr className="h-px my-1 w-full bg-slate-50 border-0 opacity-10" />
          </div>
          <h2 className="text-[20px] font-[500] leading-[27px] ">Sub Goals </h2>
          <p className="text-[16px] leading-[22.96px] mt-3 font-[400] text-[#FFFFFF80] ">
            Sub-goals are used to  break down the main goal into smaller, more
            manageable tasks or milestones. Sub-goals help users track progress,
            stay motivated, and maintain focus by providing clear steps toward
            achieving the main goal.
          </p>
          <div className="my-7">
            <hr className="h-px my-1 w-full bg-slate-50 border-0 opacity-10" />
          </div>
          <h2 className="text-[20px] font-[500] leading-[27px] ">
            Make It Smart{" "}
          </h2>
          <p className="text-[16px] leading-[22.96px] mt-3 font-[400] text-[#FFFFFF80] ">
            SMART is an acronym that stands for Specific, Measurable,
            Achievable, Relevant, and Time-bound. By setting SMART goals, you
            can clarify your objectives, track your progress, stay motivated,
            and ultimately reach your desired outcomes.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 text-black ">
          <div className="w-422px">
            <p className="text-[32px] font-[500] leading-[43.2px] capitalize ">
              You can create up to three Smart goals at a time
            </p>
          </div>
          <div className="flex  mt-4">
            <div className="w-[258px] text-nowrap">
              <AuthSubmitBtn text={"Create Goals"} handleSubmit={()=>handleModal()} />
            </div>
            <div className="">
              <img
                src={Creategoalimg}
                alt="logo"
                className="object-cover w-[447px] h-[337.75px] "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGoals;
