import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthInput from "../onboarding/AuthInput";
import { Calender } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import CustomCalendar from "../calendar/Calender";

const MakeitSmartModal = ({ showModal, handleClick, handleClose }) => {
  const navigate = useNavigate();
  const [isPeople, setIsPeople] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleFieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [inputError, setInputError] = useState({});
  const [date, setDate] = useState(new Date());

  const handleNavigation = () => {
    setIsPeople(false);
    navigate("/make-smart");
  };
  const location = useLocation();
  const isSmart = location.state?.isSmart;

  const [showCalender, setShowCalender] = useState(false);
  const [showSubGoal, setShowSubGoal] = useState(false);

  return (
    showModal && (
      <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-80 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-lg w-[450px] h-auto overflow-auto p-6 relative">
          <button
            className="absolute top-0 right-2 text-xl text-gray-500 hover:text-gray-600"
            onClick={handleClick}
          >
            &times;
          </button>
          {
            <div>
              <div className="flex justify-center mt-3">
                <div>
                  <h2 className="text-[24px] text-center font-semibold">
                   S.M.A.R.T Goal
                  </h2>
                </div>
              </div>
              <div className="pt-4">
                <AuthInput
                  text={"Goal"}
                  placeholder={"Write your main goal here"}
                />
              </div>
              <div className="mt-4">
                <p className="text-[14px] font-[500] m-1">Time-Bound</p>
                <div className="text-xs p-3 rounded-lg bg-[#F5F5F5] text=[#5C5C5C] flex justify-between items-center">
                  <div>
                    <p className="font-[500] text-[16px] py-1">
                      Set a deadline for achieving your main goal!
                    </p>
                    <p className="text-[16px] font-[400] text-[#767676]  pb-1">
                      Jan - Mar (3 months by default)
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
                      <div className="">
                        <CustomCalendar setShowCalender={setShowCalender} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {showSubGoal && (
                <>
                  <div className="mt-4">
                    <div className="text-xs text=[#5C5C5C] flex justify-between items-center">
                      <div>
                        <p className="text-[16px] font-[700] leading-[19.36px] ">
                          Sub Goals{" "}
                          <span className="font-[500] text-[12px] text-[#ACACAC]">
                            (Optional)
                          </span>
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-[#012C57] cursor-pointer underline font-[500] text-[11px] leading-[13.31px] "
                          onClick={() => setShowCalender((prev) => !prev)}
                        >
                          Set Deadline
                        </p>
                      </div>
                    </div>
                    <p className="text-[13px] leading-[15.73px] font-[400] mt-2 text-[#5C5C5C] pb-1">
                      Break down your main goal into manageable steps. Add your
                      sub-goals to turn your dreams into achievable milestones.
                    </p>
                  </div>
                  <div className="pt-2">
                    <div className="w-full flex justify-between items-center">
                      <label className="text-[14px] text-[#181818] font-[500] ">
                        Sub-goal 1
                      </label>
                      <button className="flex gap-1 justify-start items-center text-[#012C57] cursor-pointer  font-[500] text-[11px] leading-[13.31px]">
                        + <span>Add More</span>
                      </button>
                    </div>
                    <AuthInput placeholder={"Write your main goal Here"} />
                  </div>
                </>
              )}

              <button
                onClick={handleNavigation}
                className="w-full  bg-[#E5EAED] font-[500] capitalize text-[#012C57] py-2 my-2 rounded-[8px] h-[49px] hover:bg-[#d0d5d8]"
              >
                Make it S.M.A.R.T (optional)
              </button>
              <div>
                <AuthSubmitBtn
                  text={"Add Sub Goals (Optional)"}
                  handleSubmit={() => setShowSubGoal((prev) => !prev)}
                />
              </div>
              <div className="mt-2">
                <AuthSubmitBtn
                  text={"Submit Your Goal"}
                  handleSubmit={handleClose}
                />
              </div>
            </div>
          }
        </div>
      </div>
    )
  );
};

export default MakeitSmartModal;
