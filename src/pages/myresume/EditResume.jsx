import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Volunteer from "../../components/myresume/Volunteer";
import Backbutton from "../../components/Global/Backbutton";
import Honors from "../../components/myresume/Honors";
import PreviewResume from "../../components/myresume/PreviewResume";
import SuccessResumeModal from "../../components/myresume/SuccessResumeModal";
import ResumeDownloadModal from "../../components/myresume/ResumeDownloadModal";
import AddSupportModal from "../../components/myresume/AddSupportModal";
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
import { honorsValues, volunteerValues } from "../../data/resumefield";
import { skillsValues } from "../../data/resumefield";
import SideResume from "../../components/myresume/sideresume";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import axios from "../../axios";
import Information from "../../components/editresume/Infromation";
import Objective from "../../components/editresume/Objective";
import Education from "../../components/editresume/Education";
import Licenses from "../../components/editresume/Licenses";
import Skills from "../../components/editresume/Skills";
import Experience from "../../components/editresume/Experience";
import ViewEditResume from "../../components/editresume/ViewEditResume";
const EditResume = () => {
  const navigate = useNavigate();
  const [isPreview, setIsPreview] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isSkipped, setIsSkipped] = useState(false);
  const resumeId = useParams();
  const [editData, setEditData] = useState(null);
  const [step, setStep] = useState(1);

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

  const geteditdata = async () => {
    try {
      const response = await axios.post("/api/user/resume-detail", {
        resumeId: resumeId?.id,
      });

      if (response.status === 200) {
        setEditData(response.data.data);
      }
    } catch (err) {
      ErrorToast(err.message);
    }
  };

  const [informationValues, setInformationValues] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [objetiveValues, setobjetiveValues] = useState({
    description: "",
  });
  const [educationValues, seteducationValues] = useState({
    educationList: [
      {
        institution: "",
        degree: "",
        fieldofStudy: "",
        startYear: "",
        endYear: "",
        description: null,
      },
    ],
  });

  const [certificationValues, setcertificationValues] = useState({
    certificationsList: [
      {
        certificationsname: "",
        issuingOrganization: "",
        credentialId: "",
        Issuemonth: "",
        Issueyear: "",
        expirationmonth: "",
        expirationyear: "",
      },
    ],
  });
  const [skillsValues, setSkillsValues] = useState({
    technicalSkills: "",
    softskills: [],
  });
  const [experienceValues, setexperienceValues] = useState({
    experienceList: [
      {
        jobTitle: "",
        company: "",
        startmonth: "",
        startyear: "",
        endmonth: "",
        endyear: "",
        isCurrent: false,
        description: "",
      },
    ],
  });
  const [honorsValues, sethonorsValues] = useState({
    honorsList: [
      {
        awardName: "",
        awardingOrganization: "",
        receivedmonth: "",
        receivedyear: "",
        description: "",
      },
    ],
  });
  const [volunteerValues, setvolunteerValues] = useState({
    volunteerList: [
      {
        organizationName: "",
        volunteerRules: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ],
  });

  const [formData, setFormData] = useState({
    informationValues,
    objetiveValues,
    ...educationValues,
    ...experienceValues,
    ...certificationValues,
    skillsValues,
    ...honorsValues,
    ...volunteerValues,
  });

  useEffect(() => {
    if (resumeId) {
      geteditdata();
    }
  }, [resumeId]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //Skipping State:

  const preloadImages = () => {
    Object.values(stepImages).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  };

  useEffect(() => {
    preloadImages();
  }, []);

  // useEffect(() => {
  //   setFormData();
  // }, [informationValues]);

  useEffect(() => {
    if (editData) {
      setFormData({
        ...formData,
        informationValues: {
          fullname: editData?.userId?.name || "",
          email: editData?.userId?.email || "",
          phoneNumber: editData?.userId?.phone || "",
          address: editData?.address || "",
        },

        objetiveValues: {
          description: editData?.objective?.description || "",
        },
        educationList:
          editData?.education?.map((item) => ({
            degree: item?.degree || "",
            endYear: item?.end_year || "",
            fieldofStudy: item?.field_of_study || "",
            education: item?.institution || "",
            startYear: item?.start_year || "",
            description: null,
          })) || [],
        certificationsList:
          editData?.licenses_and_certifications?.map((item) => ({
            certificationsname: item?.certification_name || "",
            issuingOrganization: item?.issuing_organization || "",
            credentialId: item?.credential_id || "",
            Issueyear: item?.issue_date || "",
            expirationmonth: item?.expiration_date || "",
          })) || [],
        skillsValues: {
          technicalSkills: editData?.technical_skills || [],
          softskills: editData?.soft_skills || [],
        },
        experienceList:
          editData?.experience?.map((item) => ({
            jobTitle: item?.job_title || "",
            company: item?.company || "",
            start_date: item?.start_date || "",
            end_date: item?.end_date || "",
            description: item?.description || "",
          })) || [],
        honorsList:
          editData?.honors_and_awards?.map((item) => ({
            awardName: item?.award_name || "",
            awardingOrganization: item?.awarding_organization || "",
            receivedmonth: item?.date_Received || "",
            description: item?.description || "",
          })) || [],
        volunteerList:
          editData?.volunteer_experience?.map((item) => ({
            organizationName: item?.organization_name || "",
            volunteerRules: item?.role || "",
            startYear: item?.start_year || "",
            endYear: item?.end_year || "",
            description: item?.description || "",
          })) || [],
      });
    }
  }, [editData]);

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
  const [loading, setLoading] = useState(false);
  const convertMonthToNumber = (month) => {
    const months = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };
    return months[month] || "01";
  };

  const mapFormDataToPayload = (formData) => {
    return {
      address: formData.informationValues.address,
      objective: {
        description: formData.objetiveValues.description,
      },
      experience: formData.experienceList.map((exp) => ({
        job_title: exp.jobTitle,
        company: exp.company,
        start_date: exp.start_date.split("T")[0],
        end_date: exp.end_date.split("T")[0],
        description: exp.description,
      })),
      education: formData.educationList.map((edu) => ({
        institution: edu.education,
        degree: edu.degree,
        field_of_study: edu.fieldofStudy,
        start_year: edu.startYear,
        end_year: edu.endYear,
      })),
      licenses_and_certifications: formData.certificationsList.map((cert) => ({
        certification_name: cert.certificationsname,
        issuing_organization: cert.issuingOrganization,
        credential_id: cert.credentialId,
        issue_date: cert.Issueyear ? cert.Issueyear.split("T")[0] : null,
        expiration_date: cert.expirationmonth && cert.expirationyear
        ? `${cert.expirationmonth}-${cert.expirationyear.split("T")[0]}`
        : null, // Convert to YYYY-MM-DD
    
      })),
      soft_skills: Array.isArray(formData.skillsValues?.softskills)
        ? formData.skillsValues.softskills
        : [],
      technical_skills: Array.isArray(formData.skillsValues?.technicalSkills)
        ? formData.skillsValues.technicalSkills
        : [],

      honors_and_awards: Array.isArray(formData.honorsList)
        ? formData.honorsList.map((honor) => ({
            award_name: honor.awardName || "",
            awarding_organization: honor.awardingOrganization || "",
            date_Received:
            honor.receivedyear && honor.receivedmonth
              ? `${honor.receivedyear}-${honor.receivedmonth
                  .split("T")[0]}`
              : null,

            description: honor.description || "",
          }))
        : [],
      volunteer_experience: formData.volunteerList.map((volunteer) => ({
        organization_name: volunteer.organizationName,
        role: volunteer.volunteerRules,
        start_year: volunteer.startYear,
        end_year: volunteer.endYear,
        description: volunteer.description,
      })),
    };
  };

  const handleSubmitData = async () => {
    const transformedData = mapFormDataToPayload(formData);
    setLoading(true);

    try {
      const response = await axios.put(
        "/api/user/update-resume",
        {
          resume_id: resumeId?.id,
          ...transformedData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        SuccessToast("Resume Edit Successfully");
        handleModal();
        // setresumeid(response?.data?.data?._id);
      }
    } catch (error) {
      ErrorToast(error?.response?.data);
      console.error(
        "Error submitting form:",
        error?.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  console.log(resumeId, "resumeId");
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
      </>

      <>
        {step !== 9 && (
          <>
            <div></div>
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
            <div className="mt-4">
              {step === 1 && (
                <Information
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                  prevStep={prevStep}
                  editData={editData}
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
                />
              )}
              {step === 7 && (
                <Volunteer
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                  prevStep={prevStep}
                />
              )}
              {step === 8 && (
                <Honors
                  nextStep={nextStep}
                  setFormData={setFormData}
                  formData={formData}
                  isSkipped={isSkipped}
                  prevStep={prevStep}
                />
              )}
              {step === 9 && (
                <ViewEditResume
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
                  handleSubmitData={handleSubmitData}
                  loading={loading}
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

export default EditResume;
