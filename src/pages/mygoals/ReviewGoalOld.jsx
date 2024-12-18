import React, { useState } from "react";
import { PiPencilLine } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import GoalCompletedModal from "../../components/mygoals/GoalCompletedModal";
import SupportPerson from "../../components/mygoals/SupportPerson";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import AddSupportModal from "../../components/myresume/AddSupportModal";
import GoalCreatedModal from "../../components/mygoals/GoalCreatedModal";

function ReviewYourGoalOld() {
  const navigate = useNavigate();
  const [isGoalDetailModalOpen, setGoalDetailModalOpen] = useState(false);
  const [isPeople, setIsPeople] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleNavigation = () => {
    setIsPeople(false);
    navigate("/reviewgoal");
  };
  const openGoalDetailModal = () => setGoalDetailModalOpen(true);

  const closeGoalDetailModal = () => {
    navigate("/goaldetails");
    setGoalDetailModalOpen(false);
  };

  const [showCardModal, setShowCardModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [showModalsupport, setShowModalsupport] = useState(false);
  const handleCardModal = () => {
    setShowCardModal(!showCardModal);
  };
  return (
    <div className="">
      <div className="">
        <GoalCompletedModal
          isOpen={isGoalDetailModalOpen}
          onClose={closeGoalDetailModal}
        />
        {/* Main Heading and Submit Button */}
        <div className="flex justify-between items-center mt-6 w-full">
          <div className="text-left w-[475px]">
            <h1 className="text-[32px] font-medium text-gray-800">
              Review Your Goal
            </h1>
            <p className="text-black mt-1">
              Take a moment to review your goals below. Ensure they are aligned
              with your aspirations and ready to propel you forward! Once you
              finalize your goal it will be logged and sent to your support
              network.
            </p>
          </div>
          <div className="flex  items-center  gap-4">
            <div className="w-[200px]">
              <AuthSubmitBtn
                text={"Add Support Network"}
                handleSubmit={() => setShowModalsupport(true)}
              />
            </div>
            <div>
              <AuthSubmitBtn
                text={"Finalize Goal"}
                handleSubmit={() => setSuccessModal(true)}
              />
            </div>
          </div>
        </div>
    
        {/* Main Section */}
        <div className="flex justify-center mt-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Section - Main Goal and Sub-Goals */}
            <div className="w-[575px] h-[904px] space-y-6">
              {/* Main Goal Details */}
              <div className="bg-white rounded-xl p-6 relative h-full">
                <h2 className="text-xl font-semibold mb-2">
                  Main Goal Details
                </h2>
                <p className="text-gray-700 mt-4 text-sm mb-4 pb-2 border-b border-b-gray-300">
                  Digital Marketing Course
                </p>
                <button className="absolute top-4 right-4 p-2 w-10 h-10 bg-[#012C57] text-white rounded-md">
                  <PiPencilLine size={24} />
                </button>

                {/* Sub-Goals Details */}
                <div className="mt-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold mb-4">
                      Sub-Goals Details
                    </h2>
                    <button className="p-2 w-10 h-10 text-xl bg-[#012C57] text-white hover:text-gray-700 rounded-md">
                      <PiPencilLine size={24} />
                    </button>
                  </div>
                  <div className="space-y-6">
                    {[...Array(7)].map((_, index) => (
                      <div key={index} className="">
                        <div className="text-gray-400">
                          <span className="block text-md font-semibold">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="text-gray-700 text-sm mb-2 pb-2 border-b border-b-gray-400">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt.
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4 text-gray-700">
                    <div className="flex space-x-2">
                      <p>Deadline for Sub-goals:</p>
                      <p className="font-semibold text-blue-600 mb-4">
                        23/Mar/2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[575px] h-[161px] space-y-8">
              <SupportPerson />
            </div>
          </div>
        </div>
        <div />
      </div>
      <AddSupportModal
        showModal={showModalsupport}
        handleClick={() => {
          setShowModalsupport(false);
          setSuccessModal(true);
        }}
      />
        <GoalCreatedModal
        showModal={successModal}
        handleClick={() => navigate("/goal-detail")}
        onclick={() => setSuccessModal(false)}
        heading={"Goal successfully completed."}
        para={
          "  Your goal has been successfully created. You can now monitor your progress and take the necessary steps to achieve it. For any questions or further assistance, please contact our support team. Stay committed to your objectives and continue striving for success."
        }
      />
    </div>
  );
}

export default ReviewYourGoalOld;
