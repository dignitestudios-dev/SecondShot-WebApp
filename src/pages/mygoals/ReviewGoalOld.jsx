import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GoalCompletedModal from "../../components/mygoals/GoalCompletedModal";
import SupportPerson from "../../components/mygoals/SupportPerson";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import AddSupportGoalModal from "../../components/mygoals/AddSupportGoalModal";
import axios from "../../axios";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import { PiPencilLine } from "react-icons/pi";
import EditGoalModal from "../../components/mygoals/EditGoalModal";

function ReviewYourGoalOld() {
  const navigate = useNavigate();
  const [isGoalDetailModalOpen, setGoalDetailModalOpen] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    fullname_2: "",
    email_2: "",
    phone_2: "",
  });

  // State to track error messages
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    phone: "",
    fullname_2: "",
    email_2: "",
    phone_2: "",
  });

  const location = useLocation("");
  const goaldata = location.state.formData;
  const threeMonthsAgo = location.state.threeMonthsAgo;
  console.log("threeMonthsAgo==> ", threeMonthsAgo);

  const [threeMonths, setThreeMonths] = useState(threeMonthsAgo);

  useEffect(() => {
    setThreeMonths(threeMonthsAgo);
  }, [threeMonthsAgo]);

  const [isPeople, setIsPeople] = useState(false);
  const handleNavigation = () => {
    setIsPeople(false);
    navigate("/reviewgoal");
  };
  const openGoalDetailModal = () => setGoalDetailModalOpen(true);

  const closeGoalDetailModal = () => {
    setSuccessModal(true);
    // navigate("/goal-detail");
  };

  const [shareModal, setShareModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [showModalsupport, setShowModalsupport] = useState(false);
  const [supportPeopleAdded, setSupportPeopleAdded] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);
  const [editedGoals, setEditedGoals] = useState(goaldata);
  const handleCardModal = () => {
    setShowCardModal(!showCardModal);
  };

  const isAnyFieldFilled =
    formData?.fullname &&
    formData?.email &&
    formData?.phone &&
    formData?.fullname_2 &&
    formData?.email_2 &&
    formData?.phone_2;

  const [loader, setLoader] = useState(false);

  const handlecreategoal = async () => {
    setLoader(true);

    const formattedSupportPeople = [
      {
        full_name: formData.fullname,
        email_address: formData.email,
        phone_number: formData.phone,
      },
      formData.fullname_2 &&
        formData.email_2 &&
        formData.phone_2 && {
          full_name: formData.fullname_2,
          email_address: formData.email_2,
          phone_number: formData.phone_2,
        },
    ].filter(Boolean);

    let deadline = threeMonths
      ? new Date(threeMonths).toLocaleDateString()
      : editedGoals.startDate
      ? new Date(editedGoals.startDate).toLocaleDateString()
      : null;

    try {
      const response = await axios.post("/api/user/create-goal", {
        main_goal_name: editedGoals.main_goal_name,
        deadline: deadline,
        sub_goals: editedGoals.sub_goals,
        support_people: supportPeopleAdded ? formattedSupportPeople : [],
      });

      if (response.status === 201) {
        SuccessToast("Goal Created Successfully");

        const goalid = response?.data?.data?._id;

        if (goalid) {
          navigate(`/goal-detail/${goalid}`);
        } else {
          console.log("Goal ID is missing in the response");
        }
      }
    } catch (err) {
      console.log(err);
      ErrorToast(
        err.response?.message || "An error occurred while creating the goal."
      );
    } finally {
      setLoader(false);
    }
  };
  const [date, setDate] = useState(new Date());

  const handleEditSave = (updatedGoal) => {
    setEditedGoals(updatedGoal); // Update main goal and sub-goals
    setEditShowModal(false); // Close modal
  };

  return (
    <div className="">
      <div className="">
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
              {isAnyFieldFilled ? (
                <AuthSubmitBtn
                  text={"Finalize Goal"}
                  handleSubmit={() => handlecreategoal()}
                  loading={loader}
                />
              ) : (
                <AuthSubmitBtn
                  text={"Finalize Goal"}
                  handleSubmit={() => {
                    setShareModal(true);
                    setIsUpdate(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="w-[575px]  space-y-6">
              <div className="bg-white rounded-xl p-6 relative h-full z-0">
                <h2 className="text-xl font-semibold mb-2">
                  Main Goal Details
                </h2>
                <p className="text-gray-700 mt-4 text-sm mb-4 border-b break-words border-b-gray-300">
                  {editedGoals?.main_goal_name}
                  <div className="flex space-x-2 mt-2">
                    <p>Deadline for Main goals:</p>
                    <p className="font-semibold text-blue-600 mb-4">
                      {new Date(date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      })}
                      {"-"}

                      {threeMonths
                        ? new Date(threeMonths).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                          })
                        : editedGoals?.startDate
                        ? new Date(editedGoals.startDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "2-digit",
                            }
                          )
                        : "No date selected"}
                    </p>
                  </div>
                </p>

                <button className="absolute top-4 right-4 p-2 w-10 h-10 bg-[#012C57] text-white rounded-md">
                  <PiPencilLine
                    size={24}
                    onClick={() => setEditShowModal(true)}
                  />
                </button>
                {editedGoals?.sub_goals.map((item, index) => (
                  <div className="mt-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold mb-4">
                        Sub-Goals {String(index + 1).padStart(2, "0")} Details
                      </h2>
                    </div>
                    <div className="space-y-6">
                      <div key={index} className="">
                        <div className="text-gray-400">
                          <span className="block text-md font-semibold"></span>
                        </div>
                        <div className="text-gray-700 break-words  text-sm mb-2 pb-2 border-b border-b-gray-400">
                          {item?.name}
                          <div className="flex justify-between items-center  text-gray-700">
                            <div className="flex space-x- text-[14px] 2 mt-2">
                              <p>Deadline for Sub-goals:</p>{" "}
                              <p className="font-semibold mx-3 text-blue-600 mb-4">
                                {new Date(date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "2-digit",
                                })}
                                {"-"}
                                {item?.deadline
                                  ? item.deadline.toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "2-digit",
                                    })
                                  : "No date selected"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[575px] h-[161px] space-y-8">
              <SupportPerson formData={formData} />
            </div>
          </div>
        </div>
        <div />
      </div>
      <EditGoalModal
        showModal={editShowModal}
        goalData={editedGoals}
        threeMonthsAgo={threeMonthsAgo}
        onSave={handleEditSave}
        onClose={() => setEditShowModal(false)}
        setThreeMonths={setThreeMonths}
        threeMonths={threeMonths}
      />
      <GoalCompletedModal
        showModal={isGoalDetailModalOpen}
        onClose={closeGoalDetailModal}
        handleClick={() => {
          setGoalDetailModalOpen(false);
          setShowModalsupport(true);
        }}
        onclick={() => setGoalDetailModalOpen(false)}
      />
      <AddSupportGoalModal
        showModal={showModalsupport}
        handleClick={() => setShowModalsupport(false)}
        setShowModalsupport={setShowModalsupport}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        isUpdate={false}
        setSupportPeopleAdded={setSupportPeopleAdded}
      />
      <GoalCompletedModal
        showModal={shareModal}
        loader={loader}
        handlecreategoal={handlecreategoal}
        setShowModalsupport={setShowModalsupport}
        onclick={() => setShareModal(false)}
        handleClick={() => {
          setShareModal(false); // Close the current modal
          setShowModalsupport(true); // Open the Add Support Modal
        }}
      />
      {/* <GoalCreatedModal
        showModal={successModal}
        handleClick={() => navigate("/goal-detail")}
        onclick={() => setSuccessModal(false)}
        heading={"Goal Successfully Created."}
        para={
          "  Your goal has been successfully created. You can now monitor your progress and take the necessary steps to achieve it. Stay committed to your objectives and continue striving for success.If you have any questions, contact help@yoursecondshot.com"
        }
      /> */}
    </div>
  );
}

export default ReviewYourGoalOld;
