import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Backbutton from "../../components/Global/Backbutton";
import { Creategoalimg } from "../../assets/export";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import CreateGoalModal from "../../components/mygoals/CreateGoalModal";
import { ModalContext } from "../../context/GlobalContext";
import MakeitSmartModal from "../../components/mygoals/MakeitSmartModal";

const AddGoals = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {};
  // const { showModal, setShowModal } = useContext(ModalContext);
  const [showModal, setShowModal] = useState(false);

  const [smartModal, setSmartModal] = useState(false);
  const handleModal = () => {
    setShowModal(!showModal);
  };
  const location = useLocation();
  const modalopen = location?.state?.modalopen;
  console.log(modalopen, "modalopen");

  useEffect(() => {
    setSmartModal(modalopen);
  }, [modalopen]);
  return (
    <div className="max-w-screen-xl min-h-screen mx-auto p-8">
      <Backbutton />
      <CreateGoalModal
        showModal={showModal}
        handleClick={handleModal}
        setShowModal={setShowModal}
        handleClose={() => navigate("/review-goals")}
      />
      <MakeitSmartModal
        showModal={smartModal}
        handleClick={() => setSmartModal(false)}
        handleClose={() => navigate("/review-goals")}
      />
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-[32px] text-left leading-[43.2px] font-[500] text-[#000000]">
          Create Your Goal
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
        <div className="bg-gradient-to-r from-[#061523] to-[#012C57] rounded-2xl p-6 text-white ">
          <p className="text-lg font-semibold">
            Identify a goal you would like to achieve.
          </p>
          <p className="text-[22px] text-gray-400 my-7">
            <span className="font-medium text-md text-white">Option 1:</span>{" "}
            You have the option to refine your goal by making it a S.M.A.R.T.
            Goal.
          </p>
          <div className="my-7">
            <hr className="h-px my-1 w-full bg-slate-50 border-0 opacity-10" />
          </div>
          <p className="text-[22px] text-gray-400">
            <span className="font-medium text-md text-white">Option 2:</span>{" "}
            You have the option to break your main goal into sub goals. Sub
            goals are small achievable action items.
          </p>
          <div className="my-4">
            <hr className="h-px my-1 w-full bg-slate-50 border-0 opacity-10" />
          </div>
          <p className="text-[22px] text-gray-400 mb-2">
            <span className="font-medium text-md text-white">Option 3:</span>{" "}
            You can add up to 2 people to help keep you accountable to your
            goals. Your goals will be emailed to them. Think about who in your
            support network can help you with these goals. It can be your
            parent, mentor, coach, boss etc.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 text-black ">
          <div className="w-422px">
            <p className="text-[32px] font-[500] leading-[43.2px] capitalize ">
              Click the button below to add your goal
            </p>
          </div>
          <div className="flex  mt-4">
            <div className="w-[258px] text-nowrap">
              <AuthSubmitBtn
                text={"Create Goal"}
                handleSubmit={() => handleModal()}
              />
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
