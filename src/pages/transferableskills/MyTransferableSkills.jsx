import React, { useState } from "react";


function MyTransferableSkills() {
  const [tooltip, setTooltip] = useState({ show: false, text: "", x: 0, y: 0 });

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

  return (
    <div className=" ">
   
      {/* Navbar */}

      {/* Main Heading */}
      <div className="text-left text-sm text-gray-700 font-bold cursor-pointer mt-8 mb-2 ">
        &lt; Back
      </div>

      {/* Header with "Make It Smart" button */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            My Transferable Skills
          </h1>
          <p className="text-md  font-medium text-black w-[60%] mt-2">
            Here is a map of your transferable skills. Take a look at all the
            soft skills you have acquired from your various experiences!! Click
            on each circle to expand to learn about how you can use your skills
            in other areas of your life.
          </p>
        </div>
        {/* "Make It Smart" button */}
        <div className=" w-[30%] flex items-center justify-end">
          <div className="text-md font-semibold">Print Skills</div>
          <div className="cursor-pointer">
            {/* <img className="w-14" src={printing} /> */}
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
            {/* <img src={Save} alt="" className="w-[16px]" /> */}
          </span>
        </span>
        <div className="col-span-1 h-[256px] w-full flex justify-center items-center"></div>
        <div className="col-span-1 h-[256px] w-full flex justify-center items-end">
          <div className="w-[125px] h-[125px] relative p-2 rounded-full border border-dashed border-[#56EC17]">
            <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-90 absolute -top-[36px] left-[22%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
                </span>
              </span>
              <button
                onClick={() => setAppear((prev) => !prev)}
                className="w-[100px] h-[100px]  cursor-pointer outline-none rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
              >
                <span className="w-[80px] h-[80px] -rotate-90 rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                  Grit
                </span>
              </button>
            </span>
            <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[30deg] absolute top-[22px] -left-[50%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
                </span>
              </span>
              <span
                onClick={() => setAppear((prev) => !prev)}
                className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
              >
                <span className="w-[80px] h-[80px] -rotate-[30deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                  Positioning
                </span>
              </span>
            </span>
            <span className="group w-[70px] h-[2px] bg-[#56EC17] rotate-[145deg] absolute top-[22px] -right-[50%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
                </span>
              </span>
              <span
                onClick={() => setAppear((prev) => !prev)}
                className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
              >
                <span className="w-[80px] h-[80px] rotate-[-145deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                  Persistance
                </span>
              </span>
            </span>
            <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
              <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
                <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2 text-[14.64px] font-[600] leading-[14.64px] text-white text-center ">
                Power Forward
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 h-[256px] w-full flex justify-center items-center"></div>
        <div className="col-span-1 h-[256px] relative w-full flex justify-end items-center">
          <div className="w-[125px] h-[125px] absolute -top-12 right-4  -rotate-[70deg] p-2 rounded-full border border-dashed border-[#56EC17]">
            <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-90 absolute -top-[36px] left-[22%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
                </span>
              </span>
              <span
                onClick={() => setAppear((prev) => !prev)}
                className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
              >
                <span className="w-[80px] h-[80px] -rotate-[20deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                  Teamwork
                </span>
              </span>
            </span>
            <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[30deg] absolute top-[22px] -left-[50%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
                </span>
              </span>
              <span
                onClick={() => setAppear((prev) => !prev)}
                className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
              >
                <span className="w-[80px] h-[80px] rotate-[40deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                  Leadership
                </span>
              </span>
            </span>
            <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[145deg] absolute top-[22px] -right-[50%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
                </span>
              </span>
              <span
                onClick={() => setAppear((prev) => !prev)}
                className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
              >
                <span className="w-[80px] h-[80px] -rotate-[75deg] rounded-full  bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                  Time Management
                </span>
              </span>
            </span>
            <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
              <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
                <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] rotate-[70deg] flex justify-center items-center rounded-full p-2 text-sm font-medium text-[#0A1723] text-center leading-3">
                  Basketball
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Start */}
        <div className="col-span-1 h-[256px] w-full flex justify-center items-start">
          <div className="w-[256px] h-[256px] z-10 relative p-6 rounded-full border border-dashed border-[#0a1723]">
            <span className="w-[70px] h-[2px]  bg-gradient-to-r from-[#172E55] to-[#0A1723] rotate-90 absolute -top-[36px] left-[35%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-gradient-to-r from-[#172E55] to-[#0A1723] rounded-full"></span>
                </span>
              </span>
            </span>
            <span className="w-[70px] h-[2px]  bg-gradient-to-r from-[#172E55] to-[#0A1723] -rotate-[135deg] absolute bottom-[6px] left-[80%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-gradient-to-r from-[#172E55] to-[#0A1723] rounded-full"></span>
                </span>
              </span>
            </span>

            <span className="w-auto h-14 flex justify-center items-end bg-white absolute -bottom-8 left-[4.3rem]">
              <span className="text-lg font-medium text-[#0a1723] ">
                Sanethia Thomas
              </span>
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
            <span className="w-[70px] h-[2px]  bg-gradient-to-r from-[#172E55] to-[#0A1723] rotate-[155deg] absolute top-[52px] -right-[52px]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-gradient-to-r from-[#172E55] to-[#0A1723] rounded-full"></span>
                </span>
              </span>
            </span>

            <div className="w-full h-full bg-gradient-to-r from-[#172E55] to-[#0A1723] rounded-full p-6">
              {/* <img
                src={Sanethia}
                alt=""
                className="w-full h-full rounded-full"
              /> */}
            </div>
          </div>
        </div>

        {/* Center End */}

        <div className="col-span-1 h-[256px] relative w-full flex justify-start items-center">
          <div className="w-[125px] h-[125px] absolute -top-12 left-4  rotate-[70deg] p-2 rounded-full border border-dashed border-[#56EC17]">
            <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-90 absolute -top-[36px] left-[22%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
                </span>
              </span>
              <span
                onClick={() => setAppear((prev) => !prev)}
                className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
              >
                <span className="w-[80px] h-[80px] -rotate-[160deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                  Detail Oriented
                </span>
              </span>
            </span>
            <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[30deg] absolute top-[22px] -left-[50%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
                </span>
              </span>
              <span
                onClick={() => setAppear((prev) => !prev)}
                className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
              >
                <span className="w-[80px] h-[80px] -rotate-[100deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                  Strategic Thinker
                </span>
              </span>
            </span>
            <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[145deg] absolute top-[22px] -right-[50%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
                </span>
              </span>
              <span
                onClick={() => setAppear((prev) => !prev)}
                className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
              >
                <span className="w-[80px] h-[80px] rotate-[-215deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                  Patience
                </span>
              </span>
            </span>
            <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
              <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
                <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2 text-sm font-medium text-[#0A1723] text-center leading-3 -rotate-[70deg]">
                  Math
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third row */}
        <div className="col-span-1 h-[256px] w-full flex justify-center items-center"></div>
        <div className="col-span-1 h-[256px] relative w-full flex justify-center items-start">
          <div className="w-[125px] h-[125px] absolute -top-24 -right-16 rotate-[150deg] p-2 rounded-full border border-dashed border-[#56EC17]">
            <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-90 absolute -top-[36px] left-[22%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
                </span>
              </span>
              <span
                onClick={() => setAppear((prev) => !prev)}
                className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
              >
                <span className="w-[80px] h-[80px] -rotate-[-120deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                  Education & Training
                </span>
              </span>
            </span>
            <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[30deg] absolute top-[22px] -left-[50%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
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
            <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[145deg] absolute top-[22px] -right-[50%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
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
            <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
              <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
                <div className="w-full h-full rotate-[210deg] bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2 text-sm font-medium text-[#0A1723] text-center leading-3">
                  Computer Science
                </div>
              </div>
            </div>
          </div>
          <div className="w-[125px] h-[125px] absolute -top-24 -left-16 -rotate-[145deg] p-2 rounded-full border border-dashed border-[#56EC17]">
            <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-90 absolute -top-[36px] left-[22%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
                </span>
              </span>
              <span
                onClick={() => setAppear((prev) => !prev)}
                className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
              >
                <span className="w-[80px] h-[80px] -rotate-[-55deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                  Critical Thinking
                </span>
              </span>
            </span>
            <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[30deg] absolute top-[22px] -left-[50%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
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
            <span className="w-[70px] h-[2px] bg-[#56EC17] rotate-[145deg] absolute top-[22px] -right-[50%]">
              <span className="w-[13.56px] h-[13.56px] rounded-full bg-[#56EC17]  flex justify-center items-center absolute -top-[6px] -left-[6.75px]">
                <span className="w-[12px] h-[12px] rounded-full bg-white flex justify-center items-center">
                  <span className="w-[11px] h-[11px] bg-[#56EC17] rounded-full"></span>
                </span>
              </span>
              <span
                onClick={() => setAppear((prev) => !prev)}
                className="w-[100px] h-[100px]  cursor-pointer rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] flex items-center justify-center absolute -top-[50px] -left-[130px]"
              >
                <span className="w-[80px] h-[80px] -rotate-[-0deg] rounded-full bg-gradient-to-r from-[#172E55] to-[#0A1723] shadow-[0px_4px_10px_2px_#0A1723] flex items-center justify-center text-sm font-medium text-white text-center leading-3">
                  Vocabulary
                </span>
              </span>
            </span>
            <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
              <div className="w-full h-full bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2">
                <div className="w-full h-full rotate-[-215deg] bg-[#56EC17] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] flex justify-center items-center rounded-full p-2 text-sm font-medium text-[#0A1723] text-center leading-3">
                  Reading
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 h-[256px] w-full flex justify-center items-center"></div>
      </div>
    </div>
  );
}

export default MyTransferableSkills;
