import React, { useState } from "react";
import { CenterSkill, Profileimage, skillbottomleft, skillbottomright, skillleft, skillright, skilltop } from "../../assets/export";


const NewTranfer = () => {
  const [topSkill, setTopSkill] = useState(false);
  const [LeftSkill, setLeftSkill] = useState(false);
  const [RightSkill, setRightSkill] = useState(false);
  const [BottomRightSkill, setBottomRightSkill] = useState(false);
  const [BottomLeftSkill, setBottomLeftSkill] = useState(false);
  const [appear, setAppear] = useState(false);


  

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 justify-center items-center">
        <div
          className={`col-span-12 flex justify-center relative top-[80px] left-[2px]  ${
            topSkill ? "flex" : "invisible"
          }`}
        >
          <div className="relative">
            <img
              src={skilltop}
              className="h-[344px] object-contain"
              alt="Top Skill"
            />

            <div
              className="absolute z-10 w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                top: "21%",
                left: "22.5%",
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setAppear((prev) => !prev)}
            >
              Presistence
              <span
                className={`w-[388px] flex transition-all duration-500 absolute top-12 right-0 left-0 z-20 rounded-2xl bg-[#D4FFC2] p-4 justify-between items-start ${
                  appear ? "scale-100" : "scale-0"
                }`}
              >
                <span className="text-start h-full text-wrap text-[14px] leading-[20px] font-medium text-[#172E55]">
                  Critical thinking in the workplace is essential for making
                  informed decisions, solving complex problems, and fostering
                  innovation.
                </span>
                <div className="absolute -top-2 right-0 left-4 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#D4FFC2]" />
              </span>
            </div>

            <div
              className="absolute z-10 w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                top: "21%",
                right: "24%",
                transform: "translate(50%, -50%)",
              }}
            >
              Positioning
            </div>

            <div
              className="absolute z-0 w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                top: "39%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Presistence
            </div>

            <div
              className="absolute z-10 w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "41%",
                left: "14%",
                transform: "translate(-50%, 50%)",
              }}
            >
              Positioning
            </div>

            <div
              className="absolute z-10 w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "43%",
                right: "14%",
                transform: "translate(50%, 50%)",
              }}
            >
              Presistence
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 items-center=">
        <div
          className={`col-span-3 flex justify-center relative bottom-[140px] left-[55px]  ${
            LeftSkill ? "flex" : "invisible"
          } `}
        >
          <div className="relative">
            <img
              src={skillleft}
              className="h-[725px] object-contain "
              alt="Left Skill"
            />
            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "60%",
                left: "30%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Positioning
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "61%",
                right: "33%",
                transform: "translate(50%, -50%)",
              }}
            >
              Positioning
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "42%",
                left: "38%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Presistence
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "38.5%",
                left: "22%",
                transform: "translate(-50%, 50%)",
              }}
            >
              Positioning
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "30.4%",
                left: "26%",
                transform: "translate(50%, 50%)",
              }}
            >
              Presistence
            </div>
          </div>
        </div>
        {/* Center Section Start */}
        <div className="col-span-6 flex justify-center">
          <div className="relative">
            <img
              src={CenterSkill}
              className="h-[615.67px] object-contain"
              alt="Center Skill"
            />
            <div className="absolute bottom-[42.7%] left-[38.5%]">
              <img
                src={Profileimage}
                className="w-[142px] h-[142px]  rounded-full"
                alt=""
              />
              <div>
                <div className="absolute left-10 top-[160px] text-[#152b4e] font-medium text-center">
                  <div className="text-[20px]">Mathew</div>
                </div>
              </div>
            </div>
            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-[#152b4e] leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                top: "15%",
                left: "51.5%",
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setTopSkill((prev) => !prev)}
            >
              Power Forward
            </div>

            <div
              className="absolute z-20 w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-[#152b4e] leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                top: "37%",
                left: "12%",
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setLeftSkill((prev) => !prev)}
            >
              Goals
            </div>

            <div
              className="absolute z-0 w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-[#152b4e] leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                top: "37%",
                right: "2%",
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setRightSkill((prev) => !prev)}
            >
              Reading
            </div>
            <div
              className="absolute z-20 w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-[#152b4e] leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "19.3%",
                right: "12%",
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setBottomRightSkill((prev) => !prev)}
            >
              Careers
            </div>
            <div
              className="absolute z-20 w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-[#152b4e] leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "19.3%",
                left: "22%",
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setBottomLeftSkill((prev) => !prev)}
            >
              Math
            </div>
          </div>
        </div>
        {/* Center Section End */}
        <div
          className={`col-span-3 flex justify-center relative bottom-[135px] right-[50px]  ${
            RightSkill ? "flex" : "invisible"
          } `}
        >
          <div className="relative">
            <img
              src={skillright}
              className="h-[725px] object-contain "
              alt="Right Skill"
            />
            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "62%",
                left: "30%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Positioning
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "61%",
                right: "23%",
                transform: "translate(50%, -50%)",
              }}
            >
              Presistence
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "43%",
                right: "19%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Positioning
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "37%",
                right: "2%",
                transform: "translate(-50%, 50%)",
              }}
            >
              Presistence
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "29%",
                left: "29%",
                transform: "translate(50%, 50%)",
              }}
            >
              Positioning
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 items-center">
        <div
          className={`col-span-6  flex justify-center relative bottom-[240px] left-[34px]  ${
            BottomLeftSkill ? "flex" : "invisible"
          }`}
        >
          <div className="relative">
            <img
              src={skillbottomleft}
              className="h-[425px] object-contain "
              alt="Left Skill"
            />
            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "63%",
                left: "25%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Positioning
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "4%",
                left: "49%",
                transform: "translate(50%, -50%)",
              }}
            >
              Presistence
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "29%",
                left: "46%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Positioning
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "46%",
                left: "20%",
                transform: "translate(-50%, 50%)",
              }}
            >
              Presistence
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "35%",
                right: "18%",
                transform: "translate(50%, 50%)",
              }}
            >
              Positioning
            </div>
          </div>
        </div>

        <div
          className={`col-span-6 flex justify-center relative bottom-[224px] right-[55px]  ${
            BottomRightSkill ? "flex" : "invisible"
          }`}
        >
          <div className="relative">
            <img
              src={skillbottomright}
              className="h-[425px] object-contain "
              alt="Right Skill"
            />
            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                top: "19%",
                right: "10%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Positioning
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "5%",
                left: "33%",
                transform: "translate(50%, -50%)",
              }}
            >
              Presistence
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                top: "52%",
                right: "30%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Positioning
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "39.5%",
                left: "22%",
                transform: "translate(-50%, 50%)",
              }}
            >
              Presistence
            </div>

            <div
              className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center"
              style={{
                bottom: "47%",
                right: "14%",
                transform: "translate(50%, 50%)",
              }}
            >
              Positioning
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTranfer;
