import React, { useState } from "react";
import AssessmentOne from "../../components/CareerAssessment/AssessmentOne";
import AssessmentTwo from "../../components/CareerAssessment/AssessmentTwo";
import AssessmentThree from "../../components/CareerAssessment/AssessmentThree";
import AssessmentFour from "../../components/CareerAssessment/AssessmentFour";
import AssessmentSix from "../../components/CareerAssessment/AssessmentSix";
import AssessmentFive from "../../components/CareerAssessment/AssessmentFive";
import AssessmentSeven from "../../components/CareerAssessment/AssessmentSeven";
import AssessmentEight from "../../components/CareerAssessment/AssessmentEight";
import AssessmentNine from "../../components/CareerAssessment/AssessmentNine";
import AssessmentTen from "../../components/CareerAssessment/AssessmentTen";
import AssessmentEleven from "../../components/CareerAssessment/AssessmentEleven";
import AssessmentTwelve from "../../components/CareerAssessment/AssessmentTwelve";
import AssessmentThirteen from "../../components/CareerAssessment/AssessmentThirteen";
import AssessmentFourteen from "../../components/CareerAssessment/AssessmentFourteen";
import AssessmentFifteen from "../../components/CareerAssessment/AssessmentFifteen";
import AssessmentSixteen from "../../components/CareerAssessment/AssessmentSixteen";
import AssessmentSeventeen from "../../components/CareerAssessment/AssessmentSeventeen";
import AssessmentEighteen from "../../components/CareerAssessment/AssessmentEighteen";
import AssessmentNineTeen from "../../components/CareerAssessment/AssessmentNineTeen";
import AssessmentTwenty from "../../components/CareerAssessment/AssessmentTwenty";
import AssessmentTwentyOne from "../../components/CareerAssessment/AssessmentTwentyOne";
import AssessmentTwentyTwo from "../../components/CareerAssessment/AssessmentTwentyTwo";
import AssessmentTwentyThree from "../../components/CareerAssessment/AssessmentTwentyThree";
import AssessmentTwentyFour from "../../components/CareerAssessment/AssessmentTwentyFour";
import { BgAuth, Leftimg } from "../../assets/export";
import AssessmentModal from "../../components/careerrecommendation/AssesmentModal";

const StartAssesment = () => {
  const [congrats, setCongrats] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    impSkill: "",
    excelSkill: "",
    improveSkill: "",
    likeSkill: "",
    topSkill: "",
    preferReading: "",
    preferScience: "",
    workingHands: "",
    workInside: "",
    mathGame: "",
    workAlone: "",
    buildPlan: "",
    goWithFlow: "",
    publicSpeak: "",
    writing: "",
    leader: "",
    teamWork: "",
    physicalChallenge: "",
    stepByStep: "",
    keepTrying: "",
    teachOthers: "",
    competitive: "",
    spotLight: "",
    creative: "",
  });

  // For Modal
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    setShowModal(!showModal);
    setFormData({
      impSkill: "",
      excelSkill: "",
      improveSkill: "",
      likeSkill: "",
      topSkill: "",
      preferReading: "",
      preferScience: "",
      workingHands: "",
      workInside: "",
      mathGame: "",
      workAlone: "",
      buildPlan: "",
      goWithFlow: "",
      publicSpeak: "",
      writing: "",
      leader: "",
      teamWork: "",
      physicalChallenge: "",
      stepByStep: "",
      keepTrying: "",
      teachOthers: "",
      competitive: "",
      spotLight: "",
      creative: "",
    });
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

  return (
    <div className="    ">
      <img
        src={Leftimg}
        alt="logo"
        className="absolute top-0 left-0 w-[20%]"
      />
      <div className="max-w-screen-xl mx-auto p-8">
        <AssessmentModal
          showModal={showModal}
          step={setStep}
          onclick={handleModal}
          setShowModal={setShowModal}
        />

        <div className="grid grid-cols-1 my-6">
          <div className="flex justify-center items-center mt-24 ">
            <div className="w-[50%]">
              <div className="px-10">
                <h1 className="text-[38px] leading-9 text-[#000000] font-semibold text-center mb-2">
                  Career Recommendation Assessment
                </h1>
                <p className="text-[16px] text-[#181818] text-center">
                Please answer a few questions to help us tailor our services to your needs. You may feel like you align to multiple answers. Choose the answer that feels most like you. It's usually your first thought.
                </p>
              </div>
              <div className="flex justify-between mt-6">
                <p className="text-xs font-medium">Steps</p>
                <p className="text-xs font-medium">
                  {step.toString().padStart(2, "0")}/24
                </p>
              </div>

              <div className="flex justify-between mt-2">
                {Array.from({ length: 24 }, (_, index) => (
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
                  />
                )}
                {step === 2 && (
                  <AssessmentTwo
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 3 && (
                  <AssessmentThree
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 4 && (
                  <AssessmentFour
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 5 && (
                  <AssessmentFive
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 6 && (
                  <AssessmentSix
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 7 && (
                  <AssessmentSeven
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 8 && (
                  <AssessmentEight
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 9 && (
                  <AssessmentNine
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 10 && (
                  <AssessmentTen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 11 && (
                  <AssessmentEleven
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 12 && (
                  <AssessmentTwelve
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 13 && (
                  <AssessmentThirteen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 14 && (
                  <AssessmentFourteen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 15 && (
                  <AssessmentFifteen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 16 && (
                  <AssessmentSixteen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 17 && (
                  <AssessmentSeventeen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 18 && (
                  <AssessmentEighteen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 19 && (
                  <AssessmentNineTeen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 20 && (
                  <AssessmentTwenty
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 21 && (
                  <AssessmentTwentyOne
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 22 && (
                  <AssessmentTwentyTwo
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 23 && (
                  <AssessmentTwentyThree
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {step === 24 && (
                  <AssessmentTwentyFour
                    prevStep={prevStep}
                    handleAssessmentForm={handleModal}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src={BgAuth}
        alt="logo"
        className="absolute -bottom-6 -right-8 w-[20%]"
      />
    </div>
  );
};

export default StartAssesment;
