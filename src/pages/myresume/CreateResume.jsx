import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Information from "../../components/myresume/Infromation";
import Objective from "../../components/myresume/Objective";
import Experience from "../../components/myresume/Experience";
import Education from "../../components/myresume/Education";
import Licenses from "../../components/myresume/Licenses";
import Skills from "../../components/myresume/Skills";
import Volunteer from "../../components/myresume/Volunteer";
import Backbutton from "../../components/Global/Backbutton";
import { Cvimg } from "../../assets/export";
import Honors from "../../components/myresume/Honors";
import PreviewResume from "../../components/myresume/PreviewResume";
import SuccessResumeModal from "../../components/myresume/SuccessResumeModal";
import ResumeDownloadModal from "../../components/myresume/ResumeDownloadModal";
import AddSupportModal from "../../components/myresume/AddSupportModal";
import ResumeDeleteModal from "../../components/myresume/DeleteResumeModal";
import { IoIosArrowBack } from "react-icons/io";

const CreateResume = () => {
  const navigate = useNavigate();
  const [isPreview, setIsPreview] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    objective: "",
    experience: [],
    company: "",
    licenses: [],
    jobTitle: "",
    education: [],
    techSkills: "",
    transferableSkills: "",
    honorData: [],
    volunteerData: [],
  });

  const [sections] = useState([
    "Contact",
    "Objective",
    "Experience",
    "Education",
    "Licenses ",
    "Skills",
    "Honors",
    "Volunteer ",
  ]);

  const [showModal, setShowModal] = useState(false);
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
        />
        <ResumeDownloadModal
          showModal={showModalDownload}
          onclick={handleDownloadModal}
        />
        <AddSupportModal
          showModal={showPeopleModal}
          handleClick={handleShowPeopleModal}
        />
        <ResumeDeleteModal showModal={showDelete} onclick={handleDeleteModal} />
        {/* <AddSupportModal
          showModal={showPeopleModal}
          handleClick={handleShowPeopleModal}
        />
        <ResumeDeleteModal showModal={showDelete} onclick={handleDeleteModal} /> */}
        {/* <ResumeDownloadModal
            showModal={showModalDownload}
            onclick={handleDownloadModal}
          />
          <ResumeDeleteModal
            showModal={showDelete}
            onclick={handleDeleteModal}
          />
          <PeopleModal
            showModal={showPeopleModal}
            handleClick={handleShowPeopleModal}
          /> */}
      </>

      <>
        {step !== 9 && (
          <>
            <div>
              <div className="flex items-center gap-1 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
                <div>
                  <IoIosArrowBack className="font-[600]" onClick={prevStep} />
                </div>
                <div onClick={prevStep}>BACK</div>
              </div>
            </div>
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-[32px] font-medium text-gray-800">
                Create Resume
              </h1>
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
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                          index < step - 1
                            ? "bg-gradient-to-r from-[#012C57] to-[#061523] z-50"
                            : index == step - 1
                            ? "bg-[#56EC17] z-50 text-[#061523]"
                            : "bg-[#969696]"
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
            <div className="mt-4 h-[820px] overflow-auto no-scrollbar">
              {step === 1 && (
                <Information
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                />
              )}
              {step === 2 && (
                <Objective
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                />
              )}
              {step === 3 && (
                
                <Education
                nextStep={nextStep}
                setFormData={setFormData}
                formData={formData}
              />
              )}
              {step === 4 && (
              <Experience
              nextStep={nextStep}
              setFormData={setFormData}
              formData={formData}
            />
              )}
              {step === 5 && (
                <Licenses
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                />
              )}
              {step === 6 && (
                <Skills
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                />
              )}
              {step === 7 && (
                <Honors
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                />
              )}
              {step === 8 && (
                <Volunteer
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
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
                />
              )}
            </div>
            {step !== 9 && <img src={Cvimg} alt="" className="w-full mt-11" />}
          </div>
        </div>
      </>
    </div>
  );
};

export default CreateResume;
