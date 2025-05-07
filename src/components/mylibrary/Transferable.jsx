import React, { useEffect, useState } from "react";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import axios from "../../axios";
import { SuccessToast } from "../toaster/ToasterContainer";
import EmptyScreen from "../../pages/mylibrary/EmptyScreen";

const Transferable = ({ loading, library, getLibrary }) => {
  const [likeloader, setlikeloader] = useState(false);
  const handleLike = async (skillData) => {
    setlikeloader(true);
    try {
      const response = await axios.post("/api/user/toggle-transferable-skill", {
        skillId: skillData?.id,
        descriptionId: skillData?.descriptionId,
      });

      if (response.status === 200) {
        SuccessToast(response?.data?.message);
        getLibrary();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setlikeloader(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(library.length || 6)]?.map((_, index) => (
            <div
              key={index}
              className="group relative rounded-2xl p-4 bg-[#FFFBF1] text-black shadow-lg cursor-pointer hover:bg-gradient-to-l from-[#012C57] to-[#061523] hover:text-white transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-32 h-6 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-sm animate-pulse"></div>
              </div>

              <div className="w-full h-4 bg-gray-300 rounded-md animate-pulse mb-4"></div>

              <div className="text-sm flex justify-between items-center group-hover:text-white">
                <div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
          {library.length === 0 ? (
            <div className="flex items-center justify-center min-h-screen absolute  top-40 left-0 right-0 ">
              <EmptyScreen text={"No transferable skills found yet."} />
            </div>
          ) : (
            library?.map((item, index) => {
              let description = "";
              let title = "";
              let skillData = {};

              if (item?.favorite_hobby1) {
                title = item?.favorite_hobby1?.title;
                description = item?.favorite_hobby1?.description;
                skillData = {
                  id: item?.favorite_hobby1?.favorite_hobbyId?._id,
                  descriptionId: item?.favorite_hobby1?.descriptionId,
                };
              } else if (item?.favorite_hobby2) {
                title = item?.favorite_hobby2?.title;
                description = item?.favorite_hobby2?.description;
                skillData = {
                  id: item?.favorite_hobby2.favorite_hobbyId?._id,
                  descriptionId: item?.favorite_hobby2?.descriptionId,
                };
              } else if (item?.favorite_middle_school_subject) {
                title = item?.favorite_middle_school_subject?.title;
                description = item?.favorite_middle_school_subject?.description;
                skillData = {
                  id: item?.favorite_middle_school_subject?.favoriteSubjectId
                    ?._id,
                  descriptionId:
                    item?.favorite_middle_school_subject?.descriptionId,
                };
              } else if (item?.rank) {
                title = item?.rank?.title;
                description = item?.rank?.description;
                skillData = {
                  id: item?.rank?.rankId?._id,
                  descriptionId: item?.rank?.descriptionId,
                };
              } else if (item?.athlete) {
                title = item?.athlete?.title;
                description = item?.athlete?.description;
                skillData = {
                  id: item?.athlete?.athleteId?._id,
                  descriptionId: item?.athlete?.descriptionId,
                };
              }else if(item?.sport){
                title = item?.sport?.title;
                description = item?.sport?.description;
                skillData = {
                  id: item?.sport?.sportId?._id,
                  descriptionId: item?.sport?.descriptionId,
                };
              }

              return (
                <div
                  key={index}
                  className="group relative rounded-2xl p-4 bg-[#FFFBF1] text-black shadow-lg cursor-pointer hover:bg-gradient-to-l from-[#012C57] to-[#061523] hover:text-white transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold pt-2 pl-2">{title}</h2>
                    {likeloader ? (
                      <BsFillBookmarkStarFill
                        className={`text-2xl cursor-pointer animate-pulse text-[#56EC17] `}
                      />
                    ) : (
                      <BsFillBookmarkStarFill
                        className={`text-2xl cursor-pointer text-[#56EC17] `}
                        onClick={() => handleLike(index, skillData)}
                        title={"Remove from Favorites"}
                      />
                    )}
                  </div>
                  <p className="text-[16px] mb-4 text-left pl-2">
                    {description}
                  </p>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Transferable;
