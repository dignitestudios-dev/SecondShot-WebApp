import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BgAuth, Leftimg, logo, Logonav, logonew } from "../../assets/export";

import axios from "../../axios";
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
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
const EditRegistrationQuestion = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [loading, setloading] = useState(false);
  const [loader, setLoading] = useState(false);
  const [registrationData, setregistrationData] = useState("");
  const [stepsixvalue, setstepsixvalue] = useState([]);

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

  const getreqQuestion = async () => {
    setloading(true);
    try {
      const response = await axios.get("/api/user/get-registration-questions");
      if (response.status === 200) {
        setregistrationData(response?.data?.data);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getreqQuestion();
  }, []);

  useEffect(() => {
    if (registrationData) {
      setFormData({
        university: registrationData?.current_grade_level,
        universityOptions: registrationData?.major_trade_or_military,
        ageValue: registrationData?.is_eighteen_or_older ? "Yes" : "No",
        militaryService: registrationData?.has_military_service ? "Yes" : "No",
        militaryOption: registrationData?.branch_of_service?._id || "",
        rankOptions: registrationData?.rank
          ? {
              label: registrationData?.rank?.rank_name,
              value: registrationData?.rank?._id,
            }
          : null,
        isAthlete: registrationData?.is_athlete ? "Yes" : "No",
        sportsOption: registrationData?.sport_position
          ? {
              label: registrationData?.sport_position?.position_name,
              value: registrationData?.sport_position?._id,
            }
          : null,
        athleteOption: registrationData?.primary_sport?._id || "",
        hobbieOptions: registrationData?.favorite_hobby1
          ? {
              label: registrationData?.favorite_hobby1?.hobbie_name,
              value: registrationData?.favorite_hobby1?._id,
            }
          : null,
        hobbieOptions2: registrationData?.favorite_hobby2
          ? {
              label: registrationData?.favorite_hobby2?.hobbie_name,
              value: registrationData?.favorite_hobby2?._id,
            }
          : null,
        subjectOptions: registrationData?.favorite_middle_school_subject
          ? {
              label:
                registrationData?.favorite_middle_school_subject?.subject_name,
              value: registrationData?.favorite_middle_school_subject?._id,
            }
          : null,

        highestDegree: registrationData?.highest_degree_completion || "",
        jobValue: registrationData?.has_job_experience ? "Yes" : "No",
        jobTitle: registrationData?.recent_job_title || "",
        desireCareer: registrationData?.desired_career_path || "",
      });
    }
  }, [registrationData]);

  const payload = {
    current_grade_level: formData?.university || "",
    major_trade_or_military: formData?.universityOptions || "",
    highest_degree_completion: formData?.highestDegree || "",
    is_eighteen_or_older: formData?.ageValue === "Yes",
    has_military_service: formData?.militaryService === "Yes",
    branch_of_service:
      formData?.militaryService === "Yes" ? formData?.militaryOption : null,
    rank:
      formData?.militaryService === "Yes" ? formData?.rankOptions?.value : null,
    is_athlete: formData?.isAthlete === "Yes",
    primary_sport:
      formData?.isAthlete === "Yes" ? formData?.athleteOption : null,
    sport_position:
      formData?.isAthlete === "Yes" ? formData?.sportsOption?.value : null,
    favorite_hobby1: formData?.hobbieOptions?.value || null,
    favorite_hobby2: formData?.hobbieOptions2?.value || null,
    favorite_middle_school_subject: formData?.subjectOptions?.value || "",
    has_job_experience: formData?.jobValue === "Yes",
    recent_job_title: formData?.jobTitle || "",
    desired_career_path: formData?.desireCareer || "",
  };

  const handleRegistration = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/user/complete-registration-questions",
        payload
      );

      if (response.status === 200) {
        SuccessToast("Successfully Edit Registration Question");
        navigate("/my-profile");
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };
  const nextStep = (skip = false) => {
    setStep(skip ? step + 2 : step + 1);
  };

  const prevStep = (skip = false) => {
    setStep(skip ? step - 2 : step - 1);
  };

  return (
    <Fragment>
      {loading ? (
        <div className="max-w-lg mx-auto p-4 ">
          <div className="space-y-4 ">
            <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
          <div className="mt-6 flex justify-center">
            <div className="w-1/2 h-12 bg-blue-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center min-h-screen relative">
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 mb-6 justify-center items-center ">
                <div className="">
                  <div className="w-[535px]">
                    <h1 className="text-[40px] font-[600] leading-[54px] text-center mb-2">
                      Edit Registration Questions
                    </h1>
                    <p className="text-[#181818] leading-[21.6px] font-[400] text-center text-[16px]">
                      Please answer a few quick registration questions to help
                      us tailor our services to your needs.
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
                          stepsixvalue={stepsixvalue}
                          setstepsixvalue={setstepsixvalue}
                        />
                      )}
                      {step === 7 && (
                        <StepSeven
                          nextStep={nextStep}
                          setFormData={setFormData}
                          formData={formData}
                          prevStep={prevStep}
                          stepsixvalue={stepsixvalue}
                          setstepsixvalue={setstepsixvalue}
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
                          handleRegistration={handleRegistration}
                          loading={loader}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default EditRegistrationQuestion;
