import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const MakeitSmartInput = ({
  register,
  text,
  type,
  error,
  placeholder,
  value,
  isDisabled = false,
  isAuth = true,
  maxLength,
}) => {
  const [isPassVisible, setIsPassVisible] = useState(false);

  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
      <label className="ml-1 text-[14px] font-medium text-[#181818] ">
        {text}
      </label>

      <div
        className={`w-full h-[52px] focus-within:border-[1px] border focus-within:border-[#0E73D0] rounded-[15px]  flex items-center justify-center ${
          error
            ? "focus-within:border-[#FF453A]"
            : "focus-within:border-[#55C9FA]"
        }`}
      >
        <div className="w-full h-full flex items-center justify-center rounded-[12px] relative">
          <input
            value={value}
            type={isPassVisible ? "text" : type}
            disabled={isDisabled}
            maxLength={maxLength}
            placeholder={placeholder}
            // className="w-full text-sm border border-gray-300 focus:border-blue-500
            //  text-[#181818] placeholder:font-normal font-medium px-4 lg:py-3 md:py-2 py-3 my-2 rounded-xl outline-none"
            className={`w-full p-3 outline-none font-[500] focus:border-[#0E73D0]  border border-[#9A9A9A] rounded-[15px] 
              placeholder:text-[16px] placeholder:font-[400] placeholder:text-[#181818] text-[#181818] ${
                isAuth ? "bg-transparent" : "e"
              } h-full px-3 text-sm font-medium`}
            {...register}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={() => setIsPassVisible((prev) => !prev)}
              className="absolute top-4 right-3 text-lg"
              style={{
                color: "#6B7373",
              }}
            >
              {!isPassVisible ? (
                <FaEyeSlash className="text-lg text-gray-800" />
              ) : (
                <FaEye className="text-lg text-gray-800" />
              )}
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default MakeitSmartInput;
