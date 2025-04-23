import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

const Steps = ({ showModal,setFormOpen }) => {
  const [step, setStep] = useState(1);
  const [imageFaded, setImageFaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]); // lifted state
  const handleModalClose = () => {
    setImageFaded(true); // trigger fade-in animation
    setModalOpen(false);

    setTimeout(() => {
      nextStep();
      setImageFaded(false); // reset for future step
    }, 1000); // delay before moving to next step
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const sections = [
    "Rookie",
    "Playbook Pro",
    "Game Time",
    "Career Champion",
    "Hall of Fame",
  ];

  return (
    showModal && (
      <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-4xl relative">
          <div className="flex items-center justify-between w-full px-4 md:px-10">
            {sections.map((label, index) => (
              <div
                key={index}
                className="flex-1 relative flex flex-col items-center"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-transform duration-300 transform ${
                    index + 1 === step ? "animate-pop" : ""
                  } ${
                    index + 1 < step
                      ? "bg-gradient-to-r from-[#012C57] to-[#061523] text-white"
                      : index + 1 === step
                      ? "bg-[#56EC17] text-[#012C57]"
                      : "bg-[#969696] text-white"
                  }`}
                >
                  {index + 1}
                </div>

                <p
                  className={`text-xs mt-2 font-medium text-center ${
                    index + 1 < step
                      ? "text-[#012C57]"
                      : index + 1 === step
                      ? "text-[#061523]"
                      : "text-[#969696]"
                  }`}
                >
                  {label}
                </p>

                {index < sections.length - 1 && (
                  <div
                    className={`absolute top-6 left-14 h-0.5 ${
                      index + 1 < step
                        ? "bg-gradient-to-r from-[#012C57] to-[#061523]"
                        : "bg-[#969696]"
                    }`}
                    style={{ width: "100%" }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className=" flex justify-center items-center">
            <div className="w-[540px]">
              <div className="mt-4 relative">
                {step === 1 && (
                  <div className="animate-fade-in">
                    <StepOne
                      nextStep={nextStep}
                      handleModalClose={handleModalClose}
                      imageFaded={imageFaded}
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                      selectedSkills={selectedSkills}
                      setSelectedSkills={setSelectedSkills}
                    />
                  </div>
                )}
                {step === 2 && (
                  <div className="animate-fade-in">
                    <StepTwo
                      nextStep={nextStep}
                      prevStep={prevStep}
                      handleModalClose={handleModalClose}
                      imageFaded={imageFaded}
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                    />
                  </div>
                )}
                {step === 3 && (
                  <div className="animate-fade-in">
                    <StepThree
                      nextStep={nextStep}
                      prevStep={prevStep}
                      handleModalClose={handleModalClose}
                      imageFaded={imageFaded}
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                    />
                  </div>
                )}
                {step === 4 && (
                  <div className="animate-fade-in">
                    <StepFour
                      nextStep={nextStep}
                      prevStep={prevStep}
                      handleModalClose={handleModalClose}
                      imageFaded={imageFaded}
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                    />
                  </div>
                )}
                {step === 5 && (
                  <div className="animate-fade-in">
                    <StepFive
                      prevStep={prevStep}
                      handleModalClose={handleModalClose}
                      imageFaded={imageFaded}
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                      setFormOpen={setFormOpen}
                      setImageFaded={setImageFaded}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Steps;
