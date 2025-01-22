import React from "react";
import { CiSearch } from "react-icons/ci";
import { SearchImg } from "../../assets/export";

const SearchInput = ({placeholder}) => {
  return (
    <div>
      <div className="relative flex items-center">
       <img src={SearchImg} className="w-[18px] h-[18px] absolute left-3" alt="" />
        <input
          type="text"
          placeholder={placeholder}
          className="pl-10 pr-4 py-2  border h-[48px] rounded-[10px] border-[#535353] shadow-sm w-full focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchInput;
