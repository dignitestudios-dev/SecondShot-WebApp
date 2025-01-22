import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const skills = [
  {
    id: 1,
    name: "Transferable Skills",
    description:
      "Lorem ipsum dolor sit amet, adipiscing elit, sed do labore dolore magna aliqua..",
  },
  {
    id: 2,
    name: "Teamwork",
    description: "Ability to work well in a team environment.",
  },
  {
    id: 3,
    name: "Problem Solving",
    description: "Strong problem-solving and critical thinking abilities.",
  },
  {
    id: 4,
    name: "Communication",
    description: "Effective verbal and written communication skills.",
  },
  {
    id: 5,
    name: "Teamwork",
    description: "Ability to work well in a team environment.",
  },
  {
    id: 6,
    name: "Problem Solving",
    description: "Strong problem-solving and critical thinking abilities.",
  },
];

const SkillsInputField = ({ myskills, setFieldValue, errors, touched }) => {
  const [transferableSkills, setTransferableSkills] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [tags, setTags] = useState(["Soft Skills"]);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleSkillSelect = (id, name, setFieldValue) => {
    setSelectedSkill(id);
    setFieldValue("softskills", name);
    // setFieldValue({
    //   softSkills: name,
    // });
    setTransferableSkills(name);
  };

  const addskill = () => {
    if (transferableSkills) {
      setTags([transferableSkills]);
    } else {
      setTags([]);
    }
    closeModal();
  };
  return (
    <div className="flex items-center border border-[#9A9A9A] rounded-lg overflow-hidden p-1">
      <div className="w-full text-[16px] font-normal   text-black  p-2">
        {myskills ? myskills : "Soft Skills"}
      </div>

      <div className="flex justify-end  w-full ">
        <button
          type="button"
          onClick={openModal}
          className="bg-[#012C57] text-white  p-2 rounded-lg"
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
                <h2 className="text-[24px] text-center font-[600] ">
                  Select Transferable Skills
                </h2>
                <p className="text-center ">
                  These are the transferable skills you saved to your library.
                  Select any to add them directly to your resume!
                </p>
              </div>
              <div className=" flex flex-col justify-start items-start gap-4 max-h-96 pr-2 w-full overflow-y-auto ">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`flex w-full justify-between items-center p-6 rounded-xl cursor-pointer ${
                      selectedSkill === skill.id
                        ? "bg-[#012C57]"
                        : "bg-[#F6F6F6]"
                    }`}
                    onClick={() =>
                      handleSkillSelect(skill.id, skill.name, setFieldValue)
                    }
                  >
                    <div>
                      <p
                        className={`text-[18px] font-medium ${
                          selectedSkill === skill.id
                            ? "text-[#F6F6F6]"
                            : "text-[#012C57]"
                        }`}
                      >
                        {skill.name}
                      </p>
                      <p
                        className={`text-[16px] w-[332px] ${
                          selectedSkill === skill.id
                            ? "text-[#F6F6F6]"
                            : "text-[#012C57]"
                        }`}
                      >
                        {skill.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedSkill(skill?.id)}
                      className="bg-white w-5 h-5  flex items-center justify-center rounded-full"
                    >
                      <span className="w-3 h-3 rounded-full bg-[#012C57] relative">
                        <span className="w-2 h-2 rounded-full absolute top-0.5 right-0.5 bg-[#fff] flex items-center justify-center"></span>
                      </span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <AuthSubmitBtn
                  text={"Add Skills"}
                  handleSubmit={() => addskill()}
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
