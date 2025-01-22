import React, { useState } from "react";
import { PiPencilLine } from "react-icons/pi";
// import GoalCompletedModal from "../components/GoalCompletedModal";
import { useNavigate } from "react-router-dom";
import MainGoalDetail from "../../components/mygoals/MainGoalDetail";
import SubGoalDetail from "../../components/mygoals/SubGoalDetail";
import SupportPeople from "../../components/mygoals/SupportPeople";
import SupportPerson from "../../components/mygoals/SupportPerson";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import GoalCompletedModal from "../../components/mygoals/GoalCompletedModal";
import AuthInput from "../../components/onboarding/AuthInput";
import GoalCreatedModal from "../../components/mygoals/GoalCreatedModal";
import AddSupportModal from "../../components/myresume/AddSupportModal";

function ReviewYourGoal() {
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

  const [showCardModal, setShowCardModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [showModalsupport, setShowModalsupport] = useState(false);
  const handleCardModal = () => {
    setShowCardModal(!showCardModal);
  };
  const closeGoalDetailModal = () => {
    setShowCardModal(false);
  };
  return (
    <div className=" p-8 flex flex-col items-center">
      <div className="">
        <GoalCompletedModal
          showModal={showCardModal}
          onClose={closeGoalDetailModal}
          handleClick={() => {
            setShowCardModal(false);
            setShowModalsupport(true);
          }}
        />
        <div className="flex justify-between items-center mt-6 ">
          <div className="text-left w-[475px]">
            <h1 className="text-[32px] font-[500] text-[#000000]">
              Review Your Goal
            </h1>
            <p className="text-[400] mt-1 text-[16px] text-[#0F0F0F] ">
              Take a moment to review your goals below. Ensure they are aligned
              with your aspirations and ready to propel you forward!
            </p>
          </div>
          <div className="flex  items-center  gap-4">
            <div className="w-[200px]">
              <AuthSubmitBtn
                text={"Add Support Network"}
                handleSubmit={() => handleCardModal()}
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

        <div className="flex justify-center mt-8">
          <div className="grid grid-cols-2 gap-8">
            <MainGoalDetail />
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

export default ReviewYourGoal;
