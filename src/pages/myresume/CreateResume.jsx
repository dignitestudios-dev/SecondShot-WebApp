import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Information from "../../components/myresume/Infromation";
import Objective from "../../components/myresume/Objective";
import Experience from "../../components/myresume/Experience";
import Education from "../../components/myresume/Education";
import Licenses from "../../components/myresume/Licenses";
import Skills from "../../components/myresume/Skills";
import Volunteer from "../../components/myresume/Volunteer";
import Honors from "../../components/myresume/Honors";
import PreviewResume from "../../components/myresume/PreviewResume";
import SuccessResumeModal from "../../components/myresume/SuccessResumeModal";
import ResumeDownloadModal from "../../components/myresume/ResumeDownloadModal";
import ResumeDeleteModal from "../../components/myresume/DeleteResumeModal";
import {
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
  step8,
} from "../../assets/export";
import {
  certificationsValues,
  educationValues,
  experienceValues,
  honorsValues,
  informationValues,
  objetiveValues,
  volunteerValues,
} from "../../data/resumefield";
import { skillsValues } from "../../data/resumefield";
import SideResume from "../../components/myresume/sideresume";
const CreateResume = () => {
  const navigate = useNavigate();
  const [isPreview, setIsPreview] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [resumeData, setesumeData] = useState("");

  //Skipping State:
  const [isSkipped, setIsSkipped] = useState(false);

  const stepImages = {
    1: step1,
    2: step2,
    3: step3,
    4: step5,
    5: step6,
    6: step4,
    7: step8,
    8: step7,
  };

  const preloadImages = () => {
    Object.values(stepImages).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  };

  useEffect(() => {
    preloadImages();
  }, []);
  const [step, setStep] = useState(5);

  const [formData, setFormData] = useState({
    informationValues,
    objetiveValues,
    ...educationValues,
    ...experienceValues,
    ...certificationsValues,
    skillsValues,
    ...honorsValues,
    ...volunteerValues,
  });

  const [sections] = useState([
    "Contact",
    "Objective",
    "Education",
    "Licenses",
    "Skills ",
    "Work Experience",
    "Volunteer ",
    "Honors",
  ]);

  const [showModal, setShowModal] = useState(false);
  const [resumeId, setresumeId] = useState("");

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const [showModalDownload, setShowModalDownload] = useState(false);
  const handleDownloadModal = () => {
    setShowModalDownload(!showModalDownload);
  };
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const handleShowPeopleModal = () => {
    setShowPeopleModal(!showPeopleModal);
  };

  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteModal = () => {
    setShowDelete(!showDelete);
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="">
      <>
        <SuccessResumeModal
          showModal={showModal}
          onclick={handleModal}
          setIsPreview={setIsPreview}
          resumeData={resumeData}
        />
        <ResumeDownloadModal
          showModal={showModalDownload}
          onclick={handleDownloadModal}
        />

        <ResumeDeleteModal showModal={showDelete} onclick={handleDeleteModal} />
      </>

      <>
        {step !== 9 && (
          <>
            <div></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-[32px] font-medium text-gray-800">
                  Create Resume
                </h1>
                <p className="text-[16px]">
                  {" "}
                  Answer the following questions on the left. View the sample
                  resume and corresponding sections on the right.
                </p>
              </div>

              <div className="flex items-center"></div>
            </div>
            <div className="flex justify-between items-center mt-4 w-full">
              {sections.map((value, index) => (
                <div
                  key={index}
                  className="flex relative flex-col items-center justify-center w-full"
                >
                  <div className="w-auto flex flex-col items-center gap-2">
                    <div className="flex items-center ">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold  text-[#012C57]  ${
                          index < step - 1
                            ? "bg-gradient-to-r from-[#012C57] to-[#061523] z-50 text-white"
                            : index == step - 1
                            ? "bg-[#56EC17] z-50  "
                            : "bg-[#969696] text-white"
                        }`}
                      >
                        <span className="font-normal">{index + 1}</span>
                      </div>
                    </div>
                    <div className="  flex justify-start items-center text-center text-sm">
                      <p
                        className={`font-medium ${
                          index < step - 1
                            ? " text-gradient-to-r from-[#012C57] to-[#061523] z-50"
                            : index == step - 1
                            ? "text-[#061523] z-50"
                            : "text-[#969696]"
                        }`}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                  {index < sections.length - 1 && (
                    <div
                      className={` absolute top-6 -right-14 w-28 h-[2px] ${
                        index < step - 1
                          ? "bg-gradient-to-r from-[#012C57] to-[#061523]  text-white"
                          : "bg-[#969696]"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <div>
          <div
            className={`${
              step !== 9 ? "grid grid-cols-2 gap-4" : "grid grid-cols-1"
            }`}
          >
            <div className="mt-4">
              {step === 1 && (
                <Information
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                  prevStep={prevStep}
                />
              )}
              {step === 2 && (
                <Objective
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                  prevStep={prevStep}
                />
              )}
              {step === 3 && (
                <Education
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                  prevStep={prevStep}
                  isSkipped={isSkipped}
                  setIsSkipped={setIsSkipped}
                />
              )}
              {step === 4 && (
                <Licenses
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                  setIsSkipped={setIsSkipped}
                  prevStep={prevStep}
                />
              )}
              {step === 5 && (
                <Skills
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                  prevStep={prevStep}
                  setIsSkipped={setIsSkipped}
                />
              )}
              {step === 6 && (
                <Experience
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                  prevStep={prevStep}
                  setIsSkipped={setIsSkipped}
                />
              )}
              {step === 7 && (
                <Volunteer
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                  prevStep={prevStep}
                  setIsSkipped={setIsSkipped}
                />
              )}
              {step === 8 && (
                <Honors
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                  isSkipped={isSkipped}
                  prevStep={prevStep}
                  setIsSkipped={setIsSkipped}
                />
              )}
              {step === 9 && (
                <PreviewResume
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                  isPreview={isPreview}
                  handleModal={handleModal}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  handleDownloadModal={handleDownloadModal}
                  handleShowPeopleModal={handleShowPeopleModal}
                  handleDeleteModal={handleDeleteModal}
                  prevStep={prevStep}
                  setStep={setStep}
                  isSkipped={isSkipped}
                  resumeId={resumeId}
                  setresumeId={setresumeId}
                  resumeData={resumeData}
                  setesumeData={setesumeData}
                />
              )}
            </div>
            {step !== 9 && <SideResume step={step} />}
          </div>
        </div>
      </>
    </div>
  );
};

export default CreateResume;
