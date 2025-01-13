import React, { useContext, useState } from "react";
import {
  CenterSkill,
  Printimg,
  Profileimage,
  skillbottomleft,
  skillbottomright,
  skillleft,
  skillright,
  skilltop,
} from "../../assets/export";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import TransferableSkillsModal from "../../components/transferableSkills/TransferableSkillsModal";
import { ModalContext } from "../../context/GlobalContext";

const NewTrasnferSkill = () => {
  const [topSkill, setTopSkill] = useState(false);
  const [leftSkill, setLeftSkill] = useState(false);
  const [rightSkill, setRightSkill] = useState(false);
  const [bottomLeft, setBottomLeft] = useState(false);
  const [bottomright, setBottomright] = useState(false);
  const { isFirst, setIsFirst } = useContext(ModalContext);
  const handleTopSKill = () => {
    setTopSkill((prev) => !prev);
    setBottomLeft(false);
    setBottomright(false);
    setRightSkill(false);
    setLeftSkill(false);
    setAppear(false)

  };

  const handleLeftSKill = () => {
    setLeftSkill((prev) => !prev);
    setTopSkill(false);
    setBottomLeft(false);
    setBottomright(false);
    setRightSkill(false);
    setAppear(false)

  };
  const handleRightSKill = () => {
    setRightSkill((prev) => !prev);
    setLeftSkill(false);
    setTopSkill(false);
    setBottomLeft(false);
    setBottomright(false);
    setLeftSkill(false);
    setAppear(false)

  };
  const handlebottomleft = () => {
    setBottomLeft((prev) => !prev);
    setRightSkill(false);
    setLeftSkill(false);
    setTopSkill(false);
    setBottomright(false);
    setRightSkill(false);
    setLeftSkill(false);
    setAppear(false)

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
    setAppear(false)
  };
  const [isActive, setIsActive] = useState(false);
  const [appear, setAppear] = useState(false);

  const handleIconClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="relative  ">
      <div className="flex mt-4 justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-24">
            My Transferable Skills
          </h1>
        </div>

        <div className=" w-[30%] flex items-center justify-end gap-3">
          <div className="text-md font-[500]">Print Skills</div>
          <div className="cursor-pointer bg-white rounded-[10px] shadow-sm p-3 ">
            <img className="w-[27.61px] h-[23px] " src={Printimg} />
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
            <div className="relative top-[170px]"  onClick={() => setAppear((prev) => !prev)}>Positioning</div>
            <div className="relative top-[60px] right-[200px] "  onClick={() => setAppear((prev) => !prev)}>
              Persistence
            </div>
            <div className="relative top-[40px] left-[190px] "  onClick={() => setAppear((prev) => !prev)}>Persistence</div>
            <div className="relative top-[190px] left-[260px] " onClick={() => setAppear((prev) => !prev)} >
              Persistence
            </div>
            <div className="relative top-[190px] right-[260px] "  onClick={() => setAppear((prev) => !prev)}>Grit</div>
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
            src={Profileimage}
            className=" h-[175.75px] relative top-[43px] left-[2px]  w-[176.1px] "
            alt=""
          />
        </div>
        <img src={CenterSkill} className="h-[655.67px]" alt="" />
        <div className="absolute ">
          <div
            className="relative text-[16px] leading-[16px] w-[20px] flex justify-center text-[#172E55] font-[600] z-10 cursor-pointer top-[-47px] right-[271px] text-center"
            onClick={handleLeftSKill}
          >
            Goals
          </div>
        </div>
        <div className="absolute ">
          <div
            className="relative text-[16px] leading-[16px] w-[20px] flex justify-center text-[#172E55] font-[600] cursor-pointer z-10 top-[-47px] left-[271px] text-center"
            onClick={handleRightSKill}
          >
            Reading
          </div>
        </div>
        <div className="absolute  ">
          <div
            className="relative text-[16px] leading-[16px] w-[20px] flex justify-center text-[#172E55] font-[600]  cursor-pointer z-10 top-[275px] right-[200px] text-center"
            onClick={handlebottomleft}
          >
            Math
          </div>
          <div
            className="relative text-[16px] leading-[16px] w-[20px] flex justify-center text-[#172E55] font-[600] cursor-pointer z-10 top-[254px] left-[201px] text-center"
            onClick={handlebottomright}
          >
            Careers
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
              className="relative top-[140px] left-[110px]"
              onClick={() => setAppear((prev) => !prev)}
            >
              Leadership
            </div>
            <div
              className="relative top-[100px] left-[285px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Teamwork
            </div>
            <div
              className="relative top-[305px] left-[145px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Leadership
            </div>
            <div
              className="relative top-[425px] left-[69px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Leadership
            </div>
            <div
              className="relative top-[485px] w-[40px] flex justify-center text-center left-[200px] "
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
          <div className="absolute text-sm font-medium text-white text-center">
            <div
              className="relative top-[120px] left-[105px]"
              onClick={() => setAppear((prev) => !prev)}
            >
              Focus
            </div>
            <div
              className="relative top-[100px] left-[340px] w-[50px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Critical thinking
            </div>
            <div
              className="relative top-[265px] left-[265px]  w-[50px]"
              onClick={() => setAppear((prev) => !prev)}
            >
              Critical thinking
            </div>
            <div
              className="relative top-[395px] left-[335px] w-[50px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Critical thinking
            </div>
            <div
              className="relative top-[455px] left-[205px] "
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
              className="relative top-[125px] flex justify-center left-[155px] w-[50px]"
              onClick={() => setAppear((prev) => !prev)}
            >
              Detailed Oriented
            </div>
            <div
              className="relative top-[285px] flex justify-center left-[130px] w-[50px] "
              onClick={() => setAppear((prev) => !prev)}
            >
              Patience{" "}
            </div>
            <div
              className="relative top-[280px] flex justify-center left-[325px] w-[50px]"
              onClick={() => setAppear((prev) => !prev)}
            >
              Strategic Thinker
            </div>
            <div
              className="relative top-[400px] flex justify-center left-[435px] w-[50px]"
              onClick={() => setAppear((prev) => !prev)}
            >
              Patience{" "}
            </div>
            <div
              className="relative top-[275px] flex justify-center left-[598px] w-[50px]"
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
              className="relative top-[90px] left-[580px] w-[50px] flex justify-center text-center"
              onClick={() => setAppear((prev) => !prev)}
            >
              Education and Training
            </div>
            <div
              className="relative top-[303px] left-[140px] w-[50px] flex justify-center text-center "
              onClick={() => setAppear((prev) => !prev)}
            >
              {" "}
              Human Resources
            </div>
            <div
              className="relative top-[215px] left-[420px] w-[50px] flex justify-center text-center"
              onClick={() => setAppear((prev) => !prev)}
            >
              Human Resources
            </div>
            <div
              className="relative top-[345px] left-[315px]  w-[50px] flex justify-center text-center"
              onClick={() => setAppear((prev) => !prev)}
            >
              Human Resources
            </div>
            <div
              className="relative top-[135px] left-[643px] w-[50px] flex justify-center text-center"
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
