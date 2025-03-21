import React from "react";

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
      date: "2024",
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

const SideResume = ({ step }) => {
  return (
    <div className="bg-gradient-to-br w-[612px] from-[#012C57] h-[1000px] to-[#061523]  mx-auto p-8 rounded-[28px] mt-5 shadow-md ">
      {/* Header Section */}
      <div className="text-center text-white mb-2 ">
        <h1>Sample Template</h1>
      </div>
      <div
        className={`text-center ${
          step === 1 ? "text-[#56EC17]" : " text-white"
        }`}
      >
        <h1 className="text-[24px]  font-[600]">
          {resumeData.personalDetails.name}
        </h1>
        <p className=" flex gap-2 justify-center text-[10px]  font-[500] ">
          {resumeData.personalDetails.email}
          <span> {resumeData.personalDetails.phone} </span>
          <span> {resumeData.personalDetails.website}</span>
        </p>
      </div>

      {/* Objective */}
      <section className="mt-4 border-b border-[#FFFFFF1F] pb-3">
        <div className={` ${step === 2 ? "text-[#56EC17]" : " text-white"}`}>
          <h2 className="text-[12px] font-[600] uppercase  ">Objective</h2>
          <p className="mt-1 text-[10px] font-[400]  ">
            {resumeData.personalDetails.objective}
          </p>
        </div>
      </section>

      {/* Education */}
      <section
        className={`mt-1 border-b border-[#FFFFFF1F] pb-3 ${
          step === 3 ? "text-[#56EC17]" : " text-white"
        }`}
      >
        <h2 className="text-[12px] leading-[29.7px] font-[600]  uppercase">
          Education
        </h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="">
            <div className="flex items-center justify-between ">
              <p className="font-[500] text-[12px] uppercase mt-1 ">
                {edu.school}
              </p>
              <p className="text-[12px]  font-[600] ">{edu.date}</p>
            </div>

            {edu.details.map((detail, i) => (
              <li
                key={i}
                className={`pl-5  leading-[20.59px] font-[400] text-[10px] ${
                  step === 3 ? "text-[#56EC17]" : " text-[#E0E0E0]"
                }`}
              >
                {detail}
              </li>
            ))}
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section
        className={`mt-2 border-b border-[#FFFFFF1F] pb-3 ${
          step === 4 ? "text-[#56EC17]" : " text-white"
        }`}
      >
        <h2 className="text-[12px] leading-[16.2px]  font-[600] uppercase">
          Certifications
        </h2>
        {resumeData.certifications.map((cert, index) => (
          <div key={index} className=" flex items-center justify-between">
            <li
              className={`font-[400] text-[10px]   ${
                step === 4 ? "text-[#56EC17]" : " text-[#E0E0E0]"
              } leading-[16px] `}
            >
              {cert.title}
            </li>
            <p className="text-[12px]  font-[500]">{cert.date}</p>
          </div>
        ))}
      </section>

      <section
        className={`mt-2 border-b border-[#FFFFFF1F] pb-3 ${
          step === 5 ? "text-[#56EC17]" : " text-white"
        }`}
      >
        <h2 className="text-[12px] font-[600]   uppercase ">Skills</h2>
        <div className="mt-2">
          <p className="text-[12px] font-[500]  leading-[16.2px]  ">
            Soft Skills
          </p>
          <ul className="flex list-disc justify-between ml-6 mt-2">
            {resumeData.softSkills.map((skill, index) => (
              <li
                key={index}
                className={`font-[400] text-[10px]   ${
                  step === 5 ? "text-[#56EC17]" : " text-[#E0E0E0]"
                } leading-[16px]`}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <p className="text-[12px] font-[500]   ">Technical Skills</p>
          <ul className="flex list-disc justify-between ml-6 mt-2">
            {resumeData.technicalSkills.map((skill, index) => (
              <li
                key={index}
                className={`font-[400] text-[10px]   ${
                  step === 5 ? "text-[#56EC17]" : " text-[#E0E0E0]"
                } leading-[16px]`}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* Experience */}

      <section
        className={`mt-2 border-b border-[#FFFFFF1F] pb-3 ${
          step === 6 ? "text-[#56EC17]" : " text-white"
        }`}
      >
        <h2 className="text-[12px] font-[600]  uppercase">Work Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mt-1">
            <div className="flex justify-between items-center">
              <p className="font-[600] leading-[30.97px]  text-[12px]">
                {exp.company}
              </p>
              <p className="font-[400] leading-[22.94px]  text-[12px]">
                {exp.date}
              </p>
            </div>
            <p
              className={`font-[400] ${
                step === 6 ? "text-[#56EC17]" : " text-[#FFFFFF87]"
              }  leading-[16.2px] text-[12px]`}
            >
              {exp.role}
            </p>

            <ul className="list-disc ml-6 mt-2">
              {exp.duties.map((duty, i) => (
                <li
                  key={i}
                  className={`text-[10px] ${
                    step === 6 ? "text-[#56EC17] " : "text-[#E0E0E0] "
                  } font-[400] leading-[16px] `}
                >
                  {duty}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section
        className={`mt-2 border-b border-[#FFFFFF1F] pb-3 ${
          step === 7 ? "text-[#56EC17]" : "text-white"
        }`}
      >
        <h2 className="text-[12px] font-[600] leading-[29.7px]  uppercase">
          Volunteer Service
        </h2>
        {resumeData.volunteer.map((vol, index) => (
          <div key={index} className="mt-">
            <p className=" flex items-center justify-between font-[500]  text-[12px] leading-[29.7px]">
              {vol.title}
              <p className="text-[12px]  ">{vol.date}</p>
            </p>
            <ul className="list-outside list-disc pl-3">
              <li
                className={` mt-2 text-[10px] leading-[16px] ${
                  step === 7 ? "text-[#56EC17]  " : "text-[#E0E0E0]"
                } `}
              >
                {vol.description}
              </li>
            </ul>
          </div>
        ))}
      </section>

      <section
        className={`mt-2 ${step === 8 ? "text-[#56EC17]" : "text-white"}`}
      >
        <h2 className="text-[12px] font-[600] leading-[16.2px]  uppercase">
          Honors
        </h2>
        {resumeData.honors.map((vol, index) => (
          <div key={index} className="mt-2">
            <div className="flex items-center justify-between">
              <p className="font-[500] text-[12px] leading-[16.2px]">
                {vol.title}
              </p>
              <p className="text-[12px] font-[500]  leading-[16.2px] ">
                {vol.date}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SideResume;
