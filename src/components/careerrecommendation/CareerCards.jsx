import React, { useState } from "react";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { SuccessToast } from "../toaster/ToasterContainer";
const CareerCards = ({ carrerData, loading, getallcarrerrecommendation }) => {
  const navigate = useNavigate();
  const [loader, setloader] = useState({});
  const handleCareerLike = async (recommendationId, careerIds) => {
    setloader((prevState) => ({
      ...prevState,
      [recommendationId]: true,
    }));
    try {
      const response = await axios.post("/api/user/toggle-favorite-career", {
        recommendationId: recommendationId,
        careers: careerIds,
      });
      if (response.status === 200) {
        SuccessToast(response?.data?.message);
        getallcarrerrecommendation();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setloader((prevState) => ({
        ...prevState,
        [recommendationId]: false,
      }));
    }
  };

 
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="group relative lg:w-[400px] md:w-auto rounded-[24px] h-auto p-4 bg-[#F6F8FF] text-black shadow-lg cursor-pointer hover:bg-gradient-to-l from-[#012C57] to-[#061523] hover:text-white transition duration-200 animate-pulse"
              >
                <div className="absolute top-4 right-4 bg-gray-300 rounded-full w-6 h-6" />

                <div className="flex flex-col text-left mb-4">
                  <div className="w-3/4 h-6 bg-gray-300 rounded-md mb-2" />
                  <div className="w-2/4 h-6 bg-gray-300 rounded-md" />
                </div>

                <div className="space-y-2 mb-6 text-left">
                  <div className="w-3/4 h-11 bg-gray-300 rounded-md" />
                  <div className="w-2/4 h-11 bg-gray-300 rounded-md" />
                </div>

                <div className="text-sm flex justify-between items-center group-hover:text-white">
                  <div className="w-1/2 h-6 bg-gray-300 rounded-md" />

                  <div className="w-11 h-11 bg-gray-300 rounded-full" />
                </div>
              </div>
            ))
        ) : carrerData?.length === 0 ? (
          <div className="col-span-full text-center text-lg text-gray-500">
            No career recommendations found.
          </div>
        ) : (
          carrerData?.map((recommendation, recommendationIndex) => (
            <div
              key={recommendationIndex}
              className="group relative rounded-[24px] h-auto p-4 bg-[#F6F8FF] text-black shadow-lg cursor-pointer hover:bg-gradient-to-l from-[#012C57] to-[#061523] hover:text-white transition duration-200"
            >
              {" "}
              {loader[recommendation?.recommendationId] ? (
                <span className="absolute top-4 right-4 animate-pulse text-green-500">
                  <BsFillBookmarkStarFill size={"27px"} />
                </span>
              ) : (
                <div className="absolute top-4 right-4">
                  {" "}
                  <BsFillBookmarkStarFill
                    size={"27px"}
                    className={`transition duration-200 ${
                      recommendation?.is_favorite
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => {
                      // Extract all career IDs from the recommendation
                      const careerIds = recommendation?.careers?.map(
                        (item) => item?.career?.id
                      );

                      // Call handleCareerLike with the array of career IDs
                      handleCareerLike(
                        recommendation?.recommendationId,
                        careerIds // Send all career IDs as an array
                      );
                    }}
                  />
                </div>
              )}
              <div className="flex flex-col text-left mb-4">
                <span className="text-[24px] font-[500] leading-[32.4px] group-hover:text-white transition duration-200">
                  Career
                </span>
                <span className="text-[24px] font-[500] leading-[32.4px] group-hover:text-white transition duration-200">
                  Recommendations
                </span>
              </div>
              <div className="space-y-2 mb-6 text-left">
                {recommendation?.careers?.map((item, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center justify-center text-start px-3 py-1 text-[14px] font-[400] leading-[18.9px] rounded-[10px] bg-transparent border border-gray-400 text-[#000000] group-hover:border-white group-hover:text-white transition duration-200 mr-2 align-middle"
                    style={{ height: "43px" }}
                  >
                    {item?.career?.name}
                  </div>
                ))}
              </div>
              <div className="text-sm flex justify-between items-center group-hover:text-white">
                <span className="text-[16px] font-[500] leading-[21.6px]">
                  {new Date(recommendation?.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </span>
                <button
                  className="p-2 rounded-[8px] flex items-center justify-center bg-[#012C57] w-[43px] h-[43px] text-center text-white group-hover:bg-white group-hover:text-[#012C57] transition duration-200"
                  onClick={() =>
                    navigate(
                      `/careerdetails/${recommendation?.recommendationId}`
                    )
                  }
                >
                  <IoIosArrowForward size={"16px"} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CareerCards;
