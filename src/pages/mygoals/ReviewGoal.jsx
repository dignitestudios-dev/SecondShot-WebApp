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
  const handleCardModal = () => {
    setShowCardModal(!showCardModal);
  };
const closeGoalDetailModal = ()=>{
    setShowCardModal(false)
}
  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <div className="max-w-screen-xl mx-auto">
        {/* Navbar */}
        <GoalCompletedModal
          showModal={showCardModal}
          onClose={closeGoalDetailModal}
          
      
        />
        {/* <GoalCompletedModal
          isOpen={isGoalDetailModalOpen}
          onClose={closeGoalDetailModal}
        /> */}
        {/* Main Heading and Submit Button */}
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
          {/* <div className="flex justify-start items-center gap-1">
            <button
              onClick={() => setIsPeople(true)}
              className="bg-[#012C57] text-white px-6 py-2 rounded-lg shadow-md"
            >
              Add Support Network
            </button>
            <button
              onClick={openGoalDetailModal}
              className="bg-[#012C57] text-white px-6 py-2 rounded-lg shadow-md"
            >
              Finalize Goal
            </button>
          </div> */}
          <div className="w-[198px]">
            <AuthSubmitBtn text={"Submit Goal"} handleSubmit={()=>handleCardModal()} />
          </div>
        </div>
        {isPeople && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[450px] h-auto max-h-[98vh] overflow-auto p-6 relative">
              <div>
                <div className="flex justify-center mt-3">
                  <div>
                    <p className="text-[24px] text-center font-medium">
                      Add Support Network
                    </p>
                    <p className="text-[16px] text-center">
                      Connect with individuals who can support you on your
                      journey towards achieving your goals.
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col items-start gap-1 my-2">
                  <p className="text-[18px] font-semibold">
                    1st Support Person
                  </p>
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    name="fullName"
                    type="text"
                    className={`w-full border rounded-lg px-3 py-3 text-sm bg-transparent border-gray-700  focus:ring-gray-700 focus:border-gray-700 outline-gray-700`}
                    value={formData.fullName}
                    placeholder="Enter Your Name"
                    onChange={(e) =>
                      handleFieldChange("fullName", e.target.value)
                    }
                  />
                </div>
                <div className="w-full flex flex-col items-start gap-1 my-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    className={`w-full border rounded-lg px-3 py-3 text-sm bg-transparent border-gray-700  focus:ring-gray-700 focus:border-gray-700 outline-gray-700`}
                    value={formData.email}
                    placeholder="Enter Your Email"
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start gap-1 my-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    className={`w-full border rounded-lg px-3 py-3 text-sm bg-transparent border-gray-700  focus:ring-gray-700 focus:border-gray-700 outline-gray-700`}
                    value={formData.phone}
                    placeholder="Enter Your Phone"
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                  />
                </div>
                <hr className="my-6 bg-slate-300" />
                <p className="text-[18px] font-semibold">2nd Support Person</p>
                <div className="w-full flex flex-col items-start gap-1 my-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    name="fullName"
                    type="text"
                    className={`w-full border rounded-lg px-3 py-3 text-sm bg-transparent border-gray-700  focus:ring-gray-700 focus:border-gray-700 outline-gray-700`}
                    value={formData.fullName}
                    placeholder="Enter Your Name"
                    onChange={(e) =>
                      handleFieldChange("fullName", e.target.value)
                    }
                  />
                </div>
                <div className="w-full flex flex-col items-start gap-1 my-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    className={`w-full border rounded-lg px-3 py-3 text-sm bg-transparent border-gray-700  focus:ring-gray-700 focus:border-gray-700 outline-gray-700`}
                    value={formData.email}
                    placeholder="Enter Your Email"
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start gap-1 my-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    className={`w-full border rounded-lg px-3 py-3 text-sm bg-transparent border-gray-700  focus:ring-gray-700 focus:border-gray-700 outline-gray-700`}
                    value={formData.phone}
                    placeholder="Enter Your Phone"
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <button
                    onClick={handleNavigation}
                    className="w-full bg-[#012C57] text-white py-2 my-2 rounded-lg hover:bg-blue-900"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
    </div>
  );
}

export default ReviewYourGoal;
