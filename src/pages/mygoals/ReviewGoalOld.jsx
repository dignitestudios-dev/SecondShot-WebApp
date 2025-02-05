import React, { useState } from "react";
import { PiPencilLine } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import GoalCompletedModal from "../../components/mygoals/GoalCompletedModal";
import SupportPerson from "../../components/mygoals/SupportPerson";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import AddSupportModal from "../../components/myresume/AddSupportModal";
import GoalCreatedModal from "../../components/mygoals/GoalCreatedModal";
import CreateGoalModal from "../../components/mygoals/CreateGoalModal";

function ReviewYourGoalOld() {
  const navigate = useNavigate();
  const [isGoalDetailModalOpen, setGoalDetailModalOpen] = useState(false);

  const location = useLocation("");
  const data = location.state;
  console.log(data, "MyData");
  const [isPeople, setIsPeople] = useState(false);
  const [formData, setFormData] = useState();
console.log(formData,"formData++----|||")
  const handleNavigation = () => {
    setIsPeople(false);
    navigate("/reviewgoal");
  };
  const openGoalDetailModal = () => setGoalDetailModalOpen(true);

  const closeGoalDetailModal = () => {
    setSuccessModal(true);
    // navigate("/goal-detail");
  };

  const [showCardModal, setShowCardModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [showModalsupport, setShowModalsupport] = useState(true);

  const handleCardModal = () => {
    setShowCardModal(!showCardModal);
  };

  return (
    <div className="">
      <div className="">
        {/* Main Heading and Submit Button */}
        <div className="flex justify-between items-center mt-6 w-full">
          <div className="text-left w-[555px]">
            <h1 className="text-[32px] font-medium text-gray-800">
              Review Your Goal
            </h1>
            <p className="text-black mt-1 font-[500] ">
              Take a moment to review your goal below. If you need to make
              changes you can click on the edit button. If you are fully
              satisfied with your goal you have the option to add 2 people for
              support and accountability. Click finalize goal to send to your
              support network add to your goal to the goal setting hub.
            </p>
          </div>
          <div className="flex  items-center  gap-4">
            <div className="w-[200px]">
              {/* <AuthSubmitBtn
                text={"Add Support Network"}
                handleSubmit={() => setShowModalsupport(true)}
              /> */}
            </div>
            <div>
              <AuthSubmitBtn
                text={"Finalize Goal"}
                handleSubmit={() => setGoalDetailModalOpen(true)}
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
              <div className="bg-white rounded-xl p-6 relative h-full z-0">
                <h2 className="text-xl font-semibold mb-2">
                  Main Goal Details
                </h2>

                <p className="text-gray-700 mt-4 text-sm mb-4 border-b border-b-gray-300">
                  {data?.formData?.main_goal_name}
                  <div className="flex space-x-2 mt-2">
                    <p>Deadline for Main goals:</p>
                    <p className="font-semibold text-blue-600 mb-4">
                      {data?.formData?.startDate
                        ? new Date(data.formData.startDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "No date selected"}
                    </p>
                  </div>
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
                    {data?.formData?.sub_goals.map((item, index) => (
                      <div key={index} className="">
                        <div className="text-gray-400">
                          <span className="block text-md font-semibold">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="text-gray-700 text-sm mb-2 pb-2 border-b border-b-gray-400">
                          {item?.name}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4 text-gray-700">
                    <div className="flex space-x- text-[14px] 2 mt-2">
                      <p>Deadline for Sub-goals:</p>{" "}
                      <p className="font-semibold mx-3 text-blue-600 mb-4">
                        Jan/23/2024 - Feb/22/2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[575px] h-[161px] space-y-8">
              <SupportPerson formData={formData} />
            </div>
          </div>
        </div>
        <div />
      </div>
      <GoalCompletedModal
        showModal={isGoalDetailModalOpen}
        onClose={closeGoalDetailModal}
        handleClick={() => {
          setGoalDetailModalOpen(false);
          setShowModalsupport(true);
        }}
        onclick={() => setGoalDetailModalOpen(false)}
      />
      <AddSupportModal
        showModal={showModalsupport}
        handleClick={() => setShowModalsupport(false)}
        setShowModalsupport={setShowModalsupport}
        formData={formData}
        setFormData={setFormData}
      />
      <GoalCreatedModal
        showModal={successModal}
        handleClick={() => navigate("/goal-detail")}
        onclick={() => setSuccessModal(false)}
        heading={"Goal Successfully Created."}
        para={
          "  Your goal has been successfully created. You can now monitor your progress and take the necessary steps to achieve it. Stay committed to your objectives and continue striving for success.If you have any questions, contact help@yoursecondshot.com"
        }
      />
    </div>
  );
}

export default ReviewYourGoalOld;
