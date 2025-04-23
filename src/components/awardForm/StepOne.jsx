import React, { useState } from "react";
import { Rookieaward } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { useFormik } from "formik";
import { stepOneAward } from "../../Schema/awardSchema";
import CongratsModal from "./CongratsModal";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SKILL_OPTIONS = [
  "Communication",
  "Leadership",
  "Problem Solving",
  "Teamwork",
  "Other",
];

const StepOne = ({
  nextStep,
  handleModalClose,
  imageFaded,
  modalOpen,
  setModalOpen,
  setSelectedSkills,
  selectedSkills,
}) => {
  const [errorSkills, setErroSkills] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherSkill, setOtherSkill] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [skillLimitError, setSkillLimitError] = useState("");

  const { handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues: selectedSkills,
    validationSchema: stepOneAward,
    onSubmit: async () => {
      if (selectedSkills.length === 0) {
        setErroSkills("Skills required");
        return;
      }

      setModalOpen(true);
    },
  });

  const handleSkillSelect = (skill) => {
    setShowOtherInput(false);
    if (selectedSkills.length >= 5) {
      setSkillLimitError("You can only select up to 5 skills.");

      return;
    }

    if (skill === "Other") {
      setShowOtherInput(true);
      setSkillLimitError("");
    } else if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSkillLimitError("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    setSkillLimitError("");
  };

  const handleOtherSave = () => {
    if (selectedSkills.length >= 5) {
      setSkillLimitError("You can only select up to 5 skills.");
      return;
    }

    if (otherSkill && !selectedSkills.includes(otherSkill)) {
      setSelectedSkills([...selectedSkills, otherSkill]);
      setOtherSkill("");
      setShowOtherInput(false);
      setSkillLimitError("");
    }
  };

  return (
    <div className="mt-10 px-4">
      <div className="flex justify-center items-center">
        <img
          src={Rookieaward}
          className={`w-[90px] h-[85.63px] transition-opacity duration-500 ${
            imageFaded ? "opacity-100" : "opacity-20"
          }`}
          alt=""
        />
      </div>

      <h2 className="text-[32px] text-center font-semibold text-[#012C57]">
        Getting in the Game
      </h2>
      <p className="text-[16px] text-center text-[#00000080] mb-2">
        Identifying Transferable Skills
      </p>

      <form onSubmit={handleSubmit}>
        <label className="text-[14px] font-[500]  text-[#181818]">
          Select the top 3-5 transferable skills that you identify with the most
        </label>

        <div
          className="relative w-full border rounded-[12px] p-2  mb-1 mt-2 text-sm"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex justify-between mt-[2px] items-center">
            <span className="flex flex-wrap gap-2">
              {selectedSkills.length > 0
                ? selectedSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-xs text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                : "Select transferable skills"}
            </span>
            <span className="text-gray-500">
              {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>

          {isDropdownOpen && (
            <div className="absolute top-[50px] left-0 right-0 bg-white shadow-md rounded-[12px] z-10">
              {SKILL_OPTIONS?.map((skill) => (
                <div
                  key={skill}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleSkillSelect(skill)}
                >
                  {skill}
                </div>
              ))}
            </div>
          )}
        </div>
        {skillLimitError && (
          <p className="text-red-500 text-sm mt-1">{skillLimitError}</p>
        )}
        {errorSkills && selectedSkills.length === 0 && (
          <p className="text-red-500 text-sm mb-2">{errorSkills}</p>
        )}

        {showOtherInput && (
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              placeholder="Enter your skill"
              className="flex-1 border p-2 rounded-[8px] text-sm"
              value={otherSkill}
              onChange={(e) => setOtherSkill(e.target.value)}
            />
            <button
              type="button"
              onClick={handleOtherSave}
              className="bg-[#012C57] text-white px-4 rounded-[8px] text-sm"
            >
              Save
            </button>
          </div>
        )}

        <div className="mt-3">
          <AuthSubmitBtn text="Submit" type="submit" />
        </div>
      </form>

      <button
        onClick={nextStep}
        className="w-full py-2 mt-2 bg-[#E5EAED] h-[49px] text-[#012C57] rounded-[12px] font-medium"
      >
        Skip
      </button>

      <CongratsModal
        img={Rookieaward}
        showModal={modalOpen}
        heading={"Congratulations!"}
        para={`Second Shot has awarded Sanethia Thomas the Rookie Award for identifying her top transferable skills: ${selectedSkills.join(
          ", "
        )}. Congratulations!`}
        handleClick={handleModalClose}
        onclick={() => setModalOpen(false)}
      />
    </div>
  );
};

export default StepOne;
