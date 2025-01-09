import React from "react";
import { resumetemplate } from "../../assets/export";

const resumeData = {
  personalDetails: {
    name: "Sanethia Thomas",
    email: "sanethia@yoursecondshot.com",
    phone: "571-839-3345",
    website: "www.sanethia.com",
    objective:
      "To obtain a faculty position in higher education to teach computer science and athlete development.",
  },
  education: [
    {
      school: "University of Florida, Gainesville, FL",
      date: "JUNE 2019",
      degree:
        "Doctor of Philosophy in Computer Information & Science & Engineering",
      details: [
        "Human Centered Computing, User Experience, Athlete Development",
      ],
    },
    {
      school: "Clemson University, Clemson, SC",
      date: "FEB 2014",
      degree:
        "Master of Science in Youth Development Leadership, Phi Kappa Phi - Top 10%",
      details: [],
    },
    {
      school: "University of Texas El Paso, El Paso, TX",
      date: "FEB 2002",
      degree:
        "Bachelor of Business Administration - Information Technology, Athletic Scholar",
      details: [],
    },
  ],
  certifications: [
    {
      title:
        "Professional Association of Athlete Development Specialist (PAADS)",
      date: "FEB 2019",
      location: "Gainesville, FL",
    },
  ],
  experience: [
    {
      role: "Assistant Instructional Professor",
      company: "University of Florida, Gainesville, FL",
      date: "JUNE 2019 - Current",
      duties: [
        "I develop and teach core computing classes for Computer & Information Science & Engineering Department",
        "I develop and lead experiential learning experiences for AI in computing nationally and internationally",
      ],
    },
    {
      role: "UX Researcher",
      company: "Intel, Hillsboro, OR",
      date: "JUNE 2015",
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
        "I developed UF’s first AI study abroad program in Cape Town, South Africa, partnering with three nonprofit organizations to create software solutions. Projects included an AI predictive analysis map for 65,000 displaced residents, text and image generation for 269 acres of wetland conservation area, and an intelligent tutoring system for 400 students. I also organized guest speakers from local AI technology companies.",
    },
  ],
  honors: [
    {
      title: "AI Teacher of the Year",
      date: "JUNE 2024",
      organization: "University of Florida",
    },
    {
      title: "Graduate Research Fellowship Program (GRFP)",
      date: "JUNE 2024",
      organization: "National Science Foundation",
    },
  ],
  softSkills: [
    "Problem-Solver",
    "Strategic Thinker",
    "Detailed Oriented",
    "Process oriented",
  ],
  technicalSkills: [
    "Python",
    "Java",
    "Javascript",
    "Software Engineering",
    "User Experience Design",
  ],
};

const Resume = () => {
  return (
    <div className="">
      <img src={resumetemplate} alt="" />
      {/* <div className="col-span-2">
        <p className="text-[45.88px] font-[600] leading-[61.94px]">
          {resumeData.personalDetails.name}
        </p>
        <p className="flex gap-4">
          <span className="text-[19.12px] font-[500] leading-[25.81px]">
            {resumeData.personalDetails.email}
          </span>
          <span className="text-[19.12px] font-[500] leading-[25.81px]">
            {resumeData.personalDetails.phone}
          </span>
          <span className="text-[19.12px] font-[500] leading-[25.81px]">
            {resumeData.personalDetails.website}
          </span>
        </p>

        <div className="my-2">
          <p className="text-[22.94px] font-[700] leading-[30.97px] uppercase mt-5">
            Objective
          </p>
          <p className="text-[18.12px] w-[585px] leading-[25.81px] text-[#101010] font-[400]">
            {resumeData.personalDetails.objective}
          </p>
        </div>

        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-2 mt-6 pr-2">
            <p className="text-[22.94px] font-[700] leading-[30.97px] uppercase mt-5">
              {edu.school}
            </p>
            <p className="text-[15.29px] text-[#101010] font-[400] mt-2">
              {edu.date}
            </p>
            <ul className="list-disc mt-3 list-inside">
              <li className="text-[18.12px] text-[#000000] font-[400] leading-[30.59px]">
                {edu.degree}
              </li>
              {edu.details.map((detail, i) => (
                <li
                  key={i}
                  className="text-[18.12px] text-[#000000] font-[400] leading-[30.59px]"
                >
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {resumeData.certifications.map((cert, index) => (
          <div key={index} className="mb-2 mt-6 pr-2">
            <p className="text-[22.94px] font-[700] leading-[30.97px] uppercase mt-5">
              Certifications
            </p>
            <p className="text-[15.29px] mt-2 font-[500] leading-[20.65px] uppercase ">
              {cert.date}
            </p>
            <ul className="list-disc list-inside">
              <li className="text-[18.12px] mt-3 text-[#000000] font-[400] leading-[30.59px]">
                {cert.title}, {cert.location}
              </li>
            </ul>
          </div>
        ))}

        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-2 mt-6 pr-2">
            <p className="text-[22.94px] font-[700] leading-[30.97px] text-[#101010]">
              Professional Experience
            </p>
            <p className="text-[22.94px] leading-[30.97px] font-[500] mt-3">
              {exp.company}{" "}
              <span className="text-[22.94px] text-[#00000087] font-[400] leading-[30.97px]">
                {" "}
                {exp.role}
              </span>
            </p>
            <p className="text-[15.29px] text-[#101010] font-[400]">
              {exp.date}
            </p>
            <ul className="list-disc list-inside">
              {exp.duties.map((duty, i) => (
                <li
                  key={i}
                  className="text-[18.12px] text-[#000000] font-[400]"
                >
                  {duty}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {resumeData.volunteer.map((vol, index) => (
          <div key={index} className="mb-2 mt-6 pr-2">
            <p className="text-[22.94px] font-[700] leading-[30.97px] mt-5">
              Volunteer Service
            </p>
            <p className="text-[22.94px] font-[500] leading-[30.97px]">
              {vol.title}
            </p>
            <p className="text-[15.29px] mt-2 font-[500] leading-[20.65px] uppercase ">
              {vol.date}
            </p>
            <ul className="list-disc list-outside">
              <li className="text-[19.12px] mt-3 text-[#000000] font-[400] leading-[30.59px]">
                {vol.description}
              </li>
            </ul>
          </div>
        ))}

        {resumeData.honors.map((honor, index) => (
          <div key={index} className="mb-2 mt-6 pr-2">
            <p className="text-[22.94px] font-[700] leading-[30.97px] mt-5">
              Honors
            </p>
            <p className="text-[15.29px] mt-2 font-[500] leading-[20.65px] uppercase ">
              {honor.date}
            </p>
            <ul className="list-disc list-outside">
              <li className="text-[19.12px] mt-3 text-[#000000] font-[400] leading-[30.59px]">
                {honor.title}, {honor.organization}
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div>
        <div className="my-6">
          <p className="text-[22.94px] font-[700] leading-[30.97px] mb-1">
            Soft Skills
          </p>
          <ul className="list-disc list-inside">
            {resumeData.softSkills.map((skill, index) => (
              <li
                key={index}
                className="text-[18px] text-[#858585] font-medium"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <p className="text-[24px] font-[700] mb-1">Technical Skills</p>
          <ul className="list-disc list-inside">
            {resumeData.technicalSkills.map((skill, index) => (
              <li
                key={index}
                className="text-[18px] text-[#858585] font-medium"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default Resume;
