import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomCalendar = ({
  setShowCalender,
  startDate,
  setStartDate,
  maxDate,
}) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowCalender(false); // Close the calendar
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowCalender]);
  const handleSave = () => {
    setShowCalender(false);
  };

  const handleCancel = () => {
    setShowCalender(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div    ref={modalRef} className="w-[300px] absolute  z-10 bg-white p-6 rounded-lg shadow-md">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          inline
          calendarClassName="custom-calendar"
          minDate={new Date()}
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
