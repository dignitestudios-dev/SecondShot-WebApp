import React, { useEffect, useState } from "react";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import axios from "../../axios";
import { SuccessToast } from "../toaster/ToasterContainer";

const Transferable = () => {
  const [library, setLibrary] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [loading, setLoading] = useState(true);

  const getLibrary = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "/api/user/get-user-transferable-skills"
      );
      if (response.status === 200) {
        setLibrary(response?.data?.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLibrary();
  }, []);

  const handleLike = async (index, skillData) => {
    const isCurrentlyLiked = likedItems[index] || false;

    try {
      const response = await axios.post("/api/user/toggle-transferable-skill", {
        skillId: skillData.id,
        descriptionId: skillData.descriptionId,
      });

      if (response.status === 200) {
        setLikedItems((prev) => ({
          ...prev,
          [index]: !isCurrentlyLiked,
        }));

        SuccessToast("Unliked");

        getLibrary();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(library.length || 6)]?.map((_, index) => (
            <div
              key={index}
              className="h-[300px] animate-pulse rounded-md bg-gray-200 w-[300px]"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
          {library.map((item, index) => {
            let description = "";
            let skillData = {};

            if (item?.favorite_hobby1) {
              description = item?.favorite_hobby1?.description;
              skillData = {
                id: item?.favorite_hobby1?.favorite_hobbyId?._id,
                descriptionId: item?.favorite_hobby1?.descriptionId,
              };
            } else if (item?.favorite_hobby2) {
              description = item?.favorite_hobby2?.description;
              skillData = {
                id: item?.favorite_hobby2.favorite_hobbyId?._id,
                descriptionId: item?.favorite_hobby2?.descriptionId,
              };
            } else if (item?.favorite_middle_school_subject) {
              description = item?.favorite_middle_school_subject?.description;
              skillData = {
                id: item?.favorite_middle_school_subject?.favoriteSubjectId?._id,
                descriptionId:
                  item?.favorite_middle_school_subject?.descriptionId,
              };
            } else if (item?.rank) {
              description = item?.rank?.description;
              skillData = {
                id: item?.rank?.rankId?._id,
                descriptionId: item?.rank?.descriptionId,
              };
            } else if (item?.athlete) {
              description = item?.athlete?.description;
              skillData = {
                id: item?.athlete?.athleteId?._id,
                descriptionId: item?.athlete?.descriptionId,
              };
            }

            return (
              <div
                key={index}
                className="group relative rounded-2xl p-4 bg-[#FFFBF1] text-black shadow-lg cursor-pointer hover:bg-gradient-to-l from-[#012C57] to-[#061523] hover:text-white transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold pt-2 pl-2">
                    Transferable Skills
                  </h2>
                  <BsFillBookmarkStarFill
                    className={`text-2xl cursor-pointer text-[#56EC17] `}
                    onClick={() => handleLike(index, skillData)}
                  />
                </div>
                <p className="text-[16px] mb-4 text-left pl-2">{description}</p>
                <div className="text-sm flex justify-between items-center group-hover:text-white">
                  <span className="text-[16px] px-2 font-[500] leading-[21.6px]">
                    {`July/10/2024`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Transferable;
