import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BgAuth, Leftimg, logo, Logonav } from "../../assets/export";
import StepOne from "../../components/editregistrationquetions/StepOne";
import StepTwo from "../../components/editregistrationquetions/StepTwo";
import StepThree from "../../components/editregistrationquetions/StepThree";
import StepFour from "../../components/editregistrationquetions/StepFour";
import StepFive from "../../components/editregistrationquetions/StepFive";
import StepSix from "../../components/editregistrationquetions/StepSix";
import StepSeven from "../../components/editregistrationquetions/StepSeven";
import StepEight from "../../components/editregistrationquetions/StepEight";
import StepNine from "../../components/editregistrationquetions/StepNine";
import StepTen from "../../components/editregistrationquetions/StepTen";

const EditRegistrationQuestion = () => {
  const isSkill = localStorage.getItem("isEditSkill");
  console.log("🚀 ~ RegistrationQuestions ~ isSkill:", isSkill);
  const navigate = useNavigate();
  const [congrats, setCongrats] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    university: "",
    military: "",
    militaryOption: "",
    skills: [],
    highestDegree: "",
    ageValue: "",
    militaryService: "",
    militaryRole: "",
    isAthlete: "",
    athleteOption: "",
    jobValue: "",
    desireCareer: "",
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleIsSkill = () => {
    localStorage.removeItem("isEditSkill");
    navigate("/my-profile");
  };

  // const handleChange = (input) => (e) => {
  //   setFormData({ ...formData, [input]: e.target.value });
  // };

  // const handleMultiSelectChange = (input) => (values) => {
  //   setFormData({ ...formData, [input]: values });
  // };

  const handleRegistration = (values) => {
    localStorage.removeItem("isEditSkill");
    setCongrats(true);
  };

  return (
    <Fragment>
      <div className="flex justify-center items-center min-h-screen relative">
        {congrats ? (
          <></>
        ) : (
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 mb-6 justify-center items-center ">
              <div className="">
                <div className="w-[535px]">
                  <div className="w-full flex justify-center mb-4">
                    <img
                      src={logo}
                      alt="logo"
                      className="object-cover w-[228px] h-[172px]"
                    />
                  </div>
                  <h1 className="text-[40px] font-[600] leading-[54px] text-center mb-2">
                    Registration Questions
                  </h1>
                  <p className="text-[#181818] leading-[21.6px] font-[400] text-center text-[16px]">
                    Please answer a few quick registration questions to help us
                    tailor our services to your needs. Thank you for your input!
                  </p>
                  <div className="flex justify-between mt-6">
                    <p className="text-xs font-medium">Steps</p>
                    <p className="text-xs font-medium">
                      {step.toString().padStart(2, "0")}/10
                    </p>
                  </div>
                  <div className="grid grid-cols-10 divide-x mt-2">
                    {Array.from({ length: 10 }, (_, index) => (
                      <div
                        key={index}
                        className={`h-1 w-full rounded-xl ${
                          index < step ? "bg-slate-600" : "bg-[#EFF2F4]"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <div className="mt-6">
                    {step === 1 && (
                      <StepOne
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )}
                    {step === 2 && (
                      <StepTwo
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )}
                    {step === 3 && (
                      <StepThree
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )}
                    {step === 4 && (
                      <StepFour
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )}
                    {step === 5 && (
                      <StepFive
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )}
                    {step === 6 && (
                      <StepSix
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )}
                    {step === 7 && (
                      <StepSeven
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )}
                    {step === 8 && (
                      <StepEight
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )}
                    {step === 9 && (
                      <StepNine
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )}
                    {step === 10 && (
                      <StepTen
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default EditRegistrationQuestion;