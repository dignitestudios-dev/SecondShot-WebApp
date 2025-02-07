import React, { useEffect, useState } from "react";
import Backbutton from "../../components/Global/Backbutton";
import SubGoals from "../../components/mygoals/SubGoals";
import { Dottedvertical } from "../../assets/export";

import GoalCreatedModal from "../../components/mygoals/GoalCreatedModal";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import AddSupportModal from "../../components/myresume/AddSupportModal";
import DeleteGoalModal from "../../components/mygoals/DeleteGoalModal";
import axios from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
const GoalDetail = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [goalDetailModal, setGoalDetailModal] = useState(false);
  const [supportModal, setSupportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loader, setloader] = useState(false);
  const { id } = useParams();
  const [goalDetail, setGoalDetail] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();
  const getGoalDetail = async () => {
    setloader(true);
    try {
      const response = await axios.post("/api/user/goal-details", {
        goalId: id,
      });

      if (response.status === 200) {
        setGoalDetail(response.data.data);
        setloader(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGoalDetail();
  }, [id]);

  const handlecompleted = async () => {
    setloader(true);
    try {
      const response = await axios.post("/api/user/change-goal-status", {
        goalId: id,
      });

      if (response.status === 200) {
        SuccessToast("Goal Completed Successfully");
        setGoalDetailModal(true);
        setIsCompleted(true);
        getGoalDetail();
      }
    } catch (err) {
      ErrorToast(err.response.data.message);
      console.log(err);
    } finally {
      setloader(false);
    }
  };
  const handleDelete = async () => {
    setloader(true);
    try {
      const response = await axios.delete("/api/user/delete-goal", {
        data: { goalId: id }
      });

      if (response.status === 200) {
        SuccessToast("Goal Deleted Successfully");
        navigate("/mygoals");
      }
    } catch (err) {
      ErrorToast(err.response.data.message);
      console.log(err);
    } finally {
      setloader(false);
    }
  };

  const getBgCardColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-[#EAF8FF]";
      case "Not Started yet":
        return "bg-[#f0340040]";
      case "In Progress":
        return "text-[#F0C000]";
      default:
        return "text-[#F0C000]";
    }
  };
  const gettextCardColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-[#36B8F3]";
      case "Not Started yet":
        return "text-[#f01800]";
      case "In Progress":
        return "bg-[#F0C00042]";
      default:
        return "bg-[#FFFFFF]";
    }
  };
  const getBorderColor = (status) => {
    switch (status) {
      case "Completed":
        return "border-[#36B8F3] text-[#36B8F3]";
      case "Not Started yet":
        return "border-[#f01800] text-[#f01800]";
      case "In Progress":
        return "border-[#F0C000] text-[#F0C000]";
      default:
        return "border-gray-300 text-gray-600";
    }
  };
  return (
    <div>
      <Backbutton />
      {loader ? (
        <div className="animate-pulse p-6 space-y-4 mt-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="flex space-x-4 items-center">
              <div className="h-6 w-20 bg-gray-300 rounded"></div>
              <div className="h-8 w-36 bg-gray-300 rounded"></div>
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          <div className="h-4 w-16 bg-gray-300 rounded"></div>

          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="h-12 w-full bg-gray-200 rounded"></div>

          <div className="h-6 w-40 bg-gray-300 rounded"></div>
          <div className="flex justify-between items-center">
            <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
            <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
            <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-800">
              Finalized Goal Statement
            </h1>
            <div className="flex space-x-4 items-center">
              <div className="text-center">
                <span className="text-[#000000] text-[18px] block text-left font-[500] ">
                  Deadline
                </span>
                <span className="text-[#00000070] font-[500] text-[14px]">
                  {goalDetail?.createdAt
                    ? new Date(goalDetail?.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )
                    : "No date selected"}{" "}
                  |{" "}
                  {goalDetail?.deadline
                    ? new Date(goalDetail?.deadline).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )
                    : "No date selected"}
                </span>
              </div>
              <button
                className={`bg-[#FFFCF2] bg-opacity-35  ${getBgCardColor(
                  goalDetail?.status
                )} px-4 py-2 rounded-md border  ${gettextCardColor(
                  goalDetail?.status
                )} ${getBorderColor(goalDetail?.status)}   `}
              >
                {goalDetail?.status}
              </button>
              <div>
                <AuthSubmitBtn
                  text={"Mark As Completed"}
                  handleSubmit={() => handlecompleted()}
                  loading={loader}
                />
              </div>

              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="relative flex     flex-col justify-start items-start"
              >
                <img
                  src={Dottedvertical}
                  className="w-[20px] h-[20px] "
                  alt=""
                />

                {dropdownOpen && (
                  <div className=" absolute top-12 bg-white z-[5000] border rounded-lg shadow-lg mt-2 p-2  right-0 w-64 text-left">
                    <ul>
                      <li
                        className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                        onClick={() => setSupportModal(true)}
                      >
                        Add Support Network
                      </li>
                      <li
                        className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className="flex mt-4">
            <div>
              <input
                type="checkbox"
                id="custom-checkbox"
                className="h-5 w-5 rounded-md border border-gray-300 bg-white checked:bg-[#012C57] checked:border-[#012C57] appearance-none cursor-pointer 
checked:before:block checked:before:content-['✓'] checked:before:text-white checked:before:text-sm text-center 
checked:before:justify-center checked:before:items-center"
                checked={isCompleted || goalDetail?.status === "Completed"} // Ensure it's checked if already completed
                onChange={handlecompleted} // Call only when clicked
                disabled={isCompleted || goalDetail?.status === "Completed"} // Disable if completed
              />
            </div>
            <p className=" text-[#000000] font-[400] text-[16px] leading-[21.6px] px-2 ">
              {goalDetail?.main_goal_name}
            </p>
          </div>
          <div>
            <div className="mt-8">
              <div className="bg-white rounded-[16px] shadow-md p-6 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-[600] text-[18px] text-[#222222] ">
                    Sub Goals
                  </h2>
                  <button className="bg-[#EAF8FF] bg-opacity-35 text-[#36B8F3] px-4 py-2 rounded-md border border-[#36B8F3]">
                    In Progress
                  </button>
                </div>
                {goalDetail?.sub_goals?.map((item) => (
                  <div className="flex items-center gap-2 py-2 border-b border-gray-200 last:border-b-0 text-[14px]">
                    <input
                      type="checkbox"
                      id="custom-checkbox"
                      className="h-5 w-5 rounded-md border border-gray-300 bg-white checked:bg-[#012C57] checked:border-[#012C57] appearance-none cursor-pointer 
checked:before:block checked:before:content-['✓'] checked:before:text-white checked:before:text-sm text-center 
checked:before:justify-center checked:before:items-center"
                    />
                    <label className="text[#0F0F0F] text-[16px]">
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {goalDetail?.support_people?.map((support, index) => (
                <div key={index} className="bg-white rounded-[22px] p-6">
                  <h2 className="font-semibold text-lg text-gray-800">
                    Support Person
                    <span className="text-[#56EC17]">(0{index + 1})</span>
                  </h2>
                  <div className="mt-4 grid grid-cols-3 gap-x-4">
                    <p className="text-sm border-r border-gray-300 pr-4 grid grid-cols-1">
                      <strong>Full Name:</strong>
                      <span> {support?.full_name} </span>
                    </p>
                    <p className="text-sm border-r border-gray-300 pr-4">
                      <strong>Email Address:</strong> {support?.email_address}
                    </p>
                    <p className="text-sm grid grid-cols-1">
                      <strong>Phone Number:</strong>
                      <span> {support?.phone_number}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <GoalCreatedModal
        showModal={goalDetailModal}
        handleClick={() => setGoalDetailModal(false)}
        heading={"Congratulations"}
        para={"Goal Successfully Completed."}
        onclick={() => setGoalDetailModal(false)}
      />

      <AddSupportModal
        showModal={supportModal}
        handleClick={() => setSupportModal(false)}
      />
      <DeleteGoalModal
        showModal={showDeleteModal}
        onclick={() => setShowDeleteModal(false)}
        handleclick={() => handleDelete()}
        loader={loader}
      />
    </div>
  );
};

export default GoalDetail;
