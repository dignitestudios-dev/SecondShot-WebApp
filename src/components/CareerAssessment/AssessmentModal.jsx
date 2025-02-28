import React from "react";
import { useNavigate } from "react-router-dom";
import { assessmentLogo } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const AssessmentModal = ({ showModal, onclick }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/careerdetails");
  };
  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-70">
        <div className="bg-white rounded-xl shadow-custom-shadow w-[500px] p-4 relative">
         
          <div className="flex justify-center mt-6">
            <img
              src={assessmentLogo}
              alt="logo"
              className="object-cover w-[18%]"
            />
          </div>
          <div className="px-4 pt-2 pb-2">
            <h2 className="text-[24px] font-semibold mb-4 text-center">
              You have successfully <br /> completed the assessment
            </h2>
            <p className="text-[16px text-center">
              Congratulations! You have successfully completed the assessment.
              Your results have been recorded, and you can now review your
              performance. For assistance contact{" "}
              <a href="mailto:help@yoursecondshot.com" className="underline">
                help@yoursecondshot.com
              </a>
              <br /> Thank you for your dedication and effort.
            </p>
            <div className=" mt-4 flex justify-center">
              <AuthSubmitBtn
                text={"Explore Career Recommendations"}
                handleSubmit={handleNavigation}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleNavigation}
                className="bg-[#E5EAED] text-[#012C57] font-medium px-4 py-2 rounded-lg w-full"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AssessmentModal;
