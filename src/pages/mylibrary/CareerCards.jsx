import React, { useState } from "react";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { SuccessToast } from "../../components/toaster/ToasterContainer";
import EmptyScreen from "./EmptyScreen";

const CareerCards = ({ icon, carrerData, loading, getfavcareer }) => {
  const navigate = useNavigate();
  const [loader, setLoading] = useState({});

  const handleCareerLike = async (recommendationId, careerIds) => {
    setLoading((prevState) => ({
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
        getfavcareer();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prevState) => ({
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
          <div className="absolute z-2 mt-[200px] top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <EmptyScreen text={"No Career Recommendations found yet."} />
          </div>
        ) : (
          carrerData?.map((recommendation, recommendationIndex) => (
            <div
              key={recommendationIndex}
              className="group relative rounded-[24px] h-[400px] p-4  bg-[#F6F8FF] text-black shadow-lg cursor-pointer hover:bg-gradient-to-l from-[#012C57] to-[#061523] hover:text-white transition duration-200"
            >
              <div className="flex flex-col text-left mb-4">
                {loader[recommendation?.recommendationId] ? (
                  <span className="absolute top-4 right-4 animate-pulse text-green-500">
                    <BsFillBookmarkStarFill size={"27px"} />
                  </span>
                ) : (
                  <div className="absolute top-4 right-4">
                    {" "}
                    <BsFillBookmarkStarFill
                      size={"27px"}
                      className="text-green-500"
                      onClick={() => {
                        const careerIds = recommendation?.careers?.map(
                          (item) => item?._id
                        );

                        handleCareerLike(
                          recommendation?.recommendationId,
                          careerIds
                        );
                      }}
                      title={
                        recommendation?.recommendationId
                          ? "Remove from Favorites"
                          : "Add to Favorites"
                      }
                    />
                  </div>
                )}
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
                    className="inline-flex items-center justify-center text-start px-3 py-1 text-[14px] font-[400] leading-[18.9px] rounded-[10px] bg-transparent border border-gray-400 text-black group-hover:border-white group-hover:text-white transition duration-200 mr-2 align-middle"
                    style={{ height: "43px" }}
                  >
                    {item?.career_name}
                  </div>
                ))}
              </div>

              <div className="text-sm pb-3    absolute bottom-0 left-6 right-6   flex justify-between items-center group-hover:text-white">
                <span className="text-[16px] font-[500] leading-[21.6px]">
                  {new Date(recommendation?.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
                <button
                  className="p-2 rounded-[8px] flex items-center justify-center bg-[#012C57] w-[43px] h-[43px] text-center text-white group-hover:bg-white group-hover:text-[#012C57] transition duration-200"
                  onClick={() =>
                    navigate(`/careerfav-detail/${recommendation?._id}`)
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
