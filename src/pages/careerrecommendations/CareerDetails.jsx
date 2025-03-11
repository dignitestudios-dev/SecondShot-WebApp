import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import axios from "../../axios";
import { SuccessToast } from "../../components/toaster/ToasterContainer";
function CareerDetails() {
  const [selectedButton, setSelectedButton] = useState("");
  const [carrerDetail, setCarrerDetail] = useState([]);
  const [loader, setloader] = useState(false);
  const [singlecareerload, setsinglecareerload] = useState(false);
  const [careerFiltered, setcareerFiltered] = useState([]);

  const [careerdate, setcareerdate] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const getcarrerDetail = async () => {
    setloader(true);
    try {
      const response = await axios.post(
        `/api/user/career-recommendation-details`,
        {
          recommendationId: id,
        }
      );
      if (response.status === 200) {
        setCarrerDetail(response?.data?.data?.careers);
        setcareerdate(response?.data?.data);
        setSelectedButton(response?.data?.data?.careers[0].career.id);
        setcareerFiltered([response?.data?.data?.careers[0]]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    getcarrerDetail();
  }, [id]);

  const handleCarrerData = (id) => {
    setSelectedButton(id);
    const filteredData = carrerDetail?.filter((item) => item.career?.id === id);
    setcareerFiltered(filteredData);
  };

  const handlesingcareerlike = async (careerId) => {
    setsinglecareerload(true);
    try {
      const response = await axios.post(
        "/api/user/toggle-favorite-single-career",
        {
          recommendationId: id,
          careerId: careerId,
        }
      );
      if (response.status === 200) {
        SuccessToast(response?.data?.message);
        setCarrerDetail((prevDetails) =>
          prevDetails.map((item) =>
            item.career.id === careerId
              ? { ...item, is_favorite: !item.is_favorite }
              : item
          )
        );
        setcareerFiltered((prevFiltered) =>
          prevFiltered.map((item) =>
            item.career.id === careerId
              ? { ...item, is_favorite: !item.is_favorite }
              : item
          )
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setsinglecareerload(false);
    }
  };

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
            <h1 className="text-[32px] font-[500] text-[#000000] leading-[43.2px] mb-1">
              Your Recommended Careers are:
            </h1>
          </div>
          <p className="text-[18px] text-[#000000] font-[500]">
            {loader ? (
              <div className="h-6 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            ) : careerdate?.createdAt ? (
              new Date(careerdate.createdAt).toLocaleDateString("en-US", {
                year: "2-digit",
                month: "short",
                day: "2-digit",
              })
            ) : (
              "No date available"
            )}
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <div className="mb-2">
              {loader
                ? Array(6)
                    .fill(null)
                    .map((_, index) => (
                      <button
                        key={index}
                        className="bg-[#F6F6F6] w-[200px] h-[49px] font-[500] pt-3 pb-3 rounded-lg mr-2 mb-2 text-[14px] leading-[18.9px] pl-3 pr-3 animate-pulse"
                      ></button>
                    ))
                : carrerDetail?.map((button, index) => (
                    <button
                      key={index}
                      className={`${
                        selectedButton === button?.career?.id
                          ? "bg-gradient-to-r from-[#061523] to-[#012C57] text-white"
                          : "bg-[#F6F6F6] text-[#474747]"
                      } h-[49px] font-[500] w-[auto] pt-3 pb-3 rounded-lg mr-2 mb-2 text-[14px] leading-[18.9px] pl-3 pr-3`}
                      onClick={() => handleCarrerData(button?.career?.id)}
                    >
                      {button?.career?.name}
                    </button>
                  ))}
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h3 className="text-[28px] font-[500] text-[#000000] py-2">
                {loader ? (
                  <div className="h-6 bg-gray-300 w-1/4 animate-pulse rounded"></div>
                ) : (
                  careerFiltered[0]?.career?.name || "No Data Found"
                )}
              </h3>
              {loader ? (
                <span className="animate-pulse text-gray-200">
                  <BsFillBookmarkStarFill size={"27px"} />
                </span>
              ) : (
                <div>
                  {singlecareerload ? (
                    <span className="animate-pulse text-green-500">
                      <BsFillBookmarkStarFill size={"27px"} />
                    </span>
                  ) : (
                    <BsFillBookmarkStarFill
                      size={"27px"}
                      onClick={() => {
                        handlesingcareerlike(careerFiltered[0]?.career?.id);
                      }}
                      className={`transition duration-200 cursor-pointer ${
                        careerFiltered[0]?.is_favorite
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    />
                  )}
                </div>
              )}
            </div>
            <p className="text-[#000000cc] font-[400] text-[16px]">
              {loader ? (
                <div className="h-4 bg-gray-300 w-3/4 animate-pulse rounded"></div>
              ) : (
                careerFiltered[0]?.career?.description || "No Data Found"
              )}
            </p>
          </div>

          <hr className="h-px my-8 bg-gray-300 border-0" />

          <div className="bg-white rounded-lg">
            <div className="grid grid-cols-3 divide-x-[1px] gap-4 text-[#011225]">
              <ul className="pl-8 space-y-6 list-disc list-inside">
                <h3 className="text-[22px] font-medium text-[#011225]">
                  Sample Job Titles
                </h3>
                {loader ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 mb-2 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 mb-2 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 mb-2 rounded w-3/4"></div>
                  </div>
                ) : careerFiltered[0]?.career?.sample_job_titles?.length > 0 ? (
                  careerFiltered[0]?.career?.sample_job_titles?.map(
                    (item, index) => (
                      <li
                        className="font-[500] list-outside text-[18px]"
                        key={index}
                      >
                        {item}
                      </li>
                    )
                  )
                ) : (
                  <p className="font-[500] list-outside text-[18px] text-gray-500">
                    No data found
                  </p>
                )}
              </ul>

              <ul className="pl-8 space-y-6 list-disc list-inside">
                <h3 className="text-[22px] font-medium text-[#011225]">
                  Career Pathways
                </h3>
                {loader ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 mb-2 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 mb-2 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 mb-2 rounded w-3/4"></div>
                  </div>
                ) : careerFiltered[0]?.career?.career_pathways?.length > 0 ? (
                  careerFiltered[0]?.career?.career_pathways.map(
                    (item, index) => (
                      <li
                        className="font-[500] list-outside text-[18px]"
                        key={index}
                      >
                        {item}
                      </li>
                    )
                  )
                ) : (
                  <p className="font-[500] list-outside text-[18px] text-gray-500">
                    No data found
                  </p>
                )}
              </ul>

              <ul className="pl-8 space-y-6 list-disc list-inside">
                <h3 className="text-[22px] font-medium text-[#011225]">
                  Education & Training
                </h3>
                {loader ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 mb-2 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 mb-2 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 mb-2 rounded w-3/4"></div>
                  </div>
                ) : careerFiltered[0]?.career?.education_training?.length >
                  0 ? (
                  careerFiltered[0]?.career?.education_training.map(
                    (item, index) => (
                      <li
                        className="font-[500] list-outside text-[18px]"
                        key={index}
                      >
                        {item}
                      </li>
                    )
                  )
                ) : (
                  <p className="font-[500] list-outside text-[18px] text-gray-500">
                    No data found
                  </p>
                )}
              </ul>
            </div>
          </div>

          <hr className="h-px my-8 bg-gray-300 border-0" />

          <div>
            <h3 className="text-[22px] font-[600] leading-[32.67px] text-[#011225]">
              Career Growth and Opportunities{" "}
            </h3>
            {loader ? (
              <div className="h-4 bg-gray-300 w-3/4 animate-pulse rounded"></div>
            ) : (
              <p className="text-[#000000cc]">
                {careerFiltered[0]?.career?.career_growth_opportunities ||
                  "No Data Found "}
              </p>
            )}
          </div>
          <div>
            <h3 className="text-[18px] font-medium text-[#011225] mt-2">
              Explore More
            </h3>
            <a href={`${careerFiltered[0]?.career?.career_link}`} target="_blank" className="text-[#0E73D0] underline">{careerFiltered[0]?.career?.career_link}</a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerDetails;
