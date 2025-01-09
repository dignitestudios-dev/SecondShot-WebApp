import React from "react";
import { Centerpro, skillright, skilltop } from "../../assets/export";

const NewTrasnferSkill = () => {
  return (
    <div className="ParentDiv h-[1000px] ">
      <div  className="flex justify-center ">
        <img src={skilltop} className=" h-[352.13px] " alt="" />
      </div>
      <div>
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
<div>
    <img src={skillright} className="" alt="" />
</div>
            <div className="w-full h-full bg-gradient-to-r from-[#172E55] to-[#0A1723] rounded-full p-6">
              <img
                src={Centerpro}
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default NewTrasnferSkill;
