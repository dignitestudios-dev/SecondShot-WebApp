import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Backbutton from "../../components/Global/Backbutton";
import SearchInput from "../../components/Global/SearchInput";
import LibraryCareer from "../../components/mylibrary/LibraryCareer";

import Transferable from "../../components/mylibrary/Transferable";
import WelcomeLibraryModal from "../../components/mylibrary/WelcomeLibraryModal";
import { ModalContext } from "../../context/GlobalContext";
import CareerCards from "../../components/careerrecommendation/CareerCards";
import { BsFillBookmarkStarFill } from "react-icons/bs";

function MyLibrary() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [view, setView] = useState("career");
  const { isFirst, setIsFirst } = useContext(ModalContext);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [selected, setSelected] = useState("career");
  const handleViewChange = (newView) => {
    console.log("Switching to view:", newView);
    setView(newView);
    setSelected(newView);
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
        <CareerCards
          icon={
            <BsFillBookmarkStarFill
              size={"27px"}
              className="transition duration-200 text-[#56ec17]"
            />
          }
        />
      ) : (
        <Transferable />
      )}
    </div>
  );
}

export default MyLibrary;
