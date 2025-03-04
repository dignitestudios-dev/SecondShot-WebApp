import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/Global/SearchInput";
import Transferable from "../../components/mylibrary/Transferable";
import WelcomeLibraryModal from "../../components/mylibrary/WelcomeLibraryModal";
import { ModalContext } from "../../context/GlobalContext";

import { BsFillBookmarkStarFill } from "react-icons/bs";
import axios from "../../axios";
import CareerCards from "./CareerCards";
function MyLibrary() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setloading] = useState(false);
  const [view, setView] = useState("career");
  const { isFirst, setIsFirst } = useContext(ModalContext);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [selected, setSelected] = useState("career");
  const handleViewChange = (newView) => {
    setView(newView);
    setSelected(newView);
  };

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
    <div className="">
      <WelcomeLibraryModal
        isOpen={isFirst.mylibrary}
        handleClick={() => {
          setIsFirst((prev) => ({
            ...prev,
            mylibrary: false,
          }));
        }}
      />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">My Library</h1>

        <div className="relative flex items-center w-auto gap-3 mb-4">
          <SearchInput placeholder={"Search"} />

          <div className="flex  h-[48px] items-center rounded-lg border border-gray-500 px-0.5">
            <button
              onClick={() => handleViewChange("career")}
              className={`text-[14px] text-nowrap h-[42px] w- rounded-l-lg font-medium focus:outline-none w-[200px] ${
                selected === "career"
                  ? "bg-[#012C57] text-white"
                  : "text-gray-500"
              }`}
            >
              Career Recommendations
            </button>
            <button
              onClick={() => handleViewChange("transferable")}
              className={`text-[14px] py-2.5 px-4 h-[42px] rounded-r-lg font-medium focus:outline-none ${
                selected === "transferable"
                  ? "bg-[#012C57] text-white"
                  : "text-gray-500"
              }`}
            >
              Transferable Skills
            </button>
          </div>
        </div>
      </div>

      {view === "career" ? (
        <CareerCards loading={loading} carrerData={filteredGoals} getallcarrerrecommendation={getallcarrerrecommendation} />
      ) : (
        <Transferable />
      )}
    </div>
  );
}

export default MyLibrary;
