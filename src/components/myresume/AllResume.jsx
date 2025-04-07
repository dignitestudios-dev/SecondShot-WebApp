import React from "react";

const AllResume = ({ resume }) => {
  const phoneFormater = (input) => {
    if (!input) return "";

    const cleaned = input.replace(/\D/g, "");

    if (cleaned.length > 3 && cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else if (cleaned.length > 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6,
        10
      )}`;
    } else if (cleaned.length > 0) {
      return `(${cleaned}`;
    }

    return cleaned;
  };

  return (
    <div>
      <div className="bg-white h-[280px] resumefonts overflow-x-auto overflow-hidden    p-2 rounded-lg shadow-md ">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-[8.88px] font-[600]">{resume?.full_name}</h1>
          <p className="mt-1 flex gap-4 justify-center text-[5.12px] text-[#000000] font-[500] ">
            <span> {resume?.email} </span>
            <span>+1 {phoneFormater(resume?.phone)}</span>
          </p>
        </div>

        {/* Objective */}
        <section className="mt-2">
          <h2 className="text-[5px] font-[700] uppercase ">Objective</h2>
          <p className="mt-1 text-[5px] font-[400] text-[#101010] ">
            {resume?.objective?.description}
          </p>
        </section>

        {/* Education */}
        {resume?.education?.length > 0 && (
          <section className="mt-1">
            <hr className="mt-1 " />
            <h2 className="text-[5px] leading-[9.7px] font-[700] text-[#101010] uppercase">
              Education
            </h2>

            {resume?.education?.map((edu, i) => (
              <div key={i} className="mt-1">
                <div className="flex items-center justify-between">
                  <p className="font-[600] text-[5px]">{edu?.institution}</p>
                  <p className="text-[3.94px] text-[#101010] font-[600]">
                    {edu?.start_year} - {edu?.end_year || "Present"}
                  </p>
                </div>

                {edu?.details?.map((detail, j) => (
                  <li
                    key={j}
                    className="text-[#000000] pl-1 leading-[10.59px] font-[400] text-[5px]"
                  >
                    {detail?.field_of_study || "No field of study"}
                  </li>
                ))}
              </div>
            ))}
            <hr className="mt-1" />
          </section>
        )}
        {resume?.licenses_and_certifications?.length > 0 && (
          <section className="mt-1">
            <h2 className="text-[5px] leading-[9.7px] font-[700] text-[#101010] uppercase">
              Certifications
            </h2>

            {resume?.licenses_and_certifications?.map((ctr, i) => (
              <div key={i} className="mt-1">
                <div className="flex items-center justify-between">
                  <li className="font-[600] text-[5px]">
                    {ctr?.certification_name}
                  </li>
                  <p className="text-[3.94px] text-[#101010] font-[600]">
                    {ctr?.issue_date?.split("T")[0]} -{" "}
                    {ctr?.expiration_date
                      ? ctr.expiration_date.split("T")[0]
                      : "Present"}
                  </p>
                </div>

                {/* <li className="text-[#000000] pl-1 leading-[10.59px] font-[400] text-[5px]">
                  {ctr?.issuing_organization || "issuing_organization"}
                </li> */}
              </div>
            ))}
          </section>
        )}
        {/* Certifications */}

        {(resume?.soft_skills?.length > 0 ||
          resume?.technical_skills?.length > 0) && (
          <section className="mt-1">
            <hr className="mt-1" />
            <h2 className="text-[5px] mt-2 font-[700]">Skills</h2>

            {/* Soft Skills */}
            {resume?.soft_skills?.length > 0 && (
              <div className="mt-1">
                <p className="text-[5px] font-[500] text-[#0F0F0F]">
                  Soft Skills
                </p>
                <ul className="flex list-disc flex-wrap gap-2 ml-3 text-wrap">
                  {resume?.soft_skills?.map((skill, index) => (
                    <li
                      key={index}
                      className="font-[400] text-[5px] text-[#0F0F0F] "
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Skills */}
            {resume?.technical_skills?.length > 0 && (
              <div className="mt-1">
                <p className="text-[5px] font-[500] text-[#0F0F0F]">
                  Technical Skills
                </p>
                <ul className="flex list-disc flex-wrap gap-2 ml-3 mt-1 text-wrap">
                  {resume?.technical_skills?.map((skill, index) => (
                    <li
                      key={index}
                      className="font-[400] text-[5px] text-[#0F0F0F] leading-[16px]"
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
        {resume?.experience?.length > 0 && (
          <section className="mt-2">
            <hr className="mt-1" />
            <h2 className="text-[5px] mt-2 font-[700] text-[#101010] uppercase">
              Work Experience
            </h2>
            {resume?.experience?.map((exp, index) => (
              <div key={index} className="mt-1">
                <div className="flex justify-between items-center">
                  <p className="font-[600] leading-[0.97px] text-[#101010] text-[5.94px]">
                    {exp?.company}
                  </p>
                  <p className="font-[600] leading-[5.94px] text-[#101010] text-[3.94px]">
                    {exp?.start_date?.split("T")[0]} -{" "}
                    {exp.end_date?.split("T")[0]}
                  </p>
                </div>
                <p className="font-[500] text-[#0F0F0F]  leading-[8.7px] text-[5px]">
                  {exp.job_title}
                </p>

                <ul className="list-disc ml-3 mt-1">
                  <li className="text-[#000000] text-[5px] font-[400] leading-[6.59px] ">
                    {exp?.description}
                  </li>
                </ul>
                <hr className="mt-1" />
              </div>
            ))}
          </section>
        )}
        {/* Volunteer */}
        {resume?.volunteer_experience?.length > 0 && (
          <section className="mt-1">
            <h2 className="text-[5px] font-[700] leading-[6.7px] text-[#101010] uppercase">
              Volunteer Service
            </h2>
            {resume?.volunteer_experience?.map((vol, index) => (
              <div key={index} className="">
                <div className="flex justify-between items-center">
                  <p className="font-[500] text-[#101010] text-[5px] leading-[10.7px]">
                    {vol?.organization_name}
                  </p>
                  <p className="text-[3.9px] text-[#101010]   ">
                    {vol.start_year} {vol?.end_year}
                  </p>
                </div>
                <ul className="list-outside list-disc">
                  <li className="text-gray-700 mt-1 ml-3 text-[4px]">
                    {vol?.description}
                  </li>
                </ul>
              </div>
            ))}
          </section>
        )}
        {resume?.honors_and_awards?.length > 0 && (
          <section className="mt-2">
            <hr className="mt-1" />
            <h2 className="text-[5px] mt-2 font-[700] leading-[1.7px] text-[#101010] uppercase">
              Honors
            </h2>
            {resume?.honors_and_awards?.map((honors, index) => (
              <div key={index} className="mt-1">
                <div className="flex items-center justify-between">
                  <p className="font-[500] text-[#101010] text-[5px] leading-[1.7px]">
                    {honors.award_name}
                  </p>
                  <p className="text-[3px] font-[500] text-[#101010] leading-[4.7px] ">
                    {honors?.date_Received?.split("T")[0]}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default AllResume;
