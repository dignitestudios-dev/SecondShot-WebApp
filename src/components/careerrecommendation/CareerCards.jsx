import React from "react";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CareerCards = ({ icon }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/career-assessment");
  };
  return (
    <div>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <div
              onClick={() => navigate("/careerdetails")}
              key={index}
              className="group relative rounded-[24px]  h-[342px] p-4 bg-[#F6F8FF] text-black shadow-lg cursor-pointer hover:bg-gradient-to-l from-[#012C57] to-[#061523] hover:text-white transition duration-200"
            >
              <div className="absolute top-4 right-4  ">{icon}</div>

              <div className="flex flex-col text-left mb-4">
                <span className="text-[24px] font-[500] leading-[32.4px] group-hover:text-white transition duration-200">
                  Career
                </span>
                <span className="text-[24px] font-[500] leading-[32.4px] group-hover:text-white transition duration-200">
                  Recommendations
                </span>
              </div>

              <div className="space-y-2 mb-6 text-left">
                {[
                  "Business Management & Admin",
                  "Health Science",
                  "Information Technology",
                  "Marketing",
                  "Manufacturing",
                ].map((field, index) => (
                  <>
                    {index === 0 ? (
                      <div
                        key={index}
                        className="inline-block text-center px-3 h-[43px] py-1 text-[14px] font-[400] leading-[18.9px] rounded-[10px] bg-transparent border border-gray-400 text-[#000000] group-hover:border-white group-hover:text-white transition duration-200 mr-2 align-middle"
                        style={{ lineHeight: "35px" }}
                      >
                        Health Science
                      </div>
                    ) : (
                      <div
                        className="inline-block text-center px-3 h-[43px] py-1 text-[14px] font-[400] leading-[18.9px] rounded-[10px] bg-transparent border border-gray-400 text-[#000000] group-hover:border-white group-hover:text-white transition duration-200 mr-2 align-middle"
                        style={{ lineHeight: "35px" }}
                      >
                        {field}
                      </div>
                    )}
                  </>
                ))}
              </div>

              <div className="text-sm flex justify-between items-center group-hover:text-white">
                <span className="text-[16px] font-[500] leading-[21.6px] ">{`July/10/2024`}</span>
                <button className="p-2 rounded-[8px] flex items-center justify-center bg-[#012C57] w-[43px] h-[43px] text-center text-white group-hover:bg-white group-hover:text-[#012C57] transition duration-200">
                  <IoIosArrowForward size={"16px"} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CareerCards;
