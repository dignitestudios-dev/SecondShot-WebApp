import React, { useRef, useState } from "react";
import { Application, Card, Calendar } from "react-rainbow-components";
import moment from "moment";

const theme = {
  rainbow: {
    palette: {
      brand: "#199BD1",
    },
    shadows: {
      brand: "none",
    },
  },
};

const CalenderDate = ({
  isOpen,
  setIsOpen,
  setDueDate,
  setInputError,
  isRange = "",
}) => {
  const today = moment();
  const [date, setDate] = useState(today.toDate());
  const dateRef = useRef();

  const toggleModal = (e) => {
    if (dateRef.current && !dateRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);

  const [selectedPeriod, setSelectedPeriod] = useState("AM");

  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  const convertTo24Hour = (hour, period) => {
    const numericHour = parseInt(hour, 10);
    return period === "PM" && numericHour !== 12
      ? numericHour + 12
      : period === "AM" && numericHour === 12
      ? 0
      : numericHour;
  };

  const handleDueDate = () => {
    if (!selectedHour || !selectedMinute) {
      alert("Please select both hour and minute.");
      return;
    }

    const fullDate = moment(date)
      .hour(convertTo24Hour(selectedHour, selectedPeriod))
      .minute(selectedMinute)
      .second(0);

    const formattedDate = fullDate.format("YYYY-MM-DD HH:mm:ss");
    const unixTimestamp = fullDate.unix();

    setDueDate({
      normal: formattedDate,
      unix: unixTimestamp,
    });
    setInputError({});
    setIsOpen(false);
  };

  return (
    <div
      onClick={toggleModal}
      className={`fixed z-[10000] top-0 p-2 left-0 transition-all duration-300 w-screen h-screen flex justify-center items-center bg-transparent ${
        isOpen ? "scale-1" : "scale-0"
      }`}
    >
      <div
        ref={dateRef}
        className="relative w-full lg:w-[748px] h-auto md:h-[557px] divide-x-2 divide-[#1A293D] shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex justify-start items-start bg-[#243347] rounded-3xl"
      >
        <button
          className="absolute top-4 right-4 text-[#199BD1] text-2xl font-bold"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        <div className="w-[40%] md:flex hidden h-full p-10 flex-col justify-between items-center">
          <div className="">
            <h2 className="text-white text-lg font-bold mb-1">Select Time</h2>
            <p className="text-[#D1D5DB] text-sm mb-5">
              Set the clock to your convenience by selecting a suitable time
            </p>
            <div className="flex gap-1 w-full justify-between  h-[400px]">
              <div className="flex gap-1 w-[80px] overflow-auto">
                <div className="flex flex-col gap-2 ">
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className={`flex justify-center w-10 h-10 rounded border ${
                        selectedHour === hour
                          ? "border-blue-500 text-blue-500"
                          : "border-transparent text-white"
                      } hover:border-blue-400 text-[16px] items-center cursor-pointer`}
                      onClick={() => setSelectedHour(hour)}
                    >
                      {hour}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-1 w-[50px] overflow-auto">
                <div className="flex flex-col gap-2  h-[400px]">
                  {minutes?.map((minute) => (
                    <div
                      key={minute}
                      className={`flex justify-center w-10 h-10 rounded border ${
                        selectedMinute === minute
                          ? "border-blue-500 text-blue-500"
                          : "border-transparent text-white"
                      } hover:border-blue-400 text-[16px] items-center cursor-pointer`}
                      onClick={() => setSelectedMinute(minute)}
                    >
                      {minute}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex  gap-2">
                <button
                  className={`w-[35px] h-[32px] py-2 rounded text-white ${
                    selectedPeriod === "AM"
                      ? "bg-blue-500"
                      : "bg-[#1E293B] hover:bg-blue-400"
                  }`}
                  onClick={() => setSelectedPeriod("AM")}
                >
                  AM
                </button>
                <button
                  className={`w-[35px] h-[32px] py-2 rounded text-white ${
                    selectedPeriod === "PM"
                      ? "bg-blue-500"
                      : "bg-[#1E293B] hover:bg-blue-400"
                  }`}
                  onClick={() => setSelectedPeriod("PM")}
                >
                  PM
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[60%] px-2 pt-10 pb-4 h-full flex flex-col gap-4 justify-start items-start">
          <div className="w-full flex flex-col gap-1 justify-start items-start px-8">
            <h1 className="text-2xl text-white font-bold">Select Date</h1>
            <p className="text-md text-white/50 font-normal">
              Choose the perfect date for the task deadline
            </p>
          </div>
          <div
            id="calendar_div"
            className="flex flex-col bg-[#243347] gap-1 w-full h-[22rem]"
          >
            <Application
              theme={theme}
              className="w-full h-[23rem] bg-[#243347] flex gap-4 flex-col items-center justify-start"
            >
              <Card
                className="rainbow-p-around_large calender bg-[#243347] w-full h-full"
                style={{ boxShadow: "none", borderRadius: 0, border: "none" }}
              >
                <Calendar
                  className="h-full bg-[#243347]"
                  id="calendar-1"
                  value={date}
                  minDate={today.toDate()}
                  onChange={(value) => {
                    setDate(value);
                  }}
                  selectionType={isRange}
                />
              </Card>
            </Application>
          </div>

          <button
            type="button"
            onClick={handleDueDate}
            className="w-3/4 h-14 px-4 ml-11 rounded-lg flex justify-center items-center text-md font-medium
            bg-[#199BD1] text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalenderDate;
