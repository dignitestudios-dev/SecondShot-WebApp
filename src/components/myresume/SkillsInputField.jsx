import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const SkillsInputField = ({
  myskills,
  setFieldValue,
  transferableSkills,
  loading,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);


  const [customSkill, setCustomSkill] = useState("");
  const [customSkillArr, setCustomSkillArr] = useState([]);

  const [showCustomInput, setShowCustomInput] = useState(false);
  useEffect(() => {
    if (transferableSkills?.length > 0) {
      setSelectedSkills(transferableSkills);
    }
  }, [transferableSkills]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleSkillSelect = (title) => {
    setSelectedSkills((prevSkills) => {
      const updatedSkills = prevSkills.includes(title)
        ? prevSkills.filter((s) => s !== title)
        : [...prevSkills, title];

      setFieldValue("softskills", updatedSkills);
      return updatedSkills;
    });
  };

  return (
    <div className="flex items-center border border-[#9A9A9A] rounded-lg overflow-hidden p-1">
      <div className="w-full text-[16px] font-normal text-black p-2 flex flex-wrap gap-2">
        {loading ? (
          <div className="text-gray-500 italic">Loading...</div>
        ) : selectedSkills.length > 0 ? (
          selectedSkills?.map((title, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-200 text-black px-3 py-1 rounded-lg"
            >
              <span className="mr-2">{title}</span>

              <button
                onClick={() => handleSkillSelect(title)}
                className="text-red-500"
              >
                <RxCross2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          "Soft Skills"
        )}
      </div>

      <div className="flex justify-end w-full">
        <button
          type="button"
          onClick={openModal}
          className="bg-[#012C57] text-white p-2 rounded-lg"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 5a1 1 0 00-1 1v3H6a1 1 0 000 2h3v3a1 1 0 002 0V11h3a1 1 0 100-2h-3V6a1 1 0 00-1-1z" />
          </svg>
        </button>
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 bg-[#cacaca52] backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-4 relative">
            <div className="p-4">
              <button
                type="button"
                className="absolute top-5 right-6"
                onClick={closeModal}
              >
                <RxCross2 className="w-5 h-5 text-gray-700" />
              </button>
              <div className="w-full flex flex-col justify-center mb-4 items-center gap-1">
                <h2 className="text-[24px] text-center font-[600]">
                  Select Transferable Skills
                </h2>
                <p className="text-center">
                  Select multiple skills to add them to your resume!
                </p>
              </div>
              {myskills?.length > 0 ? (
                <div>
                  <div className="flex flex-col justify-start items-start gap-4 max-h-96 pr-2 w-full overflow-y-auto">
                    {myskills.map((skill) => {
                      const skillTitle =
                        skill?.favorite_hobby2?.title ||
                        skill?.favorite_hobby1?.title ||
                        skill?.favorite_middle_school_subject?.title ||
                        skill?.rank?.title ||
                        skill?.athlete?.title ||
                        skill?.sport?.title;

                      return (
                        <div
                          key={skill?._id}
                          className={`flex w-full justify-between items-center p-6 rounded-xl cursor-pointer ${
                            selectedSkills.includes(skillTitle)
                              ? "bg-[#012C57] text-white"
                              : "bg-[#F6F6F6] text-[#012C57]"
                          }`}
                          onClick={() => handleSkillSelect(skillTitle)}
                        >
                          <div>
                            <p className="text-[18px] font-medium">
                              {skillTitle}
                            </p>
                          </div>
                          <button className="bg-white w-5 h-5 flex items-center justify-center rounded-full">
                            {selectedSkills.includes(skillTitle) && (
                              <span className="w-3 h-3 rounded-full bg-[#012C57]"></span>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="font-[18px] text-center text-gray-500">
                  <p>No skills have been added in your library yet</p>
                </div>
              )}

              {/* "Other" custom skill entry */}
              <div className="mt-4 w-full">
                {!showCustomInput ? (
                  <button
                    onClick={() => setShowCustomInput(true)}
                    className="text-blue-600 underline"
                  >
                    + Add other skill
                  </button>
                ) : (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      placeholder="Enter custom skill"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                    <button
                      onClick={() => {
                        const trimmed = customSkill.trim();
                        if (trimmed) {
                          handleSkillSelect(trimmed); // toggle add/remove directly
                          setCustomSkill("");
                          setShowCustomInput(false);
                        }
                      }}
                      className="bg-[#012C57] text-white px-3 py-1 rounded"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-center">
                <AuthSubmitBtn
                  text={"Add Skills"}
                  handleSubmit={closeModal}
                  disabled={myskills.length === 0}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsInputField;
