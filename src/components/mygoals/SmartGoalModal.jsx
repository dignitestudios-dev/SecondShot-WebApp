import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Assesmentmodal,
  SubmitGoalimg,
  SuccessfullyGoaimg,
} from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import AddSupportModal from "../myresume/AddSupportModal";

const SmartGoalModal = ({ showModal, onclick, handleClick }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/careerdetails");
  };

  const [showModalsupport, setShowModalSupport] = useState(false);
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-70">
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
                Smart Goal Successfully Created
              </h2>
              <p className="text-center text-[#9A9A9A] text-[16px] font-[400]">
                Your goal has been successfully created. You can now monitor
                your progress and take the necessary steps to achieve it. For
                any questions or further assistance, please contact our support
                team. Stay committed to your objectives and continue striving
                for success.
              </p>
              <div className="mt-5">
                <AuthSubmitBtn
                  text={"View Smart Goal Details"}
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

export default SmartGoalModal;
