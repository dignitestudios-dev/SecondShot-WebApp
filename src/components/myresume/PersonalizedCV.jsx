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

const PersonalizedCV = () => {
  return (
    <div className="bg-white  mx-auto p-8 rounded-lg shadow-md ">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-[45.88px] font-[600]">
          {resumeData.personalDetails.name}
        </h1>
        <p className="mt-2 flex gap-4 justify-center text-[19.12px] text-[#000000] font-[500] ">
          {resumeData.personalDetails.email}
          <span> {resumeData.personalDetails.phone} </span>
          <span> {resumeData.personalDetails.website}</span>
        </p>
      </div>

      {/* Objective */}
      <section className="mt-6">
        <h2 className="text-[22px] font-[700] uppercase ">Objective</h2>
        <p className="mt-2 text-[20px] font-[400] text-[#101010] ">
          {resumeData.personalDetails.objective}
        </p>
      </section>
      <hr className="mt-6  " />

      {/* Education */}
      <section className="mt-6">
        <h2 className="text-[22px] leading-[29.7px] font-[700] text-[#101010] uppercase">
          Education
        </h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mt-4">
            <div className="flex items-center justify-between ">
              <p className="font-[600] text-[22px]">{edu.school}</p>
              <p className="text-[22.94px] text-[#101010] font-[600] ">
                {edu.date}
              </p>
            </div>

            {edu.details.map((detail, i) => (
              <li
                key={i}
                className="text-[#000000]  pl-5 pt-2 leading-[30.59px] font-[400] text-[20px]"
              >
                {detail}
              </li>
            ))}
          </div>
        ))}
      </section>
      <hr className="mt-5" />

      {/* Certifications */}
      <section className="mt-6">
        <h2 className="text-[22px] leading-[29.7px] text-[#101010] font-[700] uppercase">
          Certifications
        </h2>
        {resumeData.certifications.map((cert, index) => (
          <div key={index} className="mt-4 flex items-center justify-between">
            <li className="font-[500] text-[22px] leading-[29.7px] ">
              {cert.title}
            </li>
            <p className="text-[22.94px] text-[#101010] font-[600]">
              {cert.date}
            </p>
          </div>
        ))}
      </section>
      
      <hr className="mt-5" />
      <section className="mt-6">
        <h2 className="text-[22px] font-[700] ">Skills</h2>
        <div className="mt-4">
          <p className="text-[22px] font-[500] text-[#0F0F0F]  ">Soft Skills</p>
          <ul className="flex list-disc justify-between ml-6 mt-2">
            {resumeData.softSkills.map((skill, index) => (
              <li
                key={index}
                className=" font-[400] text-[20px] text-[#0F0F0F] leading-[16px] "
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <p className="text-[22px] font-[500] text-[#0F0F0F]  ">
            Technical Skills
          </p>
          <ul className="flex list-disc justify-between ml-6 mt-2">
            {resumeData.technicalSkills.map((skill, index) => (
              <li
                key={index}
                className=" font-[400] text-[20px] text-[#0F0F0F] leading-[16px] "
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* Experience */}
      <hr className="mt-4" />
      <section className="mt-6">
        <h2 className="text-[22px] font-[700] text-[#101010] uppercase">
          Work Experience
        </h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mt-4">
            <div className="flex justify-between items-center">
              <p className="font-[600] leading-[30.97px] text-[#101010] text-[22.94px]">
                {exp.company}
              </p>
              <p className="font-[600] leading-[22.94px] text-[#101010] text-[22.94px]">
                {exp.date}
              </p>
            </div>
            <p className="font-[500] text-[#0F0F0F]  leading-[29.7px] text-[22px]">
              {exp.role}
            </p>

            <ul className="list-disc ml-6 mt-2">
              {exp.duties.map((duty, i) => (
                <li
                  key={i}
                  className="text-[#000000] text-[20px] font-[400] leading-[30.59px] "
                >
                  {duty}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <hr className="mt-5" />
     
      {/* Volunteer */}

      

      <section className="mt-6">
        <h2 className="text-[22px] font-[700] leading-[29.7px] text-[#101010] uppercase">
          Volunteer Service
        </h2>
        {resumeData.volunteer.map((vol, index) => (
          <div key={index} className="mt-4">
            <p className="font-[500] text-[#101010] text-[22px] leading-[29.7px]">
              {vol.title}
            </p>
            <p className="text-[15.29px] text-[#101010] mt-2">{vol.date}</p>
            <ul className="list-outside list-disc">
              <li className="text-gray-700 mt-2 ">{vol.description}</li>
            </ul>
          </div>
        ))}
      </section>
      <hr className="mt-5" />
      <section className="mt-6">
        <h2 className="text-[22px] font-[700] leading-[29.7px] text-[#101010] uppercase">
          Honors
        </h2>
        {resumeData.honors.map((vol, index) => (
          <div key={index} className="mt-4">
            <div className="flex items-center justify-between">
              <p className="font-[500] text-[#101010] text-[22px] leading-[29.7px]">
                {vol.title}
              </p>
              <p className="text-[22px] font-[500] text-[#101010] leading-[29.7px] ">{vol.date}</p>
            </div>
         
          </div>
        ))}
      </section>
    </div>
  );
};

export default PersonalizedCV;
