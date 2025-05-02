import React, { useContext, useEffect, useState } from "react";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { GameTime, PlaybookAward } from "../../assets/export";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CongratsModal from "./CongratsModal";
import { useFormik } from "formik";
import { stepTwoAward } from "../../Schema/awardSchema";
import { ErrorToast, SuccessToast } from "../toaster/ToasterContainer";
import axios from "../../axios";
import { AuthContext } from "../../context/AuthContext";
const SKILL_OPTIONS = [
  "Communication",
  "Leadership",
  "Problem Solving",
  "Teamwork",
  "Other",
];
const StepTwo = ({
  nextStep,
  prevStep,
  handleModalClose,
  imageFaded,
  modalOpen,
  setModalOpen,
  setSelectedCareer,
  selectedCareer,
  carrer,
  question,
  questionId,
  getMyIdp,
  cardData,
}) => {
  const { profilename } = useContext(AuthContext);
  console.log(selectedCareer, "selectedCareer");
  const [errorSkills, setErroSkills] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherSkill, setOtherSkill] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [skillLimitError, setSkillLimitError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCareer.length === 0 && cardData && cardData[1]) {
      setSelectedCareer(cardData[1]);
    }
  }, [cardData]);
  const { handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues: selectedCareer,
    validationSchema: stepTwoAward,
    onSubmit: async () => {
      if (selectedCareer.length === 0) {
        setErroSkills("Careers required");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.post("/api/user/update-idp-form", {
          questionId: questionId,
          answer: selectedCareer,
        });
        if (response.status === 200) {
          SuccessToast(response?.data?.message);
          setModalOpen(true);
          getMyIdp();
        }
      } catch (error) {
        ErrorToast(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSkillSelect = (skill) => {
    setShowOtherInput(false);
    if (selectedCareer.length >= 5) {
      setSkillLimitError("You can only select up to 5 skills.");

      return;
    }

    if (skill === "Other") {
      setShowOtherInput(true);
      setSkillLimitError("");
    } else if (!selectedCareer.includes(skill)) {
      setSelectedCareer([...selectedCareer, skill]);
      setSkillLimitError("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setSelectedCareer(selectedCareer.filter((s) => s !== skill));
    setSkillLimitError("");
  };

  const handleOtherSave = () => {
    if (selectedCareer.length >= 5) {
      setSkillLimitError("You can only select up to 5 skills.");
      return;
    }

    if (otherSkill && !selectedCareer.includes(otherSkill)) {
      setSelectedCareer([...selectedCareer, otherSkill]);
      setOtherSkill("");
      setShowOtherInput(false);
      setSkillLimitError("");
    }
  };

  return (
    <div>
      <div className="mt-10  px-4">
        <div className="flex justify-center items-center">
          <img
            src={GameTime}
            className={`w-[90px] h-[85.63px] transition-opacity duration-500 ${
              imageFaded ? "opacity-100" : "opacity-20"
            }`}
            alt=""
          />
        </div>
        <h2 className="text-[32px] text-center font-semibold text-[#012C57] ">
          Ready to Compete
        </h2>
        <p className="text-[16px] text-center text-[#00000080] mb-2">
          Exploring Career Choices
        </p>

        <form onSubmit={handleSubmit}>
          <label className="text-[14px] font-[500]  text-[#181818]">
            {question}
          </label>

          <div
            className="relative w-full border rounded-[12px] p-2  mb-1 mt-2 text-sm"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex justify-between mt-[2px] items-center">
              <span className="flex flex-wrap gap-2">
                {selectedCareer.length > 0
                  ? selectedCareer?.map((skill, index) => (
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
                  : "Select career path"}
              </span>
              <span className="text-gray-500">
                {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>

            {isDropdownOpen && (
              <div className="absolute top-[50px] left-0 right-0 h-auto max-h-[200px] overflow-auto bg-white shadow-md rounded-[12px] z-10">
                {carrer?.map((careerItem, index) => {
                  const titles = careerItem?.careers
                    ?.map((item) => item?.career_name)
                    .filter(Boolean);
                  return titles.map((title, idx) => (
                    <div
                      key={`${index}-${idx}`}
                      className="p-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => handleSkillSelect(title)}
                    >
                      {title}
                    </div>
                  ));
                })}
                <div
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleSkillSelect("Other")}
                >
                  Other
                </div>
              </div>
            )}
          </div>
          {skillLimitError && (
            <p className="text-red-500 text-sm mt-1">{skillLimitError}</p>
          )}
          {errorSkills && selectedCareer.length === 0 && (
            <p className="text-red-500 text-sm mb-2">{errorSkills}</p>
          )}

          {showOtherInput && (
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="Enter career path"
                className="flex-1 border p-2 rounded-[8px] text-sm"
                value={otherSkill}
                onChange={(e) => setOtherSkill(e.target.value)}
                maxLength={50}
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
            <AuthSubmitBtn text="Submit" type="submit" loading={loading} />
          </div>
        </form>

        <button
          onClick={() => nextStep()}
          className="w-full py-2 mt-2 bg-[#E5EAED] h-[49px] text-[#012C57] rounded-[12px] font-medium"
        >
          Skip
        </button>
        <div className="flex justify-center items-center mt-3">
          <button
            onClick={() => prevStep()}
            className="flex font-[600] text-[12px] gap-1 items-center"
          >
            <IoIosArrowBack size={12} />
            Back
          </button>
        </div>
      </div>
      <CongratsModal
        img={GameTime}
        showModal={modalOpen}
        heading={"Congratulations!"}
        para={`Second Shot has awarded ${profilename} the Playbook Pro Award for identifying her top Career Choice:${selectedCareer.join(
          ", "
        )}. Congratulations!`}
        handleClick={handleModalClose}
        onclick={() => setModalOpen(false)}
      />
    </div>
  );
};

export default StepTwo;
