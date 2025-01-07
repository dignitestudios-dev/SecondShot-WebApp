import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Backbutton from "../../components/Global/Backbutton";
import { IoIosArrowBack } from "react-icons/io";
import { BsFillBookmarkStarFill } from "react-icons/bs";

function CareerDetails() {
  const [selectedButton, setSelectedButton] = useState("Health Science");
  const buttons = [
    "Health Science",
    "Information Technology",
    "Business Management and Administration",
    "Marketing",
    "Manufacturing",
  ];
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="mb-3">
        <div className="flex items-center gap-1 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
          <div>
            <IoIosArrowBack
              className="font-[600]"
              onClick={() => navigate("/careerrecommendation")}
            />
          </div>
          <div onClick={() => navigate("/careerrecommendation")}>BACK</div>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-[0px_8px_50px_0px_rgba(0,0,0,0.06)] p-8 backdrop-blur-[100px]">
        <div className="w-full mb-5 flex justify-between items-center">
          <div className="w-[80%]">
            <h1 className="text-[32px]  font-[500] text-[#000000] leading-[43.2px] mb-1">
              Your Recommended Careers are:
            </h1>
          </div>
          <p className="text-[18px] text-[#000000] font-[500]"> Sept/03/2024</p>
        </div>
        <div className="space-y-8">
          <div>
            <div className="mb-2">
              {buttons.map((button) => (
                <button
                  key={button}
                  className={`${
                    selectedButton === button
                      ? "bg-gradient-to-r from-[#061523] to-[#012C57] text-white"
                      : "bg-[#F6F6F6] text-[#474747]"
                  } h-[49px]  font-[500] w-[auto] pt-3 pb-3 rounded-lg mr-2 mb-2 text-[14px] leading-[18.9px] pl-3 pr-3`}
                  onClick={() => setSelectedButton(button)}
                >
                  {button}
                </button>
              ))}
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h3 className="text-[28px] font-[500] text-[#000000] py-2">
                Health Science
              </h3>
              <div>
                <BsFillBookmarkStarFill
                  size={"27px"}
                  className="transition duration-200   group-hover:text-white text-gray-500"
                />
              </div>
            </div>
            <p className="text-[#000000cc] font-[400] text-[16px] ">
              Health and science is a diverse field encompassing various
              professions dedications to improving human health and
              understanding teh nature world. From healthcare to scientific
              research, this cluster offers opportunities to make a positive
              impact on society.
            </p>
          </div>
          <hr class="h-px my-8 bg-gray-300 border-0" />

          <div className="bg-white rounded-lg">
            <div className="grid grid-cols-3 divide-x-[1px] gap-4 text-[#011225]">
              <ul className="pl-1 space-y-6 list-disc list-inside text-[18px]">
                <h3 className="text-[22px] font-medium text-[#000000]">
                  Sample Job Titles
                </h3>
                {[
                  "Bio medical scientist",
                  "Environmental scientist",
                  "Bio medical scientist",
                  "Pharmacist",
                ]?.map((item, index) => (
                  <li className="font-[500] text-[18px]">{item}</li>
                ))}
              </ul>

              <ul className=" pl-8 space-y-6 list-disc list-inside">
                <h3 className="text-[22px] font-medium text-[#011225] ">
                  Career Pathways
                </h3>
                {[
                  "Nursing",
                  "Bio medical scientist",
                  "Environmental Health",
                  "Medicine",
                  "Public Health",
                ]?.map((item, index) => (
                  <li className="font-[500] text-[18px]">{item}</li>
                ))}
              </ul>
              <ul className="pl-8 space-y-6 list-disc list-inside">
                <h3 className="text-[22px] font-medium text-[#011225] mb-2">
                  Education & Training
                </h3>

                {[
                  "Bachelor’s degrees in nursing, biology, or environmental science",
                  "Master’s degrees in public health or healthcare administration",
                  "Doctoral degrees in medicine, pharmacy, or biomedical research",
                ]?.map((item, index) => (
                  <li
                    key={index}
                    className="font-[500] list-outside text-[18px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr class="h-px my-8 bg-gray-300 border-0" />

          <div>
            <h3 className="text-[22px] font-[600] leading-[32.67px] text-[#011225]">
              Career Growth and Opportunities{" "}
            </h3>
            <p className="text-[#000000cc]">
              Health and science professionals have opportunities for career
              advancement and specialization, They may pursue additional
              certifications, participate in continuing education programs, or
              transition into leadership roles within healthcare organizations,
              research institutions, or government agenciesHealth and science
              professionals have opportunities for career advancement and
              specialization
            </p>
          </div>
          <div>
            <p className="text-[#000000cc]">
              Health and science professionals have opportunities for career
              advancement and specialization, They may pursue additional
              certifications, participate in continuing education programs, or
              transition into leadership roles within healthcare organizations,
              research institutions, or government agencies Health and science
              professionals have opportunities for career advancement and
              specialization, They may pursue additional certifications,
              participate in continuing education programs, or transition into
              leadership roles within healthcare organizations, research
              institutions, or government agencies
            </p>
            <h3 className="text-[18px] font-medium text-[#011225] mt-2">
              Explore More
            </h3>
            <p className="text-[#0E73D0] underline">www.healthscience.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerDetails;
