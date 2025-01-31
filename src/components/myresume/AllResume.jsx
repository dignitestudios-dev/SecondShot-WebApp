import React, { useEffect, useState } from "react";
import axios from "../../axios";
const resumeData = {
  personalDetails: {
    name: "Sanethia Thomas",
    email: "sanethia@yoursecondshot.com",
    phone: "555-123-4567",
    website: "www.sanethia.com",
    objective:
      "To obtain a faculty position in higher education to teach computer science and athlete development.",
  },
  education: [
    {
      school: "University of Florida, Gainesville, FL",
      date: "2019",

      details: [
        "Doctor of Philosophy in Computer Information & Science & Engineering",
        "Human Centered Computing, User Experience, Athlete Development",
      ],
    },
    {
      school: "Clemson University, Clemson, SC",
      date: "2014",
      degree: [],
      details: [
        "Master of Science in Youth Development Leadership, Phi Kappa Phi -Top 10%",
      ],
    },
    {
      school: "University of Texas El Paso, El Paso, TX",
      date: "2002",
      degree: [],

      details: [
        "Bachelor of Business Administration - Information Technology, Athletic Scholar",
      ],
    },
  ],
  certifications: [
    {
      title:
        "Professional Association of Athlete Development Specialist (PAADS)",
      date: "2019",
      location: "Gainesville, FL",
    },
  ],
  experience: [
    {
      role: "Assistant Instructional Professor",
      company: "University of Florida, Gainesville, FL",
      date: "2019 - Current",
      duties: [
        "Develop and teach core computing classes for Computer & Information Science & Engineering Department.",
        "Develop and lead experiential learning experiences for AI in computing nationally and internationally.",
      ],
    },
    {
      role: "UX Researcher",
      company: "Intel, Hillsboro, OR",
      date: "2015",
      duties: [
        "Project lead for end user testing and UX research of technology solutions across various system platforms.",
        "Performed heuristic evaluations and system usability tests.",
      ],
    },
  ],
  volunteer: [
    {
      title: "Cape Town South Africa Study Abroad",
      date: "JUNE 2024",
      description:
        "Developed UF’s first AI study abroad program in Cape Town, South Africa, partnering with three nonprofit organizations to create software solutions. Projects included an AI predictive analysis map for 65,000 displaced residents, text and image generation for 269 acres of wetland conservation area, and an intelligent tutoring system for 400 students.",
    },
  ],
  honors: [
    {
      title: "AI Teacher of the  Year, University of Florida",
      date: "2024",
    },
    {
      title:
        "Graduate Research Fellowship Program (GRFP), National Science   Foundation ",
      date: "2015",
    },
  ],
  softSkills: [
    "Problem-Solver",
    "Strategic Thinker",
    "Detailed Oriented",
    "Process Oriented",
  ],
  technicalSkills: [
    "Python",
    "Java",
    "JavaScript",
    "Software Engineering",
    "User Experience Design",
  ],
};

const AllResume = ({ resume }) => {
  console.log(resume, "Data");
  return (
    <div>
      <div className="bg-white  p-2 rounded-lg shadow-md ">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-[8.88px] font-[600]">{resume?.userId?.name}</h1>
          <p className="mt-1 flex gap-4 justify-center text-[5.12px] text-[#000000] font-[500] ">
            <span> {resume?.userId?.email} </span>
            <span> {resume?.userId?.phone}</span>
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
                  <p className="font-[600] text-[5px]">
                    {ctr?.certification_name}
                  </p>
                  <p className="text-[3.94px] text-[#101010] font-[600]">
                    {ctr?.issue_date?.split("T")[0]} -{" "}
                    {ctr?.expiration_date
                      ? ctr.expiration_date.split("T")[0]
                      : "Present"}
                  </p>
                </div>

                <li className="text-[#000000] pl-1 leading-[10.59px] font-[400] text-[5px]">
                  {ctr?.issuing_organization || "issuing_organization"}
                </li>
              </div>
            ))}
            <hr className="mt-1" />
          </section>
        )}
        {/* Certifications */}

        {(resume?.soft_skills?.length > 0 ||
          resume?.technical_skills?.length > 0) && (
          <section className="mt-1">
            <h2 className="text-[5px] font-[700]">Skills</h2>

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
                      className="font-[400] text-[5px] text-[#0F0F0F] leading-[16px]"
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
        <hr className="mt-1" />
        <section className="mt-2">
          <h2 className="text-[5px] font-[700] text-[#101010] uppercase">
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

        {/* Volunteer */}

        <section className="mt-1">
          <h2 className="text-[5px] font-[700] leading-[6.7px] text-[#101010] uppercase">
            Volunteer Service
          </h2>
          {resume?.volunteer_experience?.map((vol, index) => (
            <div key={index} className="">
              <p className="font-[500] text-[#101010] text-[5px] leading-[10.7px]">
                {vol?.organization_name}
              </p>
              <p className="text-[3.9px] text-[#101010]   ">
                {vol.start_year} {vol?.end_year}
              </p>
              <ul className="list-outside list-disc">
                <li className="text-gray-700 mt-1 ml-3 text-[4px]">
                  {vol?.description}
                </li>
              </ul>
            </div>
          ))}
        </section>
        <hr className="mt-1" />
        <section className="mt-2">
          <h2 className="text-[5px] font-[700] leading-[1.7px] text-[#101010] uppercase">
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
      </div>
    </div>
  );
};

export default AllResume;
