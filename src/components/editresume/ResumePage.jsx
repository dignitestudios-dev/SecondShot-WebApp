import React from "react";
import moment from "moment";

const ResumePage = ({ formData }) => {
 
console.log(formData,"formDatasssssssssss")
  const formatDate = (dateString) => {
    return dateString ? moment(dateString).format("DD-MM-YYYY") : "";
  };

  
  const rawDate = "2013-06-01T00:00:00.000Z";

  return (
    <div className="bg-white w-[1200px]  mx-auto p-8 rounded-lg shadow-md ">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-[45.88px] font-[600]">
          {formData?.informationValues?.fullname}
        </h1>
        <p className="mt-2 flex gap-4 justify-center text-[19.12px] text-[#000000] font-[500] ">
          {formData?.informationValues?.email}

          <span> {formData?.informationValues?.phoneNumber}</span>
          <span className="cursor-pointer">
            <a href={`${formData?.informationValues?.address}`}></a>{" "}
            {formData?.informationValues?.address}
          </span>
        </p>
      </div>

      {/* Objective */}
      <section className="mt-6">
        <h2 className="text-[22px] font-[700] uppercase ">Objective</h2>
        <p className="mt-2 text-[20px] font-[400] text-[#101010] ">
          {formData?.objetiveValues?.description}
        </p>
      </section>
      <hr className="mt-6  " />

      {/* Education */}
      {formData?.educationList[0]?.education && (
        <section className="mt-6">
          <h2 className="text-[22px] leading-[29.7px] font-[700] text-[#101010] uppercase">
            Education
          </h2>

          {formData?.educationList?.map((edu, index) => (
            <div key={index} className="mt-4">
              <div className="flex items-center justify-between">
                <p className="font-[600] text-[22px]">{edu?.education}</p>
                <p className="text-[22.94px] text-[#101010] font-[600]">
                  {edu?.startYear}
                </p>
              </div>
              <li className="text-[#000000] pl-1 leading-[10.59px] font-[400] text-[20px] mt-5">
                {edu.degree}
              </li>
            </div>
          ))}

          <hr className="mt-5" />
        </section>
      )}
      {formData?.certificationsList[0]?.certificationsname && (
        <section className="mt-6">
          <h2 className="text-[22px] leading-[29.7px] text-[#101010] font-[700] uppercase">
            Certifications
          </h2>
          {formData?.certificationsList?.map((cert, index) => (
            <div key={index} className="mt-4 flex items-center justify-between">
              <li className="font-[500] text-[22px] leading-[29.7px] ">
                {cert?.certificationsname}
              </li>
              <p className="text-[22.94px] text-[#101010] font-[600]">
                {cert?.Issueyear} - {cert?.expirationyear}
              </p>
            </div>
          ))}
          <hr className="mt-5" />
        </section>
      )}
      <section className="mt-6">
        {formData?.skillsValues?.softskills?.length > 0 ||
        formData?.skillsValues?.technicalSkills !== "" ? (
          <h2 className="text-[22px] font-[700] uppercase ">Skills</h2>
        ) : null}
        {formData?.skillsValues?.softskills?.length > 0 && (
          <>
            <div className="mt-4">
              <p className="text-[22px] font-[500] text-[#0F0F0F]">
                Soft Skills
              </p>
              <ul className="flex list-disc gap-10 ml-6 mt-2">
                {formData?.skillsValues?.softskills?.map((item, index) => (
                  <li
                    key={index}
                    className="font-[400] text-[20px] text-[#0F0F0F] leading-[16px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {formData?.skillsValues?.technicalSkills?.length > 0 && (
          <div className="mt-4">
            <p className="text-[22px] font-[500] text-[#0F0F0F]">
              Technical Skills
            </p>
            <ul className="flex list-disc gap-8 ml-6 mt-2">
              {formData?.skillsValues?.technicalSkills?.map((skill, index) => (
                <li
                  key={index}
                  className="font-[400] text-[20px] text-[#0F0F0F] leading-[16px]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        <hr className="mt-5" />
      </section>

      {/* Experience */}
      <section className="mt-6">
        <h2 className="text-[22px] font-[700] text-[#101010] uppercase">
          Work Experience
        </h2>
        {formData?.experienceList?.map((exp, index) => (
          <div key={index} className="mt-4">
            <div className="flex justify-between items-center">
              <p className="font-[600] leading-[30.97px] text-[#101010] text-[22.94px]">
                {exp?.company}
              </p>
              <p className="font-[600] leading-[22.94px] text-[#101010] text-[22.94px]">
                {exp?.startyear}- {exp?.isCurrent  ? "Present" : exp?.endyear} 
              </p>
            </div>
            <p className="font-[500] text-[#0F0F0F]  leading-[29.7px] text-[22px]">
              {exp?.jobTitle}
            </p>

            {exp?.description}
          </div>
        ))}
      </section>

      {/* Volunteer */}

      <hr className="mt-5" />

      <section className="mt-6">
        <h2 className="text-[22px] font-[700] leading-[29.7px] text-[#101010] uppercase">
          Volunteer Service
        </h2>
        {formData?.volunteerList?.map((vol, index) => (
          <div key={index} className="mt-4">
            <p className="font-[500] text-[#101010] text-[22px] leading-[29.7px]">
              {vol?.organizationName}
            </p>
            <p className="text-[15.29px] text-[#101010] mt-2">
              {vol?.startYear} - {vol?.endYear}
            </p>
            <ul className="list-outside list-disc">
              <li className="text-gray-700 mt-2 mx-4">{vol?.description}</li>
            </ul>
          </div>
        ))}
      </section>
      <hr className="mt-5" />
      <section className="mt-6">
        <h2 className="text-[22px] font-[700] leading-[29.7px] text-[#101010] uppercase">
          Honors
        </h2>
        {formData?.honorsList?.map((honors, index) => (
          <div key={index} className="mt-4">
            <div className="flex items-center justify-between">
              <p className="font-[500] text-[#101010] text-[22px] leading-[29.7px]">
                {honors?.awardName}
              </p>
              <p className="font-[600] leading-[22.94px] text-[#101010] text-[22.94px]">
                {honors?.receivedyear}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ResumePage;
