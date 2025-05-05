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
import EmptyScreen from "../../components/careerrecommendation/EmptyScreen";
function CareerRecommendations() {
  const navigate = useNavigate();
  const { isFirst, setIsFirst } = useContext(ModalContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGoals, setFilteredGoals] = useState([]);

  const handleNavigation = () => {
    navigate("/start-assesment");
  };
  const [loading, setloading] = useState(false);
  const [carrerData, setcarrerData] = useState([]);
  const getallcarrerrecommendation = async () => {
    setloading(true);
    try {
      const response = await axios.get("/api/user/my-career-recommendations");

      setcarrerData(response?.data?.data);
      setFilteredGoals(response?.data?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getallcarrerrecommendation();
  }, []);

  useEffect(() => {
    let filtered = carrerData;

    if (searchQuery) {
      filtered = filtered.filter((recommendation) => {
        return recommendation.careers.some((carrer) => {
          const careerName = carrer.career.name.toLowerCase().trim();
          const query = searchQuery.toLowerCase().trim();

          return careerName.includes(query);
        });
      });
    }

    setFilteredGoals(filtered);
  }, [searchQuery, carrerData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className=" ">
       {loading ? (
        <div className="flex gap-3">
          {[1, 2, 3, 4]?.map((index) => (
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
          ))}
        </div>
      ) : carrerData?.length === 0 ? (
        <div className=" absolute  left-0 right-0 bottom-0 flex items-center justify-center ">
          <EmptyScreen />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800 pb-1 px-2 ">
              My Career Recommendations
            </h1>
            <div className="flex items-center space-x-4 p-3">
              <SearchInput
                placeholder={"Search"}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="border-l-2 border-gray-300 h-6 mx-4"></div>
              <button
                onClick={handleNavigation}
                className="px-0.5 py-2 text-[#012C57] text-[16px] font-[500]"
              >
                Retake the Assessment
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <CareerCards
              loading={loading}
              carrerData={filteredGoals}
              getallcarrerrecommendation={getallcarrerrecommendation}
            />
          </div>

        </>
      )}
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
