import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { calendar } from "../../assets/export";

const CreateGoalModal = ({ showModal, handleClick, supportPeople }) => {
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

  const handleNavigation = () => {
    setIsPeople(false);
    navigate("/reviewgoal");
  };

  const [openSub, setOpenSub] = useState(false);
  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                  <p className="text-[24px] text-center font-semibold">
                    Create Goals
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <label className="text-xs">Goal</label>
                <input
                  placeholder="Write your main goal Here"
                  className="w-full border rounded-xl px-3 py-3 text-sm bg-transparent
                  border-gray-700 focus:ring-gray-700 focus:border-gray-700 outline-gray-700"
                />
              </div>
              <div className="mt-4">
                <p className="text-xs font-bold ">Time-Bound</p>
                <div className="text-xs p-3 rounded-lg bg-[#F5F5F5] text=[#5C5C5C] flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-[16px] py-1">
                      Set a deadline for achieving your main goal!
                    </p>
                    <p className="text-[16px] font-light text-gray-600 pb-1">
                      Jan - Mar (3 months by default)
                    </p>
                  </div>
                  <div>
                    <span className="p-2">
                      {/* <img className="w-[24px]" src={calendar} /> */}
                    </span>
                  </div>
                </div>
              </div>
              {openSub && (
                <>
                  <div className="mt-4">
                    <div className="text-xs text=[#5C5C5C] flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold ">
                          Sub Goals{" "}
                          <span className="font-light text-gray-700">
                            (Optional)
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-[#012C57] underline text-xs">
                          Set Deadline
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-light text-gray-600 pb-1">
                      Break down your main goal into manageable steps. Add your
                      sub-goals to turn your dreams into achievable milestones.
                    </p>
                  </div>
                  <div className="pt-2">
                    <div className="w-full flex justify-between items-center">
                      <label className="text-xs">Sub-goal 1</label>
                      <button className="flex gap-1 justify-start items-center text-xs text-blue-800 font-medium">
                        + <span>Add More</span>
                      </button>
                    </div>
                    <input
                      placeholder="Write your main goal Here"
                      className="w-full border rounded-xl px-3 py-3 text-sm bg-transparent
                  border-gray-700 focus:ring-gray-700 focus:border-gray-700 outline-gray-700"
                    />
                  </div>
                </>
              )}

              <div className="mt-2">
                <button
                  onClick={handleNavigation}
                  className="w-full bg-[#E5EAED] text-[#012C57] py-2 my-2 rounded-lg hover:bg-[#d0d5d8]"
                >
                  Make It S.M.A.R.T (Optional)
                </button>
                <button
                  onClick={() => setOpenSub((prev) => !prev)}
                  className="w-full bg-[#012C57] text-white py-2 my-2 rounded-lg hover:bg-blue-900"
                >
                  Add Sub Goals (Optional)
                </button>
                <button
                  onClick={() => navigate("/reviewgoal")}
                  className="w-full bg-[#012C57] text-white py-2 my-2 rounded-lg hover:bg-blue-900"
                >
                  Submit Your Goal
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    )
  );
};

export default CreateGoalModal;
