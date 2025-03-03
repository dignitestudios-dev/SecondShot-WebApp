import React, { useEffect, useState } from "react";
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
import axios from "../../axios";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";

const StartAssesment = () => {
  const [congrats, setCongrats] = useState(false);
  const [carrerQuestion, setCarrerQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const getcarrerquestion = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/get-questions");
      setCarrerQuestion(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getcarrerquestion();
  }, []);
  const [loader, setloader] = useState(false);

  const answers = [
    { questionId: carrerQuestion[0]?._id, answer: formData?.impSkill },
    { questionId: carrerQuestion[1]?._id, answer: formData?.excelSkill },
    { questionId: carrerQuestion[2]?._id, answer: formData?.improveSkill },
    { questionId: carrerQuestion[3]?._id, answer: formData?.likeSkill },
    { questionId: carrerQuestion[4]?._id, answer: formData?.topSkill },
    { questionId: carrerQuestion[5]?._id, answer: formData?.preferReading },
    { questionId: carrerQuestion[6]?._id, answer: formData?.preferScience },
    { questionId: carrerQuestion[7]?._id, answer: formData?.workingHands },
    { questionId: carrerQuestion[8]?._id, answer: formData?.workInside },
    { questionId: carrerQuestion[9]?._id, answer: formData?.mathGame },
    { questionId: carrerQuestion[10]?._id, answer: formData?.workAlone },
    { questionId: carrerQuestion[11]?._id, answer: formData?.buildPlan },
    { questionId: carrerQuestion[12]?._id, answer: formData?.publicSpeak },
    { questionId: carrerQuestion[13]?._id, answer: formData?.writing },
    { questionId: carrerQuestion[14]?._id, answer: formData?.goWithFlow },
    { questionId: carrerQuestion[15]?._id, answer: formData?.leader },
    { questionId: carrerQuestion[16]?._id, answer: formData?.teamWork },
    { questionId: carrerQuestion[17]?._id, answer: formData?.teachOthers },
    {
      questionId: carrerQuestion[18]?._id,
      answer: formData?.physicalChallenge,
    },
    { questionId: carrerQuestion[19]?._id, answer: formData?.stepByStep },
    { questionId: carrerQuestion[20]?._id, answer: formData?.keepTrying },
    { questionId: carrerQuestion[21]?._id, answer: formData?.competitive },
    { questionId: carrerQuestion[22]?._id, answer: formData?.spotLight },
    { questionId: carrerQuestion[23]?._id, answer: formData?.creative },
  ];
  const [carrerId, setcarrerId] = useState(null);

  const handleAssessmentForm = async () => {
    setloader(true);
    try {
      const response = await axios.post("/api/user/submit-assessment", {
        answers,
      });
      if (response.status === 201) {
        SuccessToast(response?.data?.message);
        setcarrerId(response?.data?.data?._id);

        setCongrats(true);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setloader(false);
    }
  };
  useEffect(() => {
    if (carrerId) {
      handleModal();
      setShowModal(true);
    }
  }, [carrerId]);

  return (
    <div className="    ">
      <div className="max-w-screen-xl mx-auto p-8">
        <AssessmentModal
          showModal={showModal}
          step={setStep}
          onclick={handleModal}
          setShowModal={setShowModal}
          carrerId={carrerId}
        />

        <div className="grid grid-cols-1 my-6">
          <div className="flex justify-center items-center mt-24 ">
            <div className="w-[50%]">
              <div className="px-10">
                <h1 className="text-[38px] leading-9 text-[#000000] font-semibold text-center mb-2">
                  Career Recommendation Assessment
                </h1>
                <p className="text-[16px] text-[#181818] text-center">
                  Please answer a few questions to help us tailor our services
                  to your needs. You may feel like you align to multiple
                  answers. Choose the answer that feels most like you. It's
                  usually your first thought.
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
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 2 && (
                  <AssessmentTwo
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 3 && (
                  <AssessmentThree
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 4 && (
                  <AssessmentFour
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 5 && (
                  <AssessmentFive
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                    formData={formData}
                  />
                )}
                {step === 6 && (
                  <AssessmentSix
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 7 && (
                  <AssessmentSeven
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 8 && (
                  <AssessmentEight
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 9 && (
                  <AssessmentNine
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 10 && (
                  <AssessmentTen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 11 && (
                  <AssessmentEleven
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 12 && (
                  <AssessmentTwelve
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 13 && (
                  <AssessmentThirteen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 14 && (
                  <AssessmentFourteen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 15 && (
                  <AssessmentFifteen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 16 && (
                  <AssessmentSixteen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 17 && (
                  <AssessmentSeventeen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 18 && (
                  <AssessmentEighteen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 19 && (
                  <AssessmentNineTeen
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 20 && (
                  <AssessmentTwenty
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 21 && (
                  <AssessmentTwentyOne
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 22 && (
                  <AssessmentTwentyTwo
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 23 && (
                  <AssessmentTwentyThree
                    prevStep={prevStep}
                    nextStep={nextStep}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loading={loading}
                  />
                )}
                {step === 24 && (
                  <AssessmentTwentyFour
                    prevStep={prevStep}
                    handleAssessmentForm={handleAssessmentForm}
                    setFormData={setFormData}
                    formData={formData}
                    carrerQuestion={carrerQuestion}
                    loader={loader}
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

export default StartAssesment;
