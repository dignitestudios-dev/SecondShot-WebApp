import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainGoalDetail from "../../components/mygoals/MainGoalDetail";
import SubGoalDetail from "../../components/mygoals/SubGoalDetail";
import SupportPeople from "../../components/mygoals/SupportPeople";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import GoalCompletedModal from "../../components/mygoals/GoalCompletedModal";
import SmartGoalModal from "../../components/mygoals/SmartGoalModal";
import AddSupportModal from "../../components/myresume/AddSupportModal";

function ReviewSmartGoal() {
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
  const [showsuccessModal, setShowsuccessModal] = useState(false);
  const [showModalsupport, setShowModalsupport] = useState(false);

  const handleCardModal = () => {
    setShowCardModal(!showCardModal);
  };
  const closeGoalDetailModal = () => {
    setShowCardModal(false);
  };
  return (
    <div className=" ">
      <div className="">
        <GoalCompletedModal
          showModal={showCardModal}
          onClose={closeGoalDetailModal}
          handleClick={() => {
            setShowCardModal(false);
            setShowModalsupport(true);
          }}
        />
        <div className="flex justify-between items-center mt-6 w-full">
          <div className="text-left w-[475px]">
            <h1 className="text-[32px] font-[500] text-[#000000]">
              Review Your Smart Goal
            </h1>
            <p className="text-[400] mt-1 text-[16px] text-[#0F0F0F] ">
              Take a moment to review your goals below. Ensure they are aligned
              with your aspirations and ready to propel you forward!
            </p>
          </div>
          <div className="flex justify-start items-center gap-1">
            <div>
              <AuthSubmitBtn
                text={"  Add Support Network"}
                handleSubmit={() => handleCardModal()}
              />
            </div>

            <div>
              <AuthSubmitBtn
                text={" Finalize Goal"}
                handleSubmit={() => setShowsuccessModal(true)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="grid grid-cols-2 gap-8">
            <MainGoalDetail />
            <div className="w-[575px] h-[161px] space-y-8">
              <SubGoalDetail />
            </div>
          </div>
        </div>
        <div />

        <SupportPeople />
      </div>

      <AddSupportModal
        showModal={showModalsupport}
        handleClick={() => {
          setShowModalsupport(false);
          setShowsuccessModal(true);
        }}
      />
      <SmartGoalModal
        showModal={showsuccessModal}
        handleClick={() => navigate("/smartgoaldetails")}
        onclick={() => setShowCardModal(false)}
      />
    </div>
  );
}

export default ReviewSmartGoal;
