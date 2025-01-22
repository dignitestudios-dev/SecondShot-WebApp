import { BsFillBookmarkStarFill } from "react-icons/bs";

const Skills = ({ label, onClick, cardnote, setCardnote, appear, setAppear, position ,handleIconClick,isActive }) => {
    return (
      <div className="relative">
        <div
          className={`cursor-pointer bg-transparent h-[70px] rounded-full flex justify-center items-center ${position}`}
          onClick={onClick}
        >
          {label}
          {cardnote && (
            <span
              className={`w-[388px] h-[154px] flex transition-all duration-500 absolute top-[50px] right-[4px] z-10 rounded-2xl bg-[#D4FFC2] p-4 justify-between items-start`}
            >
              <span className="w-[80%] h-full text-md font-medium text-gray-800">
                Critical thinking in the workplace is essential for making informed decisions, solving complex problems, and fostering innovation.
              </span>
              <span className="w-[20%] h-full flex justify-end items-start">
                <BsFillBookmarkStarFill
                  size={"27px"}
                  onClick={handleIconClick}
                  className={`transition duration-200 cursor-pointer ${isActive ? "text-green-500" : "text-gray-500"}`}
                />
              </span>
            </span>
          )}
        </div>
      </div>
    );
  };
  export default Skills
  