import React from "react";
import { useNavigate } from "react-router-dom";
import { Card4, resumeSuccess } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const SuccessResumeModal = ({ showModal, onclick, setIsPreview,resumeData }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/view-resume`, { state: resumeData })

    setIsPreview(true);
    onclick();
  };
  return (
    showModal && (
      <div className="fixed inset-0 bg-[#C9C9C952] backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-[420px] p-4 relative">
          <button
            className="absolute top-0 right-2 text-2xl text-gray-500 hover:text-gray-600"
            onClick={onclick}
          >
            &times;
          </button>
          <div className="flex justify-center mt-3">
            <img
              src={Card4}
              alt="logo"
              className="object-cover w-[254.7px] h-[171.42px]"
            />
          </div>
          <div className="px-2 flex flex-col justify-center items-center gap-1">
            <h2 className="text-[24px] mt-4 font-[600] leading-[32.4px] mb-2 text-center">
            Resume Successfully Created
            </h2>
            <p className="text-[16px] font-normal leading-5 text-[#9A9A9A] text-center">
            Your resume has been successfully created. You can now review and edit it as needed. We wish you the best of luck in your job search!
            </p>
            <div className="mt-4 w-full mb-1 flex justify-center">
             <AuthSubmitBtn text={'View Resume'} handleSubmit={()=>handleNavigation()} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SuccessResumeModal;
