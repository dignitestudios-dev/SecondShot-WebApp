import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/Global/SearchInput";
import Transferable from "../../components/mylibrary/Transferable";
import WelcomeLibraryModal from "../../components/mylibrary/WelcomeLibraryModal";
import { ModalContext } from "../../context/GlobalContext";
import axios from "../../axios";
import CareerCards from "./CareerCards";
function MyLibrary() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [skillQuery, setSkillQuery] = useState("");
  const [loading, setloading] = useState(false);
  const [library, setLibrary] = useState([]);
  const [view, setView] = useState("career");
  const { isFirst, setIsFirst } = useContext(ModalContext);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [filteredskills, setFilteredskills] = useState([]);
  const [selected, setSelected] = useState("career");
  const handleViewChange = (newView) => {
    setView(newView);
    setSelected(newView);
  };

  const [carrerData, setcarrerData] = useState([]);
  const getfavcareer = async () => {
    setloading(true);
    try {
      const response = await axios.get("/api/user/my-favorite-careers");

      setcarrerData(response?.data?.data);
      setFilteredGoals(response?.data?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getfavcareer();
  }, []);
  const getLibrary = async () => {
    setloading(true);
    try {
      const response = await axios.get(
        "/api/user/get-user-transferable-skills"
      );
      if (response.status === 200) {
        setLibrary(response?.data?.data);
        setFilteredskills(response?.data?.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getLibrary();
  }, []);
  useEffect(() => {
    let filtered = carrerData;

    if (searchQuery) {
      filtered = filtered.filter((recommendation) => {
        return recommendation.careers.some((carrer) => {
          const careerName = carrer.career_name.toLowerCase().trim();
          const query = searchQuery.toLowerCase().trim();

          return careerName.includes(query);
        });
      });
    }

    setFilteredGoals(filtered);
  }, [searchQuery, carrerData]);

  useEffect(() => {
    let filtered = library;

    if (skillQuery) {
      filtered = filtered.filter((item) => {
        let title = "";

        if (item?.athlete) {
          title = item?.athlete?.title;
        }
        if (item?.favorite_middle_school_subject) {
          title = item?.favorite_middle_school_subject?.title;
        }
        if (item?.favorite_hobby1) {
          title = item?.favorite_hobby1?.title;
        }
        if (item?.favorite_hobby2) {
          title = item?.favorite_hobby2?.title;
        }
        if (item?.rank) {
          title = item?.rank?.title;
        }

        title = title ? title.toLowerCase().trim() : "";

        const query = skillQuery.toLowerCase().trim();

        return title && title.includes(query);
      });
    }

    setFilteredskills(filtered);
  }, [skillQuery, library]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleskillsearchChange = (e) => {
    setSkillQuery(e.target.value);
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

        <div className="relative z-10 flex items-center w-auto gap-3 mb-4">
          {view === "career" ? (
            <SearchInput
              placeholder={"Search"}
              onChange={handleSearchChange}
              value={searchQuery}
            />
          ) : (
            <SearchInput
              placeholder={"Search"}
              onChange={handleskillsearchChange}
              value={skillQuery}
            />
          )}

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
      <div className=" ">
        {view === "career" ? (
          <CareerCards
            loading={loading}
            carrerData={filteredGoals}
            getfavcareer={getfavcareer}
          />
        ) : (
          <Transferable
            loading={loading}
            library={filteredskills}
            getLibrary={getLibrary}
          />
        )}
      </div>
    </div>
  );
}

export default MyLibrary;
