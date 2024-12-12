import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Backbutton from "../../components/Global/Backbutton";
import SearchInput from "../../components/Global/SearchInput";
import LibraryCareer from "../../components/mylibrary/LibraryCareer";

import Transferable from "../../components/mylibrary/Transferable";
import WelcomeLibraryModal from "../../components/mylibrary/WelcomeLibraryModal";

function MyLibrary() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [view, setView] = useState("career");

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
      <WelcomeLibraryModal isOpen={isOpen} handleClick={()=>setIsOpen(false)} />
      <Backbutton />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800 text-left mb-4">
          My Library
        </h1>

        <div className="relative flex items-center w-auto gap-3 mb-4">
          <SearchInput placeholder={"Search"} />

          <div className="flex  h-[48px] items-center rounded-lg border border-gray-500 px-0.5">
            <button
              onClick={() => handleViewChange("career")}
              className={`text-[14px] h-[42px] rounded-l-lg font-medium focus:outline-none w-28 ${
                selected === "career"
                  ? "bg-[#012C57] text-white"
                  : "text-gray-500"
              }`}
            >
              Career
            </button>
            <button
              onClick={() => handleViewChange("transferable")}
              className={`text-[14px] py-2.5 px-4 h-[42px] rounded-r-lg font-medium focus:outline-none ${
                selected === "transferable"
                  ? "bg-[#012C57] text-white"
                  : "text-gray-500"
              }`}
            >
              Transferable
            </button>
          </div>
        </div>
      </div>

      {view === "career" ? <LibraryCareer /> : <Transferable />}
    </div>
  );
}

export default MyLibrary;
