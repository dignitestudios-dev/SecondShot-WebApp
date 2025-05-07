import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Assesmentmodal, SubmitGoalimg } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import AddSupportModal from "../myresume/AddSupportModal";
import GoalCreatedModal from "./GoalCreatedModal";
import { FiLoader } from "react-icons/fi";

const GoalCompletedModal = ({
  showModal,
  onclick,
  onClose,
  handleClick,
  handlecreategoal,
  loader,
  setShowModalsupport,
}) => {
  const navigate = useNavigate();

  const [showModalsupport, setShowModalSupport] = useState(false);
  const [goalDetailModal, setGoalDetailModal] = useState(false);
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm ">
          <div className="bg-white z rounded-xl shadow-custom-shadow w-[500px] p-4 relative">
            <button
              className="absolute top-0 right-2 text-xl text-gray-500 hover:text-gray-600"
              onClick={onclick}
            >
              &times;
            </button>
            <div className="flex justify-center mt-6">
              <img
                src={SubmitGoalimg}
                alt="logo"
                className="object-cover w-[203.44px] h-[198px] "
              />
            </div>
            <div className="px-4 pt-2 pb-2">
              <h2 className="text-[24px] font-semibold mb-4 text-center">
                Would you like to share your goal with your support network?
              </h2>
              <div className="flex justify-between">
                <button
                  className=" w-[207px] h-[49px] bg-[#E5EAED] rounded-[8px] text-[#000000] font-[500] "
                  onClick={() => {
                    handlecreategoal();
                 
                  }}
                >
                  <div className="flex items-center justify-center">
                    <span className="mr-1">No</span>
                    {loader && <FiLoader className="animate-spin text-lg" />}
                  </div>{" "}
                </button>
                <div className="w-[207px] ">
                  <AuthSubmitBtn
                    text={"Yes"}
                    handleSubmit={() => {
                      handleClick();
                      setGoalDetailModal(true);
                      setShowModalsupport(true);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      
    </>
  );
};

export default GoalCompletedModal;
