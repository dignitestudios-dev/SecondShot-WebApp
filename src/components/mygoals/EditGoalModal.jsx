import React, { useState } from "react";
import CustomCalendar from "../calendar/Calender";
import { Calender } from "../../assets/export";
import AuthInput from "../onboarding/AuthInput";

const EditGoalModal = ({
  showModal,
  goalData,
  onSave,
  onClose,
  threeMonthsAgo,
  setThreeMonths,
}) => {
  const [editedGoal, setEditedGoal] = useState(goalData);
  const [selectedDate, setSelectedDate] = useState(
    goalData?.deadline || threeMonthsAgo || ""
  );

  const [showCalenderIndex, setShowCalenderIndex] = useState(null);
  const [showCalender, setShowCalender] = useState(false);
  const [errorMain, setMainError] = useState("");
  const [errors, setErrors] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setEditedGoal((prevGoal) => ({
      ...prevGoal,
      startDate: date,
    }));
    setThreeMonths(null);
  };

  const handleInputChange = (e) => {
    setEditedGoal({
      ...editedGoal,
      [e.target.name]: e.target.value,
    });
    setMainError("");
  };

  const handleSubGoalChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSubGoals = editedGoal.sub_goals.map((subGoal, i) =>
      i === index ? { ...subGoal, [name]: value } : subGoal
    );

    setEditedGoal({ ...editedGoal, sub_goals: updatedSubGoals });
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = value.trim() === "" ? "Sub-goal cannot be empty" : "";
      return newErrors;
    });
  };

  const handleSubGoalDateChange = (index, date) => {
    const updatedSubGoals = editedGoal.sub_goals.map((subGoal, i) =>
      i === index ? { ...subGoal, deadline: date } : subGoal
    );
    setEditedGoal({ ...editedGoal, sub_goals: updatedSubGoals });
    setErrors("");
  };

  const handleAddSubGoal = () => {
    setEditedGoal((prevGoal) => ({
      ...prevGoal,
      sub_goals: [
        ...prevGoal.sub_goals,
        { name: "", deadline: "" }, // Empty sub-goal structure
      ],
    }));
  };

  const handleRemoveSubGoal = (index) => {
    const updatedSubGoals = editedGoal.sub_goals.filter((_, i) => i !== index);
    setEditedGoal({ ...editedGoal, sub_goals: updatedSubGoals });
  };

  const handleSave = () => {
    let hasError = false;
    let newSubGoalErrors = Array(editedGoal.sub_goals.length).fill(""); // Create an array of empty errors

    if (!editedGoal.main_goal_name.trim()) {
      setMainError("Main goal cannot be empty.");
      hasError = true;
    } else {
      setMainError("");
    }

    if (!selectedDate) {
      setErrors("Please select a deadline for the main goal.");
      hasError = true;
    } else {
      setErrors("");
    }

    editedGoal.sub_goals.forEach((subGoal, index) => {
      if (!subGoal.name.trim()) {
        newSubGoalErrors[index] = "Sub-goal name cannot be empty.";
        hasError = true;
      } else if (!subGoal.deadline) {
        newSubGoalErrors[index] = "Each sub-goal must have a deadline.";
        hasError = true;
      }
    });

    setErrors(newSubGoalErrors);

    if (hasError) return; // Stop execution if there are errors

    onSave(editedGoal);
  };

  return (
    showModal && (
      <div className="fixed top-0 right-0 w-screen h-screen z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-80 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-lg w-[450px] h-[500px] overflow-scroll p-6 relative">
          <h2 className="text-[24px] text-center font-semibold">Edit Goal</h2>

          <AuthInput
            text={"Goal"}
            placeholder={"Write your main goal here"}
            value={editedGoal.main_goal_name}
            name="main_goal_name"
            onChange={handleInputChange}
            maxLength={250}
          />
          {errorMain && (
            <p className="text-red-500  text-[13px] mt-2 mx-2 font-[500]">
              {errorMain}
            </p>
          )}
          <div className="mt-4">
            <p className="text-[14px] font-[500] m-1">Time-Bound</p>
            <div className="text-xs p-3 rounded-lg bg-[#F5F5F5] text=[#5C5C5C] flex justify-between items-center">
              <div>
                <p className="font-[500] text-[16px] py-1">
                  Set a deadline for achieving your main goal!
                </p>
                <p className="text-[16px] mt-2 font-[400] text-[#767676] pb-1">
                  {selectedDate
                    ? selectedDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      })
                    : "No date selected"}
                </p>
              </div>
              <div>
                <span
                  className="p-2 cursor-pointer"
                  onClick={() => setShowCalender((prev) => !prev)}
                >
                  <img className="w-[24px]" src={Calender} />
                </span>
                {showCalender && (
                  <div>
                    <CustomCalendar
                      startDate={selectedDate}
                      setStartDate={handleDateChange}
                      setShowCalender={setShowCalender}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {editedGoal?.sub_goals?.map((subGoal, index) => (
            <div key={index} className="mb-4 mt-3">
              <div className="flex justify-between">
                <label className="text-[14px] mx-2 text-[#181818] font-[500]">
                  Sub-goal {index + 1}
                </label>
                <button
                  type="button"
                  className="text-red-500 text-[12px] me-5 cursor-pointer underline"
                  onClick={() => handleRemoveSubGoal(index)}
                >
                  Remove
                </button>
              </div>
              <AuthInput
                placeholder="Write your sub goal here"
                name="name"
                value={subGoal.name}
                onChange={(e) => handleSubGoalChange(index, e)}
                maxLength={250}
              />
              {errors[index] && (
                <p className="text-red-500 text-[13px] mt-2 mx-2 font-[500]">
                  {errors[index]}
                </p>
              )}

              <div className="mt-4">
                <p className="text-[14px] font-[500] m-1">Time-Bound</p>
                <div className="text-xs p-3 rounded-lg bg-[#F5F5F5] flex justify-between items-center">
                  <div>
                    <p className="font-[500] text-[16px] py-1">
                      Set a deadline for this sub-goal!
                    </p>
                    <p className="text-[16px] mt-2 font-[400] text-[#767676] pb-1">
                      {subGoal.deadline
                        ? subGoal.deadline.toLocaleDateString("en-US", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          })
                        : "No date selected"}
                    </p>
                  </div>
                  <div>
                    <span
                      className="p-2 cursor-pointer"
                      onClick={() =>
                        setShowCalenderIndex(
                          index === showCalenderIndex ? null : index
                        )
                      }
                    >
                      <img className="w-[24px]" src={Calender} />
                    </span>
                    {showCalenderIndex === index && (
                      <div className="absolute z-10">
                        <CustomCalendar
                          startDate={subGoal.deadline}
                          setStartDate={(date) =>
                            handleSubGoalDateChange(index, date)
                          }
                          setShowCalender={() => setShowCalenderIndex(null)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="text-[#012C57] cursor-pointer underline font-[500] text-[12px] leading-[13.31px] mt-2"
            onClick={handleAddSubGoal}
          >
            + Add More
          </button>

          <div className="flex justify-between mt-4">
            <button
              onClick={onClose}
              className="w-full h-[49px] p-3 text-center rounded-[12px] font-[500] leading-[21.6px] text-[16px] border-0 bg-gray-300 text-gray-800 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="w-full h-[49px] bg-grad-button text-white p-3 text-center rounded-[12px] font-[500] leading-[21.6px] text-[16px]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditGoalModal;
