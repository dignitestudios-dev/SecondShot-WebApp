import { BsFillBookmarkStarFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function LibraryCareer() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="group relative rounded-2xl p-4 bg-[#FAF5FF] text-black shadow-lg cursor-pointer hover:bg-gradient-to-l from-[#012C57] to-[#061523] hover:text-white transition "
          >
            <div className="absolute top-4 right-4">
              <BsFillBookmarkStarFill className="text-[#56EC17] group-hover:text-white transition " />
            </div>

            <div className="flex flex-col text-left mb-4">
              <span className="text-xl font-semibold group-hover:text-white transition ">
                Career
              </span>
              <span className="text-xl font-semibold group-hover:text-white transition ">
                Recommendations
              </span>
            </div>

            <div className="space-y-2 mb-6 text-left">
              {[
                "Business Management & Admin",
                "Health Science",
                "Information Technology",
                "Marketing",
                "Manufacturing",
              ].map((field, i) => (
                <div
                  key={i}
                  className="inline-block px-3 py-1 text-sm font-normal rounded-md bg-transparent border border-[#012C57] text-[#012C57] group-hover:border-white group-hover:text-white transition  mr-2"
                >
                  {field}
                </div>
              ))}
            </div>

            <Link
              to={"/careerdetails"}
              className="text-sm flex justify-between items-center group-hover:text-white"
            >
              <span>{`10/July/2024`}</span>
              <button className="p-2 rounded-lg bg-[#012C57] text-white group-hover:bg-white group-hover:text-[#012C57] transition ">
                <IoIosArrowForward />
              </button>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default LibraryCareer;
