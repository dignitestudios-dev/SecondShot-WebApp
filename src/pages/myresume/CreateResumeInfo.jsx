import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { CreateResumeimg } from "../../assets/export";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";

const CreateResumeInfo = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/create-resume");
  };
  const dataCreateResume = [
    {
      heading: "What is Resume Creation?",
      para: " Resume Creation is the process of designing a professional document that highlights your qualifications, work history, and achievements. It's your opportunity to make a great first impression on potential employers.",
    },
    {
      heading: "Start Creating",
      para: "   Click the button to begin crafting your personalized resume. We'll guide you through each section, making it easy to input your information and customize your resume to fit your unique career goals.",
    },
    {
      heading: "Download & Edit",
      para: "  Once you've finished creating your resume, download it in an editable format. This allows you to make any necessary changes or updates in the future, ensuring your resume stays up-to-date and tailored to each job application.",
    },
  ];
  return (
    <div className="max-w-screen-xl h-screen mx-auto p-8">
      <div className="flex items-center gap-1 mb-3 mt-3 text-[12px] font-[600]">
        <IoIosArrowBack
          className="font-[600]"
          onClick={() => navigate("/myresume")}
        />
        <span onClick={() => navigate("/myresume")}>BACK</span>
      </div>
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-[32px] font-medium text-gray-800">Create Resume</h1>
        <div className="flex items-center"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-[#061523] to-[#012C57] rounded-2xl p-6 text-white ">
          {dataCreateResume?.map((item, index) => (
            <div>
              {index > 0 && (
                <div className="my-4">
                  <hr className="h-px my-1 w-full bg-slate-50 border-0 opacity-10" />
                </div>
              )}
              <p className="text-[22px] font-[500]">{item?.heading}</p>
              <p className="text-[16px] opacity-70">{item?.para}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 text-black ">
          <div className="w-[70%]">
            <p className="text-[32px] font-[500]">
              Ready to build your perfect Resume?{" "}
            </p>
          </div>
          <div className="flex items-start mt-4">
            <div className="w-[300px]">
              <AuthSubmitBtn
                text={"Create Resume"}
                handleSubmit={() => handleNavigate()}
              />
            </div>
            <div className="mt-4">
              <img
                src={CreateResumeimg}
                alt="logo"
                className="object-cover w-[447px] h-[337.75px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResumeInfo;
