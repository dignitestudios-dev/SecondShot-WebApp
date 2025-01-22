import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Assesmentmodal,
  SubmitGoalimg,
  SuccessfullyGoaimg,
} from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import AddSupportModal from "../myresume/AddSupportModal";

const GoalCreatedModal = ({ showModal, onclick, handleClick,heading,para }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/careerdetails");
  };

  const [showModalsupport, setShowModalSupport] = useState(false);
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
                src={SuccessfullyGoaimg}
                alt="logo"
                className="object-cover w-[303.49px] h-[194.52px] "
              />
            </div>
            <div className="px-4 pt-2 pb-2 mt-4">
              <h2 className="text-[24px] font-semibold text-center">
              {heading}
              </h2>
              <p className="text-center text-[#9A9A9A] text-[16px] font-[400]">
              {para}
              </p>
              <div className="mt-5">
                <AuthSubmitBtn
                  text={"View Goal Details"}
                  handleSubmit={() => handleClick()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GoalCreatedModal;
