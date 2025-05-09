import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import Honors from "../../components/editresume/Honors";
import { getMonth, getYear } from "../lib/helper";
import Volunteer from "../../components/editresume/Volunteer";
const EditResume = () => {
  const navigate = useNavigate();
  const [isPreview, setIsPreview] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isSkipped, setIsSkipped] = useState(false);
  const resumeId = useParams();
  const [editData, setEditData] = useState(null);
  const [step, setStep] = useState(1);
  const [resumeData, setesumeData] = useState("");
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
          fullname: editData?.full_name || "",
          email: editData?.email || "",
          phoneNumber: editData?.phone || "",
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
            Issuemonth: item?.issue_date ? getMonth(item?.issue_date) : null,
            Issueyear: item?.issue_date ? getYear(item?.issue_date) : null,
            expirationmonth: item?.expiration_date
              ? getMonth(item?.expiration_date)
              : null,
            expirationyear: item?.expiration_date
              ? getYear(item?.expiration_date)
              : null,
            description: item?.description || "",
          })) || [],
        skillsValues: {
          technicalSkills: editData?.technical_skills || [],
          softskills: editData?.soft_skills || [],
        },
        experienceList:
          editData?.experience?.map((item) => ({
            jobTitle: item?.job_title || "",
            company: item?.company || "",
            startmonth: item?.start_date ? getMonth(item?.start_date) : null,
            startyear: item?.start_date ? getYear(item?.start_date) : "",
            endmonth: item?.end_date ? getMonth(item?.end_date) : null,
            endyear: item?.end_date ? getYear(item?.end_date) : null,
            description: item?.description || "",
            isCurrent: item?.end_date ? false : true,
          })) || [],
        honorsList:
          editData?.honors_and_awards?.map((item) => ({
            awardName: item?.award_name || "",
            awardingOrganization: item?.awarding_organization || "",
            receivedmonth: item?.date_Received
              ? getMonth(item?.date_Received)
              : null,
            receivedyear: item?.date_Received
              ? getYear(item?.date_Received)
              : null,
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
      full_name: formData.informationValues?.fullname,
      email: formData.informationValues?.email,
      phone: formData.informationValues?.phoneNumber,
      address: formData.informationValues.address,
      objective: {
        description: formData.objetiveValues.description,
      },
      experience: formData.experienceList.map((exp) => {
        // Convert months to numeric value using convertMonthToNumber function
        const start_date =
          exp.startyear && exp.startmonth
            ? `${exp.startyear}-${convertMonthToNumber(exp.startmonth)}-01` // Use numeric month
            : null;
        const end_date =
          exp.endyear && exp.endmonth
            ? `${exp.endyear}-${convertMonthToNumber(exp.endmonth)}-01` // Use numeric month
            : null;

        return {
          job_title: exp.jobTitle,
          company: exp.company,
          start_date: start_date,
          end_date: end_date,
          description: exp.description,
        };
      }),

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
        credential_id: null,
        issue_date:
          cert.Issueyear && cert.Issuemonth
            ? `${cert.Issueyear}-${convertMonthToNumber(cert.Issuemonth)}-01` // Convert month to number for issue date
            : null,
        expiration_date:
          cert.expirationyear && cert.expirationmonth
            ? `${cert.expirationyear}-${convertMonthToNumber(
                cert.expirationmonth
              )}-01` // Convert month to number for expiration date
            : null,
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
                ? `${honor.receivedyear}-${convertMonthToNumber(
                    honor.receivedmonth
                  )}-01` // Convert month to number
                : null,
            description: null,
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

      if (response.status === 200) {
        SuccessToast(response?.data?.message);
        handleModal();
        setesumeData(response?.data?.data);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <>
        <SuccessResumeModal
          showModal={showModal}
          onclick={handleModal}
          resumeData={resumeData}
          setIsPreview={setIsPreview}
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
              <h1 className="text-[32px] font-medium text-gray-800">
                Edit Resume
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
                  setIsSkipped={setIsSkipped}
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
