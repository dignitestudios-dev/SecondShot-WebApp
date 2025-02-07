import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomCalendar = ({
  setShowCalender,
  startDate,
  setStartDate,
  maxDate,
}) => {
  const handleSave = () => {
    setShowCalender(false);
  };

  const handleCancel = () => {
    setShowCalender(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="w-[300px] absolute  z-10 bg-white p-6 rounded-lg shadow-md">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          inline
          calendarClassName="custom-calendar"
          // minDate={maxDate}
        />

        <div className="flex justify-between w-full mt-2">
          <button
            className="text-[#666666] underline text-[14px] font-[500]"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-[#012C57] text-white w-[76px] h-[33px] rounded-[8px] text-[14px] font-[600] leading-[21px]"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
