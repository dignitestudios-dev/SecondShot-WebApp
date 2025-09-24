import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitGoalimg } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { FiLoader } from "react-icons/fi";
import { ErrorToast } from "../toaster/ToasterContainer";

const GoalCompletedModal = ({
  showModal,
  onclick,
  handlecreategoal,
  supportPeopleAdded,
}) => {
  const navigate = useNavigate();

  // 🔹 Separate loader states
  const [loaderNo, setLoaderNo] = useState(false);
  const [loaderYes, setLoaderYes] = useState(false);

  const handleNoClick = async () => {
    try {
      setLoaderNo(true);
      await handlecreategoal();
    } finally {
      setLoaderNo(false);
    }
  };

  const handleYesClick = async () => {
    if (!supportPeopleAdded) {
      ErrorToast("Please add at least one support person.");
      return;
    }
    try {
      setLoaderYes(true);
      await handlecreategoal();
    } finally {
      setLoaderYes(false);
    }
  };

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
                {/* NO button */}
                <button
                  className="w-[207px] h-[49px] bg-[#E5EAED] rounded-[8px] text-[#000000] font-[500]"
                  onClick={handleNoClick}
                  disabled={loaderNo || loaderYes}
                >
                  <div className="flex items-center justify-center">
                    <span className="mr-1">No</span>
                    {loaderNo && <FiLoader className="animate-spin text-lg" />}
                  </div>
                </button>

                {/* YES button */}
                <div className="w-[207px]">
                  <AuthSubmitBtn
                    text={"Yes"}
                    handleSubmit={handleYesClick}
                    loading={loaderYes}
                    disabled={loaderNo || loaderYes}
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
