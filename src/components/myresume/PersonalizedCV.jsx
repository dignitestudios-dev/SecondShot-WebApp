import React from "react";

const PersonalizedCV = ({ resumeData, ref }) => {
  return (
    <div>
      <div
        className="bg-white w-[1200px]  mx-auto p-8 rounded-lg shadow-md"
        ref={ref}
      >
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-[45.88px] font-[600]">{resumeData?.full_name}</h1>
          <p className="mt-2 flex gap-4 justify-center text-[19.12px] text-[#000000] font-[500] ">
            <span> {resumeData?.email} </span>
            <span> {resumeData?.phone}</span>
            <span className="cursor-pointer">
              <a href={`${resumeData?.address}`} target="_blank">
                {" "}
                {resumeData?.address}
              </a>
            </span>
          </p>
        </div>

        {/* Objective */}
        <section className="mt-6">
          <h2 className="text-[22px] font-[700] uppercase ">Objective</h2>
          <p className="mt-2 text-[20px] font-[400] text-[#101010] ">
            {resumeData?.objective?.description}
          </p>
        </section>

        {/* Education */}
        {resumeData?.education?.length > 0 && (
          <section className="mt-6">
            <hr className="mt-1 mb-4 " />
            <h2 className="text-[22px] leading-[29.7px] font-[700] text-[#101010] uppercase">
              Education
            </h2>

            {resumeData?.education?.map((edu, i) => (
              <div key={i} className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="font-[600] text-[22px]">{edu?.institution}</p>
                  <p className="text-[22.94px] text-[#101010] font-[600]">
                    {edu?.start_year} - {edu?.end_year || "Present"}
                  </p>
                </div>

                {edu?.details?.map((detail, j) => (
                  <li
                    key={j}
                    className="text-[#000000] pl-5 pt-2 leading-[30.59px] font-[400] text-[20px]"
                  >
                    {detail?.field_of_study || "No field of study"}
                  </li>
                ))}
              </div>
            ))}
            <hr className="mt-5" />
          </section>
        )}
        {resumeData?.licenses_and_certifications?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-[22px] leading-[29.7px] text-[#101010] font-[700] uppercase">
              Certifications
            </h2>

            {resumeData?.licenses_and_certifications?.map((ctr, i) => (
              <div key={i} className="mt-1">
                <div className="flex items-center justify-between">
                  <p className="font-[600] text-[22px]">
                    {ctr?.certification_name}
                  </p>
                  <p className="text-[22.94px] text-[#101010] font-[600]">
                    {ctr?.issue_date?.split("T")[0].split("-")[0]} -{" "}
                    {ctr?.expiration_date
                      ? ctr.expiration_date?.split("T")[0].split("-")[0]
                      : "Present"}
                  </p>
                </div>

                <li className="text-[#000000] pl-1 leading-[22px] font-[400] text-[22px]">
                  {ctr?.issuing_organization || "issuing_organization"}
                </li>
              </div>
            ))}
            <hr className="mt-5" />
          </section>
        )}
        {/* Certifications */}

        {(resumeData?.soft_skills?.length > 0 ||
          resumeData?.technical_skills?.length > 0) && (
          <section className="mt-6">
            <h2 className="text-[22px] font-[700] uppercase ">Skills</h2>

            {/* Soft Skills */}
            {resumeData?.soft_skills?.length > 0 && (
              <div className="mt-4">
                <p className="text-[22px] font-[500] text-[#0F0F0F]">
                  Soft Skills
                </p>
                <ul className="flex list-disc gap-10 ml-6 mt-2">
                  {resumeData?.soft_skills?.map((skill, index) => (
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

            {/* Technical Skills */}
            {resumeData?.technical_skills?.length > 0 && (
              <div className="mt-4">
                <p className="text-[22px] font-[500] text-[#0F0F0F]">
                  Technical Skills
                </p>
                <ul className="flex list-disc gap-10 ml-6 mt-2">
                  {resumeData?.technical_skills?.map((skill, index) => (
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
          </section>
        )}

        {/* Experience */}
        <hr className="mt-5" />
        <section className="mt-6">
          <h2 className="text-[22px] font-[700] text-[#101010] uppercase">
            Work Experience
          </h2>
          {resumeData?.experience?.map((exp, index) => (
            <div key={index} className="mt-4">
              <div className="flex justify-between items-center">
                <p className="font-[600] leading-[22.94px] text-[#101010] text-[22.94px]">
                  {exp?.company}
                </p>
                <p className="font-[600] leading-[22.94px] text-[#101010] text-[22.94px]">
                  {exp?.start_date?.split("T")[0].split("-")[0]} -{" "}
                  {exp?.end_date
                    ? exp.end_date?.split("T")[0].split("-")[0]
                    : "Present"}
                </p>
              </div>
              <p className="font-[500] text-[#0F0F0F]  leading-[29.7px] text-[22px]">
                {exp.job_title}
              </p>

              <ul className="list-disc ml-3 mt-4">
                <li className="font-[400] text-[#0F0F0F]  text-[20px]">
                  {exp?.description}
                </li>
              </ul>
              <hr className="mt-5" />
            </div>
          ))}
        </section>

        {/* Volunteer */}

        <section className="mt-6">
          <h2 className="text-[22px] font-[700] leading-[29.7px] text-[#101010] uppercase">
            Volunteer Service
          </h2>
          {resumeData?.volunteer_experience?.map((vol, index) => (
            <div key={index} className="mt-4">
              <p className="font-[500] text-[#101010] text-[22px] leading-[29.7px]">
                {vol?.organization_name}
              </p>
              <p className="text-[15.29px] text-[#101010] mt-2">
                {vol.start_year} {vol?.end_year}
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
          {resumeData?.honors_and_awards?.map((honors, index) => (
            <div key={index} className="mt-1">
              <div className="flex items-center justify-between">
                <p className="font-[500] text-[#101010] text-[22px] leading-[29.7px]">
                  {honors.award_name}
                </p>
                <p className="text-[22.94px] text-[#101010] font-[600]">
                  {honors?.date_Received?.split("T")[0].split("-")[0]}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default PersonalizedCV;
