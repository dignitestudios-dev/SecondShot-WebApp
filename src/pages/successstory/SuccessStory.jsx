import { FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Backbutton from "../../components/Global/Backbutton";
import SearchInput from "../../components/Global/SearchInput";
import { Profileimage } from "../../assets/export";
import WelcomeStoryModal from "../../components/successstory/WelcomeStoryModal";
import { ModalContext } from "../../context/GlobalContext";

function SuccessStory() {
  const navigate = useNavigate();
  const { isFirst, setIsFirst } = useContext(ModalContext);

  const data = [
    {
      name: "benjamin James",
      degree: "Marketing Manager",
      image: Profileimage,
      city: "Toronto",
    },
    {
      name: "William Noah",
      degree: "Marketing Manager",
      image: Profileimage,
      city: "Toronto",
    },
    {
      name: "benjamin James",
      degree: "Marketing Manager",
      image: Profileimage,
      city: "Toronto",
    },
    {
      name: "Charles Oliver",
      degree: "Marketing Manager",
      image: Profileimage,
      city: "Toronto",
    },
    {
      name: "Christopher Leo",
      degree: "Marketing Manager",
      image: Profileimage,
    },
    {
      name: "benjamin James",
      degree: "Marketing Manager",
      image: Profileimage,
      city: "Toronto",
    },
    {
      name: "Theodore Henry",
      degree: "Marketing Manager",
      image: Profileimage,
      city: "Toronto",
    },
    {
      name: "Daniel Ezra",
      degree: "Marketing Manager",
      image: Profileimage,
      city: "Toronto",
    },
  ];

  const [selected, setSelected] = useState("Matched Profiles");

  const handleToggle = (option) => {
    setSelected(option);
  };

  return (
    <div className="">
      <WelcomeStoryModal
        isOpen={isFirst.successstory}
        handleClick={() => {
          setIsFirst((prev) => ({
            ...prev,
            successstory: false,
          }));
        }}
      />

      <Backbutton />

      <div className="flex justify-between items-center">
        <h1 className="text-[32px] font-[500] text-[#000000] leading-[43.2px] text-left ">
          Success Stories
        </h1>

        <div className="relative flex items-center w-auto gap-3">
          <SearchInput placeholder="Search" />
          <div className="flex items-center  h-[48px]   rounded-lg border border-[#012C57] px-0.5">
            <button
              onClick={() => handleToggle("Explore All Profiles")}
              className={`text-[14px] leading-[18.9px]  h-[42px]  px-4 rounded-l-lg font-[500] focus:outline-none ${
                selected === "Explore All Profiles"
                  ? "bg-[#012C57] text-white"
                  : "text-gray-500"
              }`}
            >
              Matched Profiles
            </button>
            <button
              onClick={() => handleToggle("Matched Profiles")}
              className={`text-[14px] leading-[18.9px]  px-4  h-[42px]  rounded-r-lg font-[500] focus:outline-none ${
                selected === "Matched Profiles"
                  ? "bg-[#012C57] text-white"
                  : "text-gray-500"
              }`}
            >
              Explore All Profiles
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-11 mt-16">
        {data?.map((item, index) => (
          <div
            onClick={() => navigate("/story-pro-detail")}
            key={index}
            className="bg-[#F2F7FF] rounded-[12px] w-[280px]  p-4  h-[203px] flex flex-col items-center cursor-pointer"
          >
            <div className="relative -mt-12 mb-4">
              <img
                src={item?.image}
                alt="Profile"
                className="h-24 w-24 rounded-full "
              />
            </div>
            <h2 className="text-[20px] capitalize font-[600] text-[#012C57]">
              {item?.name}
            </h2>
            <h3 className="text-[16px] mt-3 text-[#0081FF] font-[500] text-center">
              {item?.degree}
            </h3>
            <h3 className="text-[15px] mt-3 text-[#9A9A9A] font-[500] text-center">
              {item?.city}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuccessStory;
