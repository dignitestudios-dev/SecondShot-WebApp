import React, { useContext, useState } from "react";
import TransferableSkillsModal from "../../components/transferableSkills/TransferableSkillsModal";
import { ModalContext } from "../../context/GlobalContext";
import { Centerpro, Printimg, Profileimage } from "../../assets/export";
import Backbutton from "../../components/Global/Backbutton";
import { BsFillBookmarkStarFill } from "react-icons/bs";

function MyTransferableSkills() {
  const [tooltip, setTooltip] = useState({ show: false, text: "", x: 0, y: 0 });
  // const [Modal, setModal] = useState(true);
  const { isFirst, setIsFirst } = useContext(ModalContext);
 

  const greenCircles = [
    { name: "Power Forward" },
    { name: "Goals" },
    { name: "Math" },
    { name: "Careers" },
  ];

  const blueCircles = [
    { name: "Positioning" },
    { name: "Grit" },
    { name: "Persistence" },
    { name: "Focus" },
    { name: "Critical thinking" },
    {
      name: "Reading",
      tooltip:
        "Critical thinking in the workplace is essential for making informed decisions, solving complex problems, and fostering innovation.",
    },
    { name: "Education and Training" },
    { name: "Human Resources" },
    { name: "STEM" },
    { name: "Patience" },
    { name: "Strategic Thinker" },
    { name: "Detailed Oriented" },
    { name: "Time Management" },
    { name: "Leadership" },
    { name: "Teamwork" },
  ];

  const [appear, setAppear] = useState(false);

  const centerProfile = {
    name: "Michael Jordan",
    role: "The Athlete",
    image: "https://i.imgur.com/azXcRZl.png", // Example image path
  };

  const handleMouseEnter = (e, skill) => {
    if (skill.tooltip) {
      setTooltip({
        show: true,
        text: skill.tooltip,
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, text: "", x: 0, y: 0 });
  };

  const [poweredShow, setPoweredShow] = useState(false);
  const [goal, setgoal] = useState(false);
  const [math, setMath] = useState(false);
  const [reading, setReading] = useState(false);
  const [careers, setCareers] = useState(false);
  const handlemath = () => {
    setMath((prev) => !prev);
    setgoal(false);
    setReading(false);
    setPoweredShow(false);
    setCareers(false);
  };
  const handlegoal = () => {
    setgoal((prev) => !prev);
    setMath(false);
    setReading(false);
    setPoweredShow(false);
    setCareers(false);
  };
  const handleReading = () => {
    setReading((prev) => !prev);
    setMath(false);
    setgoal(false);
    setPoweredShow(false);
    setCareers(false);
  };
  const handleCareers = () => {
    setCareers((prev) => !prev);
    setMath(false);
    setgoal(false);
    setReading(false);
    setPoweredShow(false);
  };
  const handlePoweredShow = () => {
    setPoweredShow((prev) => !prev);
    setMath(false);
    setgoal(false);
    setReading(false);
    setCareers(false);
  };
  const [isActive, setIsActive] = useState(false);

  const handleIconClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="h-[1500px] ">
      <div className="flex justify-between items-start mb-8">
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
      </div>

      <div className="w-full h-[150vh] my-36 grid grid-cols-3 relative justify-start items-start">
        <span
          className={`w-[388px] h-[154px] flex transition-all duration-500 absolute -top-32 -right-32 ${
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
        <div className="col-span-1 h-[256px] w-full flex justify-center items-center"></div>
        <div className="col-span-1 h-[256px] w-full flex justify-center items-end">
          {/* Power Forward section Start here */}
          {poweredShow && (
            <>
              <div className="bg-white h-[160px] top-[170px] w-[160px] absolute z-10  "></div>
              <div className="border-2 border-dashed rounded-full h-[160px] w-[160px] border-[#56EC17] absolute z-0  top-[120px] "></div>
            </>
          )}

          <div className="w-[125px] h-[125px] relative p-2 rounded-full z-10 ">
            {poweredShow && (
              <div
                className={`animationtransferaable transition-opacity ${
                  poweredShow ? "opacity-100" : "opacity-0"
                } duration-1000 ease-in-out `}
                style={{ transition: "opacity 0.5s ease-in-out" }}
              >
                <span className="w-[100px] h-[2px] bg-[#56EC17] rotate-90 absolute -top-[70px] left-[10%] ">
                  <span className="w-[15.56px] h-[15.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  {/* Grit circle blue */}
                  <button
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px] cursor-pointer outline-none rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-90 rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Positioning
                    </span>
                  </button>
                </span>
                <span className="w-[205px] h-[2px] bg-[#56EC17] rotate-[56deg] absolute -top-[89px] right-[70px]">
                  <span className="w-[15.56px] h-[15.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  {/* Positioning circle blue */}
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px] cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[120px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[57deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Persistance
                    </span>
                  </span>
                </span>
                <span className="w-[140px] h-[2px] bg-[#56EC17] rotate-[30deg] absolute -top-[20px] right-[140px]">
                  <span className="w-[15.56px] h-[15.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  {/* Positioning circle blue */}
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px] cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[30deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Grit
                    </span>
                  </span>
                </span>
                <span className="group w-[205px] h-[2px] bg-[#56EC17] rotate-[120deg]  absolute -top-[92px]   left-[69px]">
                  <span className="w-[14.56px] h-[14.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  {/* Persistance circle blue */}
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px] cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[120deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Persistance
                    </span>
                  </span>
                </span>
                <span className="group w-[140px] h-[2px] bg-[#56EC17] rotate-[140deg]  absolute -top-[22px]   left-[130px]">
                  <span className="w-[14.56px] h-[14.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  {/* Persistance circle blue */}
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px] cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[140deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Persistance
                    </span>
                  </span>
                </span>
              </div>
            )}

            <div
              className="w-full cursor-pointer h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2"
              onClick={() => handlePoweredShow()}
            >
              <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
                <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2 text-[14.64px] font-[600] leading-[14.64px] text-[#172E55] text-center ">
                  Power Forward
                </div>
              </div>
            </div>
          </div>

          {/* Power Forward section end here */}
        </div>
        {/* Goal  section Start here */}

        <div className="col-span-1 h-[256px] w-full flex justify-center items-center"></div>
        <div className="col-span-1 h-[256px] relative w-full flex justify-end items-center">
          {goal && (
            <>
              <div className="bg-white h-[190px] -right-[15px]  -top-[80px]  w-[87px] absolute z-10  "></div>
              <div className="border-2 border-dashed rounded-full h-[140px]   w-[140px] border-[#56EC17] absolute z-0  -top-[70px] "></div>
            </>
          )}
          <div className="w-[125px] h-[125px] absolute -top-16   z-10 -rotate-[70deg] p-2 ">
            {goal && (
              <div
                className={`animationtransferaable transition-opacity ${
                  goal ? "opacity-100" : "opacity-0"
                } duration-1000 ease-in-out `}
                style={{ transition: "opacity 0.5s ease-in-out" }}
              >
                <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-90 absolute -top-[56px] left-[22%]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[20deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Leadership
                    </span>
                  </span>
                </span>
                <span className="w-[210px] h-[2px] bg-[#56EC17] rotate-[120deg] absolute -top-[100px] left-[52px]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[50deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Leadership
                    </span>
                  </span>
                </span>
                <span className="w-[170px] h-[2px] bg-[#56EC17] rotate-[60deg] absolute -top-[80px] right-[80px]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] rotate-[10deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Leadership
                    </span>
                  </span>
                </span>
                <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[30deg] absolute top-[40px] right-[150px]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] rotate-[40deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Time Management
                    </span>
                  </span>
                </span>
                <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[145deg] absolute -top-[4px] -right-[60%]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[75deg] rounded-full  bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Timework
                    </span>
                  </span>
                </span>
              </div>
            )}
            <div
              className="w-full cursor-pointer h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2"
              onClick={() => handlegoal()}
            >
              <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
                <div
                  className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] rotate-[70deg] flex justify-center
                 items-center rounded-full p-2 text-[14.64px] font-[600] text-[#172E55] text-center leading-[14.64px]"
                >
                  Goals
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Goal  section end here */}

        {/* Center Start */}
        <div className="col-span-1 h-[256px] w-full flex justify-center items-start">
          <div className="w-[256px] h-[256px] z-10 relative p-6 rounded-full border-2 border-dashed border-[#0a1723]">
            <span className="w-[70px] h-[2px]  bg-gradient-to-r from-[#172E55] to-[#0A1723] rotate-90 absolute -top-[36px] left-[35%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-gradient-to-r from-[#172E55] to-[#0A1723] rounded-full"></span>
                </span>
              </span>
            </span>
            <span className="w-[70px] h-[2px]  bg-gradient-to-r from-[#172E55] to-[#0A1723] -rotate-[135deg] absolute  bottom-[6px] left-[80%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-gradient-to-r from-[#172E55] to-[#0A1723] rounded-full"></span>
                </span>
              </span>
            </span>

            <span className="h-8 flex justify-center text-center items-center  rounded-full bg-white absolute -bottom-4  left-14">
              <div className="text-lg text-center font-medium text-[#0a1723] ">
                Sanethia Thomas
              </div>
            </span>
            <span className="w-[70px] h-[2px]  bg-gradient-to-r from-[#172E55] to-[#0A1723] rotate-[320deg] absolute bottom-[6px] right-[80%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-gradient-to-r from-[#172E55] to-[#0A1723] rounded-full"></span>
                </span>
              </span>
            </span>
            <span className="w-[70px] h-[2px]  bg-gradient-to-r from-[#172E55] to-[#0A1723] rotate-[25deg] absolute top-[52px] -left-[52px]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-gradient-to-r from-[#172E55] to-[#0A1723] rounded-full"></span>
                </span>
              </span>
            </span>
            <span className="w-[70px] h-[2px]  bg-gradient-to-r from-[#172E55] to-[#0A1723] rotate-[155deg]  absolute top-[52px] -right-[52px]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-gradient-to-r from-[#172E55] to-[#0A1723] rounded-full"></span>
                </span>
              </span>
            </span>

            <div className="w-full h-full bg-gradient-to-r from-[#172E55] to-[#0A1723] rounded-full p-6">
              <img
                src={Centerpro}
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>
          </div>
        </div>
        {/* Center End */}

        {/* Reading Section Start here */}
        <div className="col-span-1 h-[256px] relative w-full -top-5 flex justify-start items-center">
          {reading && (
            <>
              <div className="bg-white h-[180px]   -top-[65px] -left-[10px]  w-[120px] rounded-full absolute z-10   "></div>
              <div className="border-2 border-dashed rounded-full h-[160px] -left-[5px]   w-[160px] border-[#56EC17] absolute z-0  -top-[70px] "></div>
            </>
          )}
          <div className="w-[125px] h-[125px] absolute -top-12   rotate-[70deg] p-2  z-10">
            {reading && (
              <div
                className={`animationtransferaable transition-opacity ${
                  reading ? "opacity-100" : "opacity-0"
                } duration-1000 ease-in-out `}
                style={{ transition: "opacity 0.5s ease-in-out" }}
              >
                <span className="w-[120px] h-[2px] bg-[#56EC17] rotate-[100deg] absolute  -top-[96px]  left-[20%]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[170deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Critical thinking
                    </span>
                  </span>
                </span>
                <span className="w-[100px] h-[2px] bg-[#56EC17] rotate-[50deg] absolute -top-[40px] -left-[70%]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[120deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Focus
                    </span>
                  </span>
                </span>
                <span className="w-[210px] h-[2px] bg-[#56EC17] rotate-[70deg] absolute -top-[130px] -left-[95px]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[140deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Critical thinking
                    </span>
                  </span>
                </span>
                <span className="w-[210px] h-[2px] bg-[#56EC17] rotate-[120deg] absolute -top-[110px] left-[65px]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[190deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Critical thinking
                    </span>
                  </span>
                </span>
                <span className="w-[110px] h-[2px] bg-[#56EC17] rotate-[145deg] absolute -top-[32px] -right-[100%]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] rotate-[-215deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Vocabulary
                    </span>
                  </span>
                </span>
              </div>
            )}
            <div
              className="w-full cursor-pointer h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2"
              onClick={() => handleReading()}
            >
              <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
                <div
                  className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] 
                flex justify-center items-center rounded-full p-2 text-[14.64px] font-[600] text-[#172E55] text-center leading-[14.64px] -rotate-[70deg]"
                >
                  Reading
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Reading Section end here */}

        {/* careers Section Start here */}
        <div className="col-span-1 h-[256px] w-full flex justify-center items-center"></div>
        <div className="col-span-1 h-[256px] relative w-full flex justify-center items-start">
          <div className="nodecarrer">
          {careers && (
            <>
              <div className="bg-white h-[140px]   -top-[95px] -right-[89px]  w-[190px] rounded-full absolute z-10   "></div>
              <div className="border-2 border-dashed rounded-full h-[160px] -right-[85px]  w-[160px] border-[#56EC17] absolute z-0  -top-[95px] "></div>
            </>
          )}
          <div className="w-[125px] h-[125px] absolute -top-24 -right-16 rotate-[150deg] p-2 rounded-full z-10 ">
            {careers && (
              <div
                className={`animationtransferaable transition-opacity ${
                  careers ? "opacity-100" : "opacity-0"
                } duration-1000 ease-in-out `}
                style={{ transition: "opacity 0.5s ease-in-out" }}
              >
                <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-90 absolute -top-[86px] left-[22%]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[-120deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Human Resources
                    </span>
                  </span>
                </span>
                <span className="w-[210px] h-[2px] bg-[#56EC17] rotate-[120deg] absolute -top-[130px] left-[60px]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[-90deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Human Resources
                    </span>
                  </span>
                </span>
                <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[30deg] absolute -top-[22px] -left-[60%]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[-180deg]  rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Human Resources
                    </span>
                  </span>
                </span>
                <span className="w-[210px] h-[2px] bg-[#56EC17] rotate-[60deg] absolute -top-[129px] -left-[110%]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[-150deg]  rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      Human Resources
                    </span>
                  </span>
                </span>

                <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[145deg] absolute -top-[12px] -right-[80%]">
                  <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                    <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                      <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                    </span>
                  </span>
                  <span
                    onClick={() => setAppear((prev) => !prev)}
                    className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723]  flex items-center justify-center absolute -top-[50px] -left-[130px]"
                  >
                    <span className="w-[80px] h-[80px] -rotate-[-65deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                      STEM
                    </span>
                  </span>
                </span>
              </div>
            )}
            <div
              className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2"
              onClick={() => handleCareers()}
            >
              <div className="w-full cursor-pointer h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
                <div
                  className="w-full h-full rotate-[210deg] bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full 
                p-2 text-[14.64px] font-[600] text-[#172E55] text-center leading-[14.64px]"
                >
                  Careers
                </div>
              </div>
            </div>
          </div>
          </div>
          {/* careers Section End here */}
          <div className="nodemath">
            {math && (
              <>
                <div className="bg-white h-[130px]   -top-[105px] -left-[65px]  w-[140px] rounded-full absolute z-10   "></div>
                <div className="border-2 border-dashed rounded-full h-[140px] -left-[75px]   w-[140px] border-[#56EC17] absolute z-0  -top-[100px] "></div>
              </>
            )}
            <div className="w-[125px] h-[125px] absolute -top-24 -left-16 -rotate-[145deg]   z-20 p-2 ">
              {math && (
                <div
                  className={`animationtransferaable transition-opacity ${
                    math ? "opacity-100" : "opacity-0"
                  } duration-1000 ease-in-out `}
                  style={{ transition: "opacity 0.5s ease-in-out" }}
                >
                  <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-90 absolute z-20 -top-[56px] left-[22%] ">
                    <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]   flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                      <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                        <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                      </span>
                    </span>
                    <span
                      onClick={() => setAppear((prev) => !prev)}
                      className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                    >
                      <span className="w-[80px] h-[80px] -rotate-[-55deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                        Strategic Thinker
                      </span>
                    </span>
                  </span>
                  <span className="w-[210px] h-[2px] bg-[#56EC17] rotate-[60deg] absolute -top-[99px] -left-[140px]">
                    <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                      <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                        <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                      </span>
                    </span>
                    <span
                      onClick={() => setAppear((prev) => !prev)}
                      className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                    >
                      <span className="w-[80px] h-[80px] -rotate-[-85deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                        Strategic Thinker
                      </span>
                    </span>
                  </span>
                  <span className="w-[210px] h-[2px] bg-[#56EC17] rotate-[120deg] absolute -top-[100px] left-[50px]">
                    <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                      <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                        <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                      </span>
                    </span>
                    <span
                      onClick={() => setAppear((prev) => !prev)}
                      className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                    >
                      <span className="w-[80px] h-[80px] -rotate-[-25deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                        Patience
                      </span>
                    </span>
                  </span>
                  <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[30deg] absolute -top-[2px] -left-[65%]">
                    <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                      <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                        <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                      </span>
                    </span>
                    <span
                      onClick={() => setAppear((prev) => !prev)}
                      className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                    >
                      <span className="w-[80px] h-[80px] -rotate-[-115deg]  rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                        Focus
                      </span>
                    </span>
                  </span>
                  <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[145deg] absolute top-[22px] -right-[70%]">
                    <span className="w-[14.56px] h-[14.56px]  rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                      <span className="w-[14px] h-[14px] rounded-full bg-white flex justify-center items-center">
                        <span className="w-[9px] h-[9px] bg-[#56EC17] rounded-full"></span>
                      </span>
                    </span>
                    <span
                      onClick={() => setAppear((prev) => !prev)}
                      className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
                    >
                      <span className="w-[80px] h-[80px] -rotate-[-0deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                        Detailed Oreinted
                      </span>
                    </span>
                  </span>
                </div>
              )}
              <div
                className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2"
                onClick={() => handlemath()}
              >
                <div className="w-full cursor-pointer h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
                  <div
                    className="w-full h-full rotate-[-215deg] bg-[#56EC17]
                 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2 text-[14.64px] 
                 font-[600] text-[#172E55] text-center leading-[14.64px]"
                  >
                    Math
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
}

export default MyTransferableSkills;
