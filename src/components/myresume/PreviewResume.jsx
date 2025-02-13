import React, { useRef, useState } from "react";
import Backbutton from "../Global/Backbutton";
import ResumePage from "./ResumePage";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import {
  Dottedvertical,
  Downloadimg,
  Printimg,
  Shareimg,
} from "../../assets/export";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../toaster/ToasterContainer";

const PreviewResume = ({
  formData,
  isPreview,
  handleModal,
  isOpen,
  setIsOpen,
  handleDownloadModal,
  handleShowPeopleModal,
  handleDeleteModal,
  setStep,
  isSkipped,
  setresumeId,
  resumeId,
  resumeData,
  setesumeData,
}) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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

  const transformFormData = (formData) => {
    return {
      full_name: formData.informationValues?.fullname,
      email: formData.informationValues?.email,
      phone: formData.informationValues?.phoneNumber,
      address: formData.informationValues?.address,
      objective: {
        description: formData.objetiveValues?.description,
      },
      experience: formData.experienceList.map((exp) => ({
        job_title: exp.jobTitle,
        company: exp.company,
        start_date: `${exp.startyear}-${convertMonthToNumber(exp.startmonth)}`,
        end_date: exp.isCurrent
          ? null
          : `${exp.endyear}-${convertMonthToNumber(exp.endmonth)}-01`,
        description: exp.description,
      })),
      education: isSkipped
        ? []
        : formData.educationList.map((edu) => ({
            institution: edu.education,
            degree: edu.degree,
            field_of_study: edu.fieldofStudy,
            start_year: parseInt(edu.startYear),
            end_year: parseInt(edu.endYear),
            description: null,
          })),
          
      licenses_and_certifications: isSkipped
        ? []
        : formData.certificationsList.map((cert) => ({
            certification_name: cert.certificationsname,
            issuing_organization: cert.issuingOrganization,
            credential_id: cert.credentialId,
            issue_date: `${cert.Issueyear}-${convertMonthToNumber(
              cert.Issuemonth
            )}`,
            expiration_date:
              cert.expirationmonth && cert.expirationyear
                ? `${cert.expirationyear}-${convertMonthToNumber(
                    cert.expirationmonth
                  )}`
                : null,
          })),
      soft_skills: isSkipped ? [] : formData.skillsValues?.softskills,
      technical_skills: isSkipped
        ? []
        : formData.skillsValues?.technicalSkills
            
            .map((skill) => skill.trim()),
      volunteer_experience: formData.volunteerList.map((volunteer) => ({
        organization_name: volunteer.organizationName,
        role: volunteer.volunteerRules,
        start_year: parseInt(volunteer.startYear),
        end_year: parseInt(volunteer.endYear),

        description: volunteer?.description ? volunteer?.description : null,
      })),

      honors_and_awards: formData?.honorsList?.map((honor) => ({
        award_name: honor?.awardName,
        awarding_organization: honor?.awardingOrganization,
        date_Received: `${honor?.receivedyear}-${convertMonthToNumber(
          honor?.receivedmonth
        )}`,
        description: honor?.description ? honor?.description : null,
      })),
    };
  };
  const transformedData = transformFormData(formData);

  const handleSubmitData = async () => {
    const transformedData = transformFormData(formData);
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/user/create-resume",
        transformedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        SuccessToast("Resume Create Successfully");
        handleModal();
        setresumeId(response?.data?.data?._id);
        setesumeData(response?.data?.data);
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
  console.log(resumeData, "resumeData");

  return (
    <div>
      <div className="flex items-center gap-1 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
        {isPreview ? (
          ""
        ) : (
          <div className="flex items-center">
            <IoIosArrowBack className="font-[600]" onClick={() => setStep(8)} />
            <div onClick={() => setStep(8)}>BACK</div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start mb-8">
        <div>
          {isPreview ? (
            <h1 className="text-[32px] font-medium text-gray-800">
              Your Personalized Resume
            </h1>
          ) : (
            <h1 className="text-[32px] font-medium text-gray-800">
              Your Personalized Resume{" "}
            </h1>
          )}
        </div>
        {isPreview ? (
          <div className="flex items-center">
            <div className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer">
              <img className="w-[27.61px] h-[23px] " src={Printimg} />
            </div>
            <div
              onClick={handleDownloadModal}
              className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer"
            >
              <img className="w-[12px] h-[18.38px] " src={Downloadimg} />
            </div>
            <div
              onClick={handleShowPeopleModal}
              className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer"
            >
              <img className="w-[21px] h-[17px] " src={Shareimg} />
            </div>
            <div className="w-[189px]">
              <AuthSubmitBtn text={"Email it to yourself"} />
            </div>
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <img
                src={Dottedvertical}
                className="w-[20px] h-[20px]  cursor-pointer"
                alt=""
                onClick={toggleDropdown}
              />
              {isOpen && (
                <div
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="py-1" role="none">
                    <p
                      href="#"
                      className="block px-4 py-2 text-[12px] text-[#000000] font-[400] border-b mx-1 cursor-pointer"
                      onClick={() => navigate(`/edit-resume/${resumeId}`)}
                    >
                      Edit{" "}
                    </p>
                    <p
                      onClick={handleDeleteModal}
                      href="#"
                      className="block px-4 py-2 text-[12px] text-[#000000]  font-[400] border-b mx-1 cursor-pointer"
                    >
                      Delete
                    </p>
                    <p
                      href="#"
                      className="block px-4 py-2 text-[12px] text-[#000000] font-[400] mx-1 cursor-pointer"
                    >
                      Create New{" "}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex w-[145px] items-center">
            <AuthSubmitBtn
              text={"Save"}
              handleSubmit={() => handleSubmitData()}
              loading={loading}
            />
          </div>
        )}
      </div>

      {/* Give this id */}
      <div id="download-resume" className="flex  justify-center">
        <ResumePage formData={formData} isSkipped={isSkipped} />
      </div>
    </div>
  );
};

export default PreviewResume;
