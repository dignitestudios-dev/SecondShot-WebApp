import React from "react";

const PhoneInputs = ({ value, handleChange, isAuth }) => {
  return (
    <div
      className={`flex items-center p-0 w-full pl-2 outline-none font-[500] focus-within:border-[#0E73D0] 
      border border-[#9A9A9A] rounded-[15px] placeholder:text-[16px] placeholder:font-[400]
      placeholder:text-[#181818] text-[#181818] ${
        isAuth ? "bg-transparent" : "bg-white"
      } 
      h-full px-3 text-sm font-medium`}
    >
      <span className="text-xl pr-2">
        <img
          src="https://flagcdn.com/w320/us.png"
          alt="US flag"
          className="w-6 h-4 mr-2"
        />
      </span>

      <span className="text-[16px] font-[400] ">+1</span>

      <div className="border-l h-6 mx-2"></div>

      <input
        type="tel"
        className="outline-none w-full text-lg placeholder:text-[#181818] placeholder:font-[400] h-[49px]"
        placeholder="123-456-7890"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default PhoneInputs;
