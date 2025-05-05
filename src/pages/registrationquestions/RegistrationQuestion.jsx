import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BgAuth, Leftimg, logo, Logonav, logonew } from "../../assets/export";
import StepOne from "../../components/registrationquestion/StepOne";
import StepTwo from "../../components/registrationquestion/StepTwo";
import StepThree from "../../components/registrationquestion/StepThree";
import StepFour from "../../components/registrationquestion/StepFour";
import StepFive from "../../components/registrationquestion/StepFive";
import StepSix from "../../components/registrationquestion/StepSix";
import StepSeven from "../../components/registrationquestion/StepSeven";
import StepEight from "../../components/registrationquestion/StepEight";
import StepNine from "../../components/registrationquestion/StepNine";
import StepTen from "../../components/registrationquestion/StepTen";
import axios from "../../axios";
import Cookies from "js-cookie";

import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import { AuthContext } from "../../context/AuthContext";
const RegistrationQuestion = () => {
  const navigate = useNavigate();
  const [stepforward, setStepforward] = useState(false);
  const { setRegQuestion } = useContext(AuthContext);
  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const [congrats, setCongrats] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [stepsixvalue, setstepsixvalue] = useState([]);
  const [formData, setFormData] = useState({
    university: "",
    universityOptions: "",
    rankOptions: "",
    athleteOption: "",
    sportsOption: "",
    hobbieOptions: "",
    hobbieOptions2: "",
    subjectOptions: "",
    militaryOption: "",
    highestDegree: "",
    ageValue: "",
    militaryService: "",
    isAthlete: "",
    jobValue: "",
    desireCareer: "",
  });

  const nextStep = (skip = false) => {
    setStep(skip ? 4 : step + 1);
  };

  // const prevStep = (skip = false) => {
  //   // If on step 5 or higher, skip directly to step 1
  //   setStep(step === 5 ? 1 : skip ? step - 2 : step - 1);
  // };
  const prevStep = (skip = false) => {


    if (
      formData.university === "College" ||
      formData.university === "career" ||
      formData.university === "early"
    ) {
      if (skip) {
        setStep(step - 2);
      } else {
        setStep(step - 1);
      }
    } else {
      setStep(step === 4 ? 1 : skip ? step - 2 : step - 1);
    }
  };

  const handleIsSkill = () => {
    localStorage.removeItem("isEditSkill");
    navigate("/my-profile");
  };

  const payload = {
    current_grade_level: formData?.university,
    major_trade_or_military: "Default",
    highest_degree_completion: formData?.highestDegree,
    is_eighteen_or_older: formData?.ageValue === "Yes" ? true : false,
    has_military_service: formData?.militaryService === "Yes" ? true : false,
    branch_of_service:
      formData?.militaryService === "Yes" ? formData?.militaryOption : null,
    rank:
      formData?.militaryService === "Yes" ? formData?.rankOptions?.value : null,
    is_athlete: formData?.isAthlete === "Yes" ? true : false,
    primary_sport:
      formData?.isAthlete === "Yes" ? formData?.athleteOption : null,
    sport_position:
      formData?.isAthlete === "Yes" ? formData?.sportsOption?.value : null,
    favorite_hobby1: formData?.hobbieOptions?.value,
    favorite_hobby2: formData?.hobbieOptions2?.value,
    favorite_middle_school_subject: formData?.subjectOptions?.value,
    has_job_experience: formData?.jobValue === "Yes" ? true : false,
    recent_job_title: formData?.jobTitle,
    desired_career_path: "Default",
  };

  const handleRegistration = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/user/complete-registration-questions",
        payload
      );

      if (response.status === 200) {
        SuccessToast("Successfully Create Registration Questions");

        setRegQuestion("true");
        Cookies.set("regQuestion", "true");
        navigate("/congrats-message");
      }
    } catch (error) {
      ErrorToast("Erorr", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="flex justify-center items-center min-h-screen relative">
        <img
          src={Leftimg}
          alt="logo"
          className="absolute top-0 left-0 w-[20%]"
        />
        {congrats ? (
          <></>
        ) : (
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 mb-6 justify-center items-center ">
              <div className="">
                <div className="w-[535px]">
                  <div className="w-full flex justify-center mb-4">
                    <img
                      src={logonew}
                      alt="logo"
                      className="object-cover w-[228px] h-[172px]"
                    />
                  </div>
                  <h1 className="text-[40px] font-[600] leading-[54px] text-center mb-2">
                    Registration Questions
                  </h1>
                  <p className="text-[#181818] leading-[21.6px] font-[400] text-center text-[16px]">
                    Please answer a few quick registration questions to help
                    build out your profile.
                  </p>
                  <div className="flex justify-between items-center mt-6">
                    <p className="text-xs font-medium">Steps</p>
                    <p className="text-xs font-medium">
                      {step.toString().padStart(2, "0")}/08
                    </p>
                  </div>

                  <div className="grid grid-cols-8 gap-1 mt-2">
                    {Array.from({ length: 8 }, (_, index) => (
                      <div
                        key={index}
                        className={`h-1 rounded-xl ${
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
                    {/* {step === 2 && (
                      <StepTwo
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )} */}
                    {step === 2 && (
                      <StepThree
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )}
                    {step === 3 && (
                      <StepFour
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )}
                    {step === 4 && (
                      <StepFive
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )}
                    {step === 5 && (
                      <StepSix
                        setstepsixvalue={setstepsixvalue}
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                        stepforward={stepforward}
                        setStepforward={setStepforward}
                      />
                    )}
                    {step === 6 && (
                      <StepSeven
                        stepsixvalue={stepsixvalue}
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                        stepforward={stepforward}
                        setStepforward={setStepforward}
                        setstepsixvalue={setstepsixvalue}
                      />
                    )}
                    {step === 7 && (
                      <StepEight
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                      />
                    )}
                    {step === 8 && (
                      <StepNine
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                        handleRegistration={handleRegistration}
                        loading={loading}
                      />
                    )}
                    {/* {step === 10 && (
                      <StepTen
                        nextStep={nextStep}
                        setFormData={setFormData}
                        formData={formData}
                        prevStep={prevStep}
                        handleRegistration={handleRegistration}
                        loading={loading}
                      />
                    )} */}
                  </div>
                </div>
              </div>
            </div>
            <img
              src={BgAuth}
              alt="logo"
              className="absolute bottom-0 right-0 w-[20%]"
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default RegistrationQuestion;
