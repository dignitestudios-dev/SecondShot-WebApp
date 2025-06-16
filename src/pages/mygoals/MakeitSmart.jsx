import React, { useState } from "react";
import { BgAuth, Leftimg } from "../../assets/export";
import AssessmentModal from "../../components/careerrecommendation/AssesmentModal";
import AssessmentOne from "../../components/makeitsmart/AssesmentOne";
import AssessmentTwo from "../../components/makeitsmart/AssessmentTwo";
import AssessmentThree from "../../components/makeitsmart/AssessmentThree";
import AssessmentFour from "../../components/makeitsmart/AssessmentFour";
import AssessmentFive from "../../components/makeitsmart/AssessmentFive";
import { useLocation } from "react-router-dom";
import GoalContentModal from "../../components/careerrecommendation/GoalContentModal";

const MakeitSmart = () => {
  const [congrats, setCongrats] = useState(false);
  const [goalContentModal, setContentModal] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specific: "",
    measure: "",
    achievable: "",
    relevant: "",
    timebound: "",
  });

  // For Modal
  const [showModalassestment, setShowModal] = useState(false);
  const handleModal = () => {
    setShowModal(!showModal);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  const handleAssessmentForm = (values) => {
    setCongrats(true);
    setShowModal(!showModal);
  };
  const location = useLocation();
  const { showModal, inputData } = location.state || {};

  return (
    <div className="    ">
      <img src={Leftimg} alt="logo" className="absolute top-0 left-0 w-[20%]" />
      <div className="max-w-screen-xl mx-auto p-8">
        <AssessmentModal
          showModal={showModalassestment}
          step={setStep}
          onclick={handleModal}
          setShowModal={setShowModal}
        />
        <GoalContentModal showModal={goalContentModal} onClose={() => setContentModal(false)} />

        <div className="grid grid-cols-1 my-6">
          <div className="flex justify-center items-center mt-24 ">
            <div className="w-[50%]">
              <div className="px-10">
                <h1 className="text-[38px] leading-9 text-[#000000] font-semibold text-center mb-2">
                  Create S.M.A.R.T Goal
                </h1>
                {/* <p className="text-center text-[14px] ">
                  Type your goal in the chat and add make it a Smart Goal.
                  Review and add the sub goals you want to focus on
                </p> */}
              </div>
              <div className="flex justify-between mt-6">
                <p className="text-xs font-medium">Steps</p>
                <p className="text-xs font-medium">
                  {step.toString().padStart(2, "0")}/5
                </p>
              </div>

              <div className="flex justify-between mt-2">
                {Array.from({ length: 5 }, (_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 ${
                      index === 0
                        ? "rounded-l-full"
                        : index === 23
                        ? "rounded-r-full"
                        : ""
                    } ${
                      index < step ? "bg-[#012C57] mx-[1px]" : "bg-[#EFF2F4]"
                    }`}
                  ></div>
                ))}
              </div>
              <div className="mt-4">
                {step === 1 && (
                  <AssessmentOne
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    showModal={showModal}
                    inputData={inputData}
                  />
                )}
                {step === 2 && (
                  <AssessmentTwo
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    setStep={setStep}
                  />
                )}
                {step === 3 && (
                  <AssessmentThree
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    setStep={setStep}
                  />
                )}
                {step === 4 && (
                  <AssessmentFour
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    setStep={setStep}
                  />
                )}
                {step === 5 && (
                  <AssessmentFive
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    setStep={setStep}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeitSmart;
