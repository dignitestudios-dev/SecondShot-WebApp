import React, { useContext, useEffect, useState } from "react";
import CareerRecommendationsModal from "../../components/careerrecommendation/CareerRecommendationsModal";
import { CiSearch } from "react-icons/ci";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import SearchInput from "../../components/Global/SearchInput";
import BackBtn from "../../components/onboarding/BackBtn";
import CareerCards from "../../components/careerrecommendation/CareerCards";
import Backbutton from "../../components/Global/Backbutton";
import { ModalContext } from "../../context/GlobalContext";
import axios from "../../axios";
function CareerRecommendations() {
  const navigate = useNavigate();
  const { isFirst, setIsFirst } = useContext(ModalContext);

  const handleNavigation = () => {
    navigate("/start-assesment");
  };
  const [loading, setloading] = useState(false);
  const [carrerData, setcarrerData] = useState([]);
  const getallcarrerrecommendation = async () => {
    setloading(true);
    try {
      const response = await axios.get("/api/user/my-career-recommendations");
      console.log(response?.data?.data, "response->");
      setcarrerData(response?.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getallcarrerrecommendation();
  }, []);
  return (
    <div className=" ">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 pb-1 px-2 ">
          My Career Recommendations
        </h1>
        <div className="flex items-center space-x-4 p-3">
          <SearchInput placeholder={"Search"} />
          <div className="border-l-2 border-gray-300 h-6 mx-4"></div>
          <button
            onClick={handleNavigation}
            className="px-0.5 py-2 text-[#012C57] text-[16px] font-[500]"
          >
            Take the Assessment
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <CareerCards
        loading={loading}
        carrerData={carrerData}
          icon={
            <BsFillBookmarkStarFill
              size={"27px"}
              className="transition duration-200   group-hover:text-white text-gray-500"
            />
          }
        />
      </div>
      <CareerRecommendationsModal
        isOpen={isFirst.recommendation}
        handleClick={() => {
          setIsFirst((prev) => ({
            ...prev,
            recommendation: false,
          }));
        }}
      />
    </div>
  );
}

export default CareerRecommendations;
