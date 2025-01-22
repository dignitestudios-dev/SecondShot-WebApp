import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Centerpro,
  CenterSkill,
  Dottedvertical,
  Downloadimg,
  Printimg,
  Profileimage,
  Shareimg,
  skillbottomleft,
  skillbottomright,
  skillleft,
  skillright,
  skilltop,
} from "../../assets/export";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import TransferableSkillsModal from "../../components/transferableSkills/TransferableSkillsModal";
import { ModalContext } from "../../context/GlobalContext";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import ResumeDownloadModal from "../../components/myresume/ResumeDownloadModal";
import AddSupportModal from "../../components/myresume/AddSupportModal";

const NewTrasnferSkill = () => {
  const [topSkill, setTopSkill] = useState(false);
  const [leftSkill, setLeftSkill] = useState(false);
  const [rightSkill, setRightSkill] = useState(false);
  const [bottomLeft, setBottomLeft] = useState(false);
  const [bottomright, setBottomright] = useState(false);
  const { isFirst, setIsFirst } = useContext(ModalContext);
  const [isActive, setIsActive] = useState(false);
  const [appear, setAppear] = useState(false);
  const [cardnote, setCardnote] = useState(false);
  const handleTopSKill = () => {
    setTopSkill((prev) => !prev);
    setBottomLeft(false);
    setBottomright(false);
    setRightSkill(false);
    setLeftSkill(false);
    setAppear(false);
  };

  const handleLeftSKill = () => {
    setLeftSkill((prev) => !prev);
    setTopSkill(false);
    setBottomLeft(false);
    setBottomright(false);
    setRightSkill(false);
    setAppear(false);
  };
  const handleRightSKill = () => {
    setRightSkill((prev) => !prev);
    setLeftSkill(false);
    setTopSkill(false);
    setBottomLeft(false);
    setBottomright(false);
    setLeftSkill(false);
    setAppear(false);
  };
  const handlebottomleft = () => {
    setBottomLeft((prev) => !prev);
    setRightSkill(false);
    setLeftSkill(false);
    setTopSkill(false);
    setBottomright(false);
    setRightSkill(false);
    setLeftSkill(false);
    setAppear(false);
  };
  const handlebottomright = () => {
    setBottomright((prev) => !prev);
    setBottomLeft(false);
    setRightSkill(false);
    setLeftSkill(false);
    setTopSkill(false);
    setBottomLeft(false);
    setRightSkill(false);
    setLeftSkill(false);
    setAppear(false);
  };

  const handleIconClick = () => {
    setIsActive(!isActive);
  };
  const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
  
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
   
  
    const [showModalDownload, setShowModalDownload] = useState(false);
    const handleDownloadModal = () => {
      setShowModalDownload(!showModalDownload);
    };
  
    const [showPeopleModal, setShowPeopleModal] = useState(false);
    const handleShowPeopleModal = () => {
      setShowPeopleModal(!showPeopleModal);
    };
  
    const [showDelete, setShowDelete] = useState(false);
    const handleDeleteModal = () => {
      setShowDelete(!showDelete);
    };
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  return (
    <div className="relative  ">
       <ResumeDownloadModal
          showModal={showModalDownload}
          onclick={handleDownloadModal}
        />
        <AddSupportModal
          showModal={showPeopleModal}
          handleClick={handleShowPeopleModal}
        />
      <div className="flex mt-4 justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-24">
            My Transferable Skills
          </h1>
          
        </div>

        <div className="flex items-center">
          <div className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer">
            <img className="w-[27.61px] h-[23px] " src={Printimg} />
          </div>
          <div
            onClick={handleDownloadModal}
            className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer"
          >
            <img className="w-[12px] h-[18.38px] " src={Downloadimg} />
          </div>
          <div
            onClick={handleShowPeopleModal}
            className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer"
          >
            <img className="w-[21px] h-[17px] " src={Shareimg} />
          </div>
         
        </div>
      </div>{" "}
      <span
        className={`w-[388px] h-[154px] flex transition-all duration-500 absolute -top-82 -right-32 z-10 ${
          appear ? "translate-x-0" : "translate-x-[100vw]"
        } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
      >
        <span className="w-[80%] h-full text-md font-medium text-gray-800">
          Critical thinking in the workplace is essential for making informed
          decisions, solving complex problems, and fostering innovation.
        </span>

        <span className="w-[20%] h-full flex justify-end items-start">
          <BsFillBookmarkStarFill
            size={"27px"}
            onClick={handleIconClick}
            className={`transition duration-200 cursor-pointer ${
              isActive ? "text-green-500" : "text-gray-500"
            }`}
          />
        </span>
      </span>
      {topSkill && (
        <div
          className={`flex relative top-[186px] left-[5px] justify-center transition-all duration-1000 ease-in-out ${
            topSkill ? "animationtransferaable" : "opacity-0 transform scale-95"
          }`}
        >
          <div className="absolute text-sm font-medium text-white text-center ">
            <div
              className="absolute cursor-pointer bg-transparent h-[70px] text-center rounded-full flex justify-center items-center    top-[150px]"
              onClick={() => setAppear((prev) => !prev)}
            >
              Positioning
            </div>
            <div
              className="relative cursor-pointer bg-transparent h-[70px] rounded-full flex justify-center items-center  top-[60px] right-[200px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Persistence
            </div>
            <div
              className="relative cursor-pointer top-[-20px]  bg-transparent h-[90px] rounded-full flex justify-center items-center left-[190px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Persistence
            </div>
            <div
              className="relative cursor-pointer bg-transparent h-[70px] top-[70px] flex justify-center items-center rounded-full left-[260px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Persistence
            </div>
            <div
              className="relative cursor-pointer bg-transparent h-[70px] rounded-full flex justify-center items-center  top-[10px] right-[260px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Grit
            </div>
          </div>
          <img src={skilltop} className="h-[474px] " alt="" />
        </div>
      )}
      <div className="flex justify-center h-[900px] items-center  ">
        <div className="absolute ">
          <div
            className="relative text-[16px] leading-[16px] w-[20px] flex justify-center text-[#172E55] font-[600] bottom-[242px] cursor-pointer left-[13px] text-center z-10"
            onClick={handleTopSKill}
          >
            Power Forward
          </div>
        </div>
        <div className="flex justify-center absolute ">
          <img
            src={Centerpro}
            className=" h-[175.75px] relative top-[43px] left-[2px]  w-[176.1px] rounded-full object-cover"
            alt=""
          />
          <div className="text-lg text-center absolute top-[250px] left-[20px] font-[600] text-[#0a1723] ">
            Sanethia Thomas
           
          </div>
        </div>
        <img src={CenterSkill} className="h-[655.67px]" alt="" />
        <div className="absolute ">
          <div
            className="relative text-[14px]  w-[80px] h-[80px] bg-transparent rounded-full  items-center leading-[16px] flex justify-center text-[#172E55] font-[600] z-10 cursor-pointer top-[-47px] right-[309px] text-center"
            onClick={handleLeftSKill}
          >
            <span className=" w-[0px] "> Basketball </span>
          </div>
        </div>
        <div className="absolute ">
          <div
            className="relative text-[16px] leading-[16px]  w-[80px] h-[80px] bg-transparent items-center flex justify-center text-[#172E55] font-[600] cursor-pointer z-10 top-[-47px] left-[251px] text-center"
            onClick={handleRightSKill}
          >
            <span className=" w-[20px]">Reading</span>
          </div>
        </div>
        <div className="absolute  ">
          <div
            className="relative text-[16px] leading-[16px]  w-[80px] h-[80px] bg-transparent items-center flex justify-center text-[#172E55] font-[600]  cursor-pointer z-10 top-[305px] right-[202px] text-center"
            onClick={handlebottomleft}
          >
            <span className=" w-[20px]">Math</span>
          </div>
          <div
            className="relative text-[14px] leading-[16px]  w-[100px] h-[80px] bg-transparent rounded-full items-center flex justify-center text-[#172E55] font-[600] cursor-pointer   z-10 top-[224px] left-[203px] text-center"
            onClick={handlebottomright}
          >
            <span className=" w-full text-center">Computer Science </span>
          </div>
        </div>
      </div>
      {leftSkill && (
        <div
          className={`absolute bottom-[202px] left-[-148px] ${
            leftSkill
              ? "animationtransferaable"
              : "opacity-0 transform scale-95"
          }`}
        >
          <div className="absolute text-sm font-medium text-white">
            <div
              className="relative top-[140px] cursor-pointer left-[110px]"
              onClick={() => setAppear((prev) => !prev)}
            >
              Leadership
            </div>
            <div
              className="relative top-[100px] cursor-pointer left-[285px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Teamwork
            </div>
            <div
              className="relative top-[305px] cursor-pointer left-[145px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Leadership
            </div>
            <div
              className="relative top-[425px] cursor-pointer left-[69px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Leadership
            </div>
            <div
              className="relative top-[485px] w-[40px] cursor-pointer flex justify-center text-center left-[200px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Time Management
            </div>
          </div>
          <img src={skillleft} className="h-[725px]" alt="" />
        </div>
      )}
      {rightSkill && (
        <div
          className={`absolute bottom-[202px] right-[-165px] ${
            rightSkill
              ? "animationtransferaable"
              : "opacity-0 transform scale-95"
          }`}
        >
          <div className="absolute cursor-pointer text-sm font-medium text-white text-center">
            <div
              className="relative top-[120px] left-[105px]"
              onClick={() => setAppear((prev) => !prev)}
            >
              Focus
            </div>
            <div
              className="relative cursor-pointer top-[100px] left-[340px] w-[50px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Critical thinking
            </div>
            <div
              className="relative cursor-pointer top-[265px] left-[265px]  w-[50px]"
              onClick={() => setAppear((prev) => !prev)}
            >
              Critical thinking
            </div>
            <div
              className="relative cursor-pointer top-[395px] left-[335px] w-[50px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Critical thinking
            </div>
            <div
              className="relative cursor-pointer top-[455px] left-[205px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Vocabulary
            </div>
          </div>
          <img src={skillright} className="h-[725px]" alt="" />
        </div>
      )}
      {bottomLeft && (
        <div
          className={`relative top-[-258px] left-[-124px] ${
            bottomLeft
              ? "animationtransferaable"
              : "opacity-0 transform scale-95"
          }`}
        >
          <div className="absolute text-sm font-medium text-white text-center">
            <div
              className="relative cursor-pointer top-[125px] flex justify-center left-[155px] w-[50px]"
              onClick={() => setAppear((prev) => !prev)}
            >
              Detailed Oriented
            </div>
            <div
              className="relative cursor-pointer top-[285px] flex justify-center left-[130px] w-[50px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Patience{" "}
            </div>
            <div
              className="relative cursor-pointer top-[280px] flex justify-center left-[325px] w-[50px]"
              onClick={() => setAppear((prev) => !prev)}
            >
              Strategic Thinker
            </div>
            <div
              className="relative cursor-pointer top-[400px] flex justify-center left-[435px] w-[50px]"
              onClick={() => setAppear((prev) => !prev)}
            >
              Patience{" "}
            </div>
            <div
              className="relative cursor-pointer top-[275px] flex justify-center left-[598px] w-[50px]"
              onClick={() => setAppear((prev) => !prev)}
            >
              Patience{" "}
            </div>
          </div>
          <img src={skillbottomleft} className="  h-[625px]" alt="" />
        </div>
      )}
      {bottomright && (
        <div
          className={`relative top-[-233px] right-[-520px] ${
            bottomright
              ? "animationtransferaable"
              : "opacity-0 transform scale-95"
          }`}
        >
          <div className="absolute text-sm font-medium text-white ">
            <div
              className="relative cursor-pointer top-[90px] left-[580px] w-[50px] flex justify-center text-center"
              onClick={() => setAppear((prev) => !prev)}
            >
              Education and Training
            </div>
            <div
              className="relative cursor-pointer top-[303px] left-[140px] w-[50px] flex justify-center text-center "
              onClick={() => setAppear((prev) => !prev)}
            >
              {" "}
              Human Resources
            </div>
            <div
              className="relative cursor-pointer top-[215px] left-[420px] w-[50px] flex justify-center text-center"
              onClick={() => setAppear((prev) => !prev)}
            >
              Human Resources
            </div>
            <div
              className="relative cursor-pointer top-[345px] left-[315px]  w-[50px] flex justify-center text-center"
              onClick={() => setAppear((prev) => !prev)}
            >
              Human Resources
            </div>
            <div
              className="relative cursor-pointer top-[135px] left-[643px] w-[50px] flex justify-center text-center"
              onClick={() => setAppear((prev) => !prev)}
            >
              {" "}
              Human Resources
            </div>
          </div>
          <img src={skillbottomright} className="  h-[625px]" alt="" />
        </div>
      )}
      <TransferableSkillsModal
        isOpen={isFirst.transferable}
        handleClick={() => {
          setIsFirst((prev) => ({
            ...prev,
            transferable: false,
          }));
        }}
      />
    </div>
  );
};

export default NewTrasnferSkill;
