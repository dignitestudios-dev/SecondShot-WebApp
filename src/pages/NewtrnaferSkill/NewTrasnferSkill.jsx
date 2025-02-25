import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Centerpro,
  CenterSkill,
  Downloadimg,
  Printimg,
  Shareimg,
  skillbottomleft,
  skillbottomright,
  skillleft,
  skillright,
  skilltop,
} from "../../assets/export";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import TransferableSkillsModal from "../../components/transferableSkills/TransferableSkillsModal";
import { ModalContext } from "../../context/GlobalContext";
import ResumeDownloadModal from "../../components/myresume/ResumeDownloadModal";
import AddSupportModal from "../../components/myresume/AddSupportModal";
import axios from "../../axios";
import { SuccessToast } from "../../components/toaster/ToasterContainer";
import { AuthContext } from "../../context/AuthContext";
import LockModal from "../../components/home/LockModal";
import { useNavigate } from "react-router-dom";

const NewTrasnferSkill = () => {
  const navigate = useNavigate();
  const [topSkill, setTopSkill] = useState(false);
  const [leftSkill, setLeftSkill] = useState(false);
  const [rightSkill, setRightSkill] = useState(false);
  const [bottomLeft, setBottomLeft] = useState(false);
  const [bottomright, setBottomright] = useState(false);
  const { isFirst, setIsFirst } = useContext(ModalContext);
  const [isActive, setIsActive] = useState(false);
  const [appear, setAppear] = useState(false);
  const [cardnote, setCardnote] = useState(false);
  const [lock, setLock] = useState(false);
  const { subscriptionpaid } = useContext(AuthContext);

  const handleTopSKill = () => {
    setTopSkill((prev) => !prev);
    setBottomLeft(false);
    setBottomright(false);
    setRightSkill(false);
    setLeftSkill(false);
    setAppear(false);
  };

  const handleLeftSKill = () => {
    if (!subscriptionpaid) {
      setLock(true);
      return;
    }

    setLeftSkill((prev) => !prev);
    setTopSkill(false);
    setBottomLeft(false);
    setBottomright(false);
    setRightSkill(false);
    setAppear(false);
  };

  const handleRightSKill = () => {
    if (!subscriptionpaid) {
      setLock(true);
      return;
    }
    setRightSkill((prev) => !prev);
    setLeftSkill(false);
    setTopSkill(false);
    setBottomLeft(false);
    setBottomright(false);
    setLeftSkill(false);
    setAppear(false);
  };
  const handlebottomleft = () => {
    if (!subscriptionpaid) {
      setLock(true);
      return;
    }
    setBottomLeft((prev) => !prev);
    setRightSkill(false);
    setLeftSkill(false);
    setTopSkill(false);
    setBottomright(false);
    setRightSkill(false);
    setLeftSkill(false);
    setAppear(false);
  };
  const handlebottomright = () => {
    if (!subscriptionpaid) {
      setLock(true);
      return;
    }
    setBottomright((prev) => !prev);
    setBottomLeft(false);
    setRightSkill(false);
    setLeftSkill(false);
    setTopSkill(false);
    setBottomLeft(false);
    setRightSkill(false);
    setLeftSkill(false);
    setAppear(false);
  };

  const handleIconClick = () => {
    setIsActive(!isActive);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [showModalDownload, setShowModalDownload] = useState(false);
  const handleDownloadModal = () => {
    setShowModalDownload(!showModalDownload);
  };

  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const handleShowPeopleModal = () => {
    setShowPeopleModal(!showPeopleModal);
  };

  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteModal = () => {
    setShowDelete(!showDelete);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [getSkill, setGetSkill] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noteData, setNoteData] = useState({});
  const [notedescription, setNoteDescription] = useState("");

  const gettransferableskill = async () => {
    setLoading;
    try {
      const response = await axios.get("/api/user/my-transferable-skills");
      if (response.status === 200) {
        setGetSkill(response?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const [selectedIndex, setSelecetedIndex] = useState(0);
  useEffect(() => {
    gettransferableskill();
  }, []);

  const handleLike = async (noteData, isLiked) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/toggle-transferable-skill", {
        ...noteData,
      });

      if (response.status === 200) {
        SuccessToast(isLiked ? "Unliked" : "Liked");
        gettransferableskill();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative  ">
      <ResumeDownloadModal
        showModal={showModalDownload}
        onclick={handleDownloadModal}
      />
      {/* <AddSupportModal
        showModal={showPeopleModal}
        handleClick={handleShowPeopleModal}
      /> */}
      <div className="flex mt-4 justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-24">
            My Transferable Skills
          </h1>
        </div>

        <div className="flex items-center">
          <div className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer">
            <img className="w-[27.61px] h-[23px] " src={Printimg} />
          </div>
          <div
            onClick={handleDownloadModal}
            className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer"
          >
            <img className="w-[12px] h-[18.38px] " src={Downloadimg} />
          </div>
          <div
            onClick={handleShowPeopleModal}
            className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer"
          >
            <img className="w-[21px] h-[17px] " src={Shareimg} />
          </div>
        </div>
      </div>{" "}
      {topSkill && (
        <div
          className={`flex relative top-[186px] left-[5px] justify-center transition-all duration-1000 ease-in-out ${
            topSkill ? "animationtransferaable" : "opacity-0 transform scale-95"
          }`}
        >
          <div className="absolute text-sm font-medium text-white text-center ">
            {getSkill?.favorite_hobby1?.topics?.map((item, index) => (
              <div key={index}>
                {index === 0 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="absolute cursor-pointer bg-transparent h-[70px] text-center rounded-full flex justify-center items-center top-[150px] group"
                    onClick={() => {
                      setAppear(true);

                      setSelecetedIndex(0);
                      setNoteData({
                        favorite_hobby1: {
                          favorite_hobbyId: getSkill?.favorite_hobby1?._id,
                          descriptionId: item._id,
                        },
                      });
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-6 -left-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-20 right-0 z-10 ${
                        appear && selectedIndex == 0 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className="w-[80%] h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>

                      <span className="w-[20%] h-full flex justify-end items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                    </span>
                  </button>
                )}
                {index === 1 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative cursor-pointer bg-transparent h-[70px] rounded-full flex justify-center items-center top-[60px] right-[200px] group"
                    onClick={() => {
                      setAppear(true);

                      setSelecetedIndex(1);
                      setNoteData({
                        favorite_hobby1: {
                          favorite_hobbyId: getSkill?.favorite_hobby1?._id,
                          descriptionId: item._id,
                        },
                      });
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-6 -left-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-20 right-0 z-10 ${
                        appear && selectedIndex == 1 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className="w-[80%] h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>

                      <span className="w-[20%] h-full flex justify-end items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                    </span>
                  </button>
                )}
                {index === 2 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative cursor-pointer top-[-20px] bg-transparent h-[90px] rounded-full flex justify-center items-center left-[190px] group"
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(2);
                      setNoteData({
                        favorite_hobby1: {
                          favorite_hobbyId: getSkill?.favorite_hobby1?._id,
                          descriptionId: item._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                         <div
                      className="absolute -top-6 -left-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-20 right-0 z-10 ${
                        appear && selectedIndex == 2 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className="w-[80%] h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>

                      <span className="w-[20%] h-full flex justify-end items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                    </span>
                  </button>
                )}
                {index === 3 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative cursor-pointer bg-transparent h-[70px] top-[70px] flex justify-center items-center rounded-full left-[260px] group"
                    onClick={() => {
                      setAppear(true);

                      setSelecetedIndex(3);
                      setNoteData({
                        favorite_hobby1: {
                          favorite_hobbyId: getSkill?.favorite_hobby1?._id,
                          descriptionId: item._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                         <div
                      className="absolute -top-6 -left-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-20 right-0 z-10 ${
                        appear && selectedIndex == 3 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className="w-[80%] h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>

                      <span className="w-[20%] h-full flex justify-end items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                    </span>
                  </button>
                )}
                {index === 4 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative cursor-pointer bg-transparent h-[70px] rounded-full flex justify-center items-center top-[10px] right-[260px] group"
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(4);
                      setNoteData({
                        favorite_hobby1: {
                          favorite_hobbyId: getSkill?.favorite_hobby1?._id,
                          descriptionId: item._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                         <div
                      className="absolute -top-6 -left-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-20 right-0 z-10 ${
                        appear && selectedIndex == 4 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className="w-[80%] h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>

                      <span className="w-[20%] h-full flex justify-end items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
          <img src={skilltop} className="h-[474px]" alt="" />
        </div>
      )}
      <div className="flex justify-center h-[900px] items-center  ">
        <div className="absolute ">
          <div
            className="relative text-[16px] leading-[16px] w-[20px] flex justify-center text-[#172E55] font-[600] bottom-[242px] cursor-pointer left-[13px] text-center z-10 group"
            onClick={handleTopSKill}
          >
            <span>
              {getSkill?.favorite_hobby1?.hobbie_name?.length > 7
                ? getSkill.favorite_hobby1.hobbie_name.substring(0, 7) + "..."
                : getSkill?.favorite_hobby1?.hobbie_name}
            </span>
            <div
              className="absolute -top-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center 
            opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 
            transition-all duration-300 ease-in-out "
            >
              <div
                className="bg-[#172E55] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3 
            w-max max-w-[250px] relative z-10 text-center"
              >
                {getSkill?.favorite_hobby1?.hobbie_name}
              </div>
              <div className="w-3 h-3 bg-[#172E55] relative z-0 -top-2 rotate-45 -mb-10"></div>
            </div>
          </div>
        </div>

        <div className="flex justify-center absolute ">
          <img
            src={Centerpro}
            className=" h-[175.75px] relative top-[43px] left-[2px]  w-[176.1px] rounded-full object-cover"
            alt=""
          />
          <div className="text-lg text-center absolute top-[250px] left-[20px] font-[600] text-[#0a1723] ">
            Sanethia Thomas
          </div>
        </div>
        <img src={CenterSkill} className="h-[655.67px]" alt="" />
        <div className="absolute">
          <div
            className="relative text-[16px] w-[80px] h-[80px] bg-transparent rounded-full 
               items-center leading-[16px] flex justify-center text-[#172E55] font-[600] 
               z-10 cursor-pointer top-[-47px] right-[309px] text-center group"
            onClick={handleLeftSKill}
          >
            <span className="w-[0px]">
              {getSkill?.favorite_hobby2?.hobbie_name.length > 7
                ? getSkill.favorite_hobby2.hobbie_name.substring(0, 7) + "..."
                : getSkill?.favorite_hobby2?.hobbie_name}
            </span>

            <div
              className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center 
                 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 
                 transition-all duration-300 ease-in-out"
            >
              <div
                className="bg-[#172E55]   text-white text-md font-medium rounded-lg shadow-lg py-2 px-3 
                      w-max max-w-[250px] text-center"
              >
                {getSkill?.favorite_hobby2?.hobbie_name}
              </div>
              <div className="w-3 h-3 bg-[#172E55] relative -top-2 rotate-45 -mb-10"></div>
            </div>
          </div>
        </div>

        <div className="absolute">
          <div
            className="relative text-[16px] leading-[16px] w-[80px] h-[80px] bg-transparent items-center flex justify-center text-[#172E55] font-[600] cursor-pointer z-10 top-[-47px] left-[251px] text-center group"
            onClick={handleRightSKill}
          >
            <span className="w-[20px]">
              {getSkill?.favorite_middle_school_subject?.subject_name?.length >
              7
                ? getSkill?.favorite_middle_school_subject?.subject_name.substring(
                    0,
                    7
                  ) + "..."
                : getSkill?.favorite_middle_school_subject?.subject_name}
            </span>
            {/* Tooltip */}
            <div
              className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center
        opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
        transition-all duration-300 ease-in-out"
            >
              <div
                className="bg-[#172E55] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
          w-max max-w-[250px] text-center"
              >
                {getSkill?.favorite_middle_school_subject?.subject_name}
              </div>
              <div className="w-3 h-3 bg-[#172E55] relative -top-2 rotate-45 -mb-10"></div>
            </div>
          </div>
        </div>

        <div className="absolute  ">
          <div
            className={`relative text-[16px] leading-[16px] w-[80px] h-[80px] bg-transparent 
              items-center flex justify-center text-[#172E55] font-[600] 
              cursor-pointer z-10 top-[305px] text-center  group
              ${
                !getSkill?.military?.rank?.rank_name
                  ? "right-[195px]"
                  : "right-[220px]"
              }`}
            onClick={handlebottomleft}
          >
            <span className=" w-[20px]">
              {getSkill?.military?.rank?.rank_name?.length > 7
                ? getSkill?.military?.rank?.rank_name.substring(0, 7) + "..."
                : getSkill?.military?.rank?.rank_name || "Null"}
            </span>
            <div
              className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center
        opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
        transition-all duration-300 ease-in-out"
            >
              <div
                className="bg-[#172E55] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
          w-max max-w-[250px] text-center"
              >
                {getSkill?.military?.rank?.rank_name}
              </div>
              <div className="w-3 h-3 bg-[#172E55] relative -top-2 rotate-45 -mb-10"></div>
            </div>
          </div>
          <div
            className="relative text-[16px] leading-[16px]  w-[100px] h-[80px] bg-transparent rounded-full items-center flex justify-center text-[#172E55] font-[600] cursor-pointer   z-10 top-[224px] left-[203px] text-center group"
            onClick={handlebottomright}
          >
            <span className=" w-full text-center">
              {getSkill?.athlete?.sport_position?.position_name?.length > 7
                ? getSkill?.athlete?.sport_position?.position_name?.substring(
                    0,
                    7
                  ) + "..."
                : getSkill?.athlete?.sport_position?.position_name ||
                  "Null"}{" "}
            </span>
            <div
              className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center
        opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
        transition-all duration-300 ease-in-out"
            >
              <div
                className="bg-[#172E55] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
          w-max max-w-[250px] text-center"
              >
                {getSkill?.athlete?.sport_position?.position_name}
              </div>
              <div className="w-3 h-3 bg-[#172E55] relative -top-2 rotate-45 -mb-10"></div>
            </div>
          </div>
        </div>
      </div>
      {leftSkill && (
        <div
          className={`absolute bottom-[202px] left-[-148px] ${
            leftSkill
              ? "animationtransferaable"
              : "opacity-0 transform scale-95"
          }`}
        >
          <div className="absolute text-sm font-medium text-white">
            {getSkill?.favorite_hobby2?.topics.map((item, index) => (
              <div key={index}>
                {index === 0 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative top-[140px] cursor-pointer left-[110px] group" // Added 'group' class for hover functionality
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(0);
                      setNoteData({
                        favorite_hobby2: {
                          favorite_hobbyId: getSkill?.favorite_hobby2?._id,
                          descriptionId: item._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item?.title.length > 8
                      ? item?.title.substring(0, 8) + "..."
                      : item?.title}

                    {/* Tooltip */}
                    <div
                      className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>

                    {/* Note description */}
                    <span
                      className={`w-[388px] flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                        appear && selectedIndex == 0 ? "scale-100" : "scale-0"
                      } zIndex rounded-2xl bg-[#D4FFC2] p-4 justify-between items-start`}
                    >
                      <span className="w-[20%] h-full flex items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                      <span className="h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                    </span>
                  </button>
                )}
                {index === 1 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative top-[100px] cursor-pointer left-[285px] group  "
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(1);
                      setNoteData({
                        favorite_hobby2: {
                          favorite_hobbyId: getSkill?.favorite_hobby2?._id,
                          descriptionId: item._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-14 -left-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                        appear && selectedIndex == 1 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className="w-[20%] h-full flex  items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                      <span className=" h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                    </span>
                  </button>
                )}
                {index === 2 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative top-[305px] cursor-pointer left-[145px] group "
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(2);
                      setNoteData({
                        favorite_hobby2: {
                          favorite_hobbyId: getSkill?.favorite_hobby2?._id,
                          descriptionId: item._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-16 -right-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                        appear && selectedIndex == 2 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className="w-[20%] h-full flex  items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                      <span className=" h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                    </span>
                  </button>
                )}
                {index === 3 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative top-[425px]   cursor-pointer left-[69px] group "
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(3);
                      setNoteData({
                        favorite_hobby2: {
                          favorite_hobbyId: getSkill?.favorite_hobby2?._id,
                          descriptionId: item._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                        appear && selectedIndex == 3 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className="w-[20%] h-full flex  items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                      <span className=" h-full text-wrap text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                    </span>
                  </button>
                )}
                {index === 4 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative top-[495px] text-nowrap w-[40px] cursor-pointer flex justify-center text-center left-[200px] group "
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(4);
                      setNoteData({
                        favorite_hobby2: {
                          favorite_hobbyId: getSkill?.favorite_hobby2?._id,
                          descriptionId: item._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                        appear && selectedIndex == 4 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className=" h-full flex w-[20%]">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                      <span className=" h-full text-wrap text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
          <img src={skillleft} className="h-[725px]" alt="" />
        </div>
      )}
      {rightSkill && (
        <div
          className={`absolute bottom-[202px] right-[-165px] ${
            rightSkill
              ? "animationtransferaable"
              : "opacity-0 transform scale-95"
          }`}
        >
          <div className="absolute cursor-pointer text-sm font-medium text-white text-center">
            {getSkill?.favorite_middle_school_subject?.topics.map(
              (item, index) => (
                <div key={item._id}>
                  {index === 0 && (
                    <button
                      onBlur={() => setAppear(false)}
                      className="relative cursor-pointer bg-transparent h-[70px] rounded-full flex justify-center items-center top-[90px] -right-[100px] group"
                      onClick={() => {
                        setAppear(true);
                        setSelecetedIndex(0);
                        setNoteData({
                          favorite_middle_school_subject: {
                            favoriteSubjectId:
                              getSkill?.favorite_middle_school_subject?._id,
                            descriptionId: item._id,
                          },
                        });
                        setNoteDescription(item?.description);
                      }}
                    >
                      {item.title.length > 8
                        ? item.title.substring(0, 8) + "..."
                        : item.title}
                      <div
                        className="absolute -top-5 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                      >
                        <div
                          className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                        >
                          {item?.title}
                        </div>
                        <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                      </div>
                      <span
                        className={`w-[388px]  flex transition-all duration-500 absolute top-20 right-0  z-10 ${
                          appear && selectedIndex == 0 ? "scale-100" : "scale-0"
                        } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                      >
                        <span className="w-[20%] h-full flex  items-start">
                          {loading ? (
                            <span className="animate-pulse text-green-500">
                              <BsFillBookmarkStarFill size={"27px"} />
                            </span>
                          ) : (
                            <BsFillBookmarkStarFill
                              size={"27px"}
                              onClick={() =>
                                handleLike(noteData, item?.is_favorite)
                              }
                              className={`transition duration-200 cursor-pointer ${
                                item?.is_favorite
                                  ? "text-green-500"
                                  : "text-gray-500"
                              }`}
                            />
                          )}
                        </span>
                        <span className=" h-full text-md font-medium text-gray-800">
                          {item?.description}
                        </span>
                      </span>
                    </button>
                  )}

                  {index === 1 && (
                    <button
                      onBlur={() => setAppear(false)}
                      className="relative cursor-pointer top-[60px] left-[315px] w-[50px] group"
                      onClick={() => {
                        setAppear(true);
                        setSelecetedIndex(1);
                        setNoteData({
                          favorite_middle_school_subject: {
                            favoriteSubjectId:
                              getSkill?.favorite_middle_school_subject?._id,
                            descriptionId: item._id,
                          },
                        });
                        setNoteDescription(item?.description);
                      }}
                    >
                      {item.title.length > 8
                        ? item.title.substring(0, 8) + "..."
                        : item.title}
                      <div
                        className="absolute -top-16 -right-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                      >
                        <div
                          className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                        >
                          {item?.title}
                        </div>
                        <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                      </div>
                      <span
                        className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0  z-10 ${
                          appear && selectedIndex == 1 ? "scale-100" : "scale-0"
                        } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                      >
                        <span className="w-[20%] h-full flex  items-start">
                          {loading ? (
                            <span className="animate-pulse text-green-500">
                              <BsFillBookmarkStarFill size={"27px"} />
                            </span>
                          ) : (
                            <BsFillBookmarkStarFill
                              size={"27px"}
                              onClick={() =>
                                handleLike(noteData, item?.is_favorite)
                              }
                              className={`transition duration-200 cursor-pointer ${
                                item?.is_favorite
                                  ? "text-green-500"
                                  : "text-gray-500"
                              }`}
                            />
                          )}
                        </span>
                        <span className=" h-full text-md font-medium text-gray-800">
                          {item?.description}
                        </span>
                      </span>
                    </button>
                  )}

                  {index === 2 && (
                    <button
                      onBlur={() => setAppear(false)}
                      className="relative cursor-pointer top-[245px] left-[245px] w-[50px] group"
                      onClick={() => {
                        setAppear(true);
                        setSelecetedIndex(2);
                        setNoteData({
                          favorite_middle_school_subject: {
                            favoriteSubjectId:
                              getSkill?.favorite_middle_school_subject?._id,
                            descriptionId: item._id,
                          },
                        });
                        setNoteDescription(item?.description);
                      }}
                    >
                      {item.title.length > 8
                        ? item.title.substring(0, 8) + "..."
                        : item.title}
                      <div
                        className="absolute -top-12 -right-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                      >
                        <div
                          className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                        >
                          {item?.title}
                        </div>
                        <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                      </div>
                      <span
                        className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0  z-10 ${
                          appear && selectedIndex == 2 ? "scale-100" : "scale-0"
                        } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                      >
                        <span className="w-[20%] h-full flex  items-start">
                          {loading ? (
                            <span className="animate-pulse text-green-500">
                              <BsFillBookmarkStarFill size={"27px"} />
                            </span>
                          ) : (
                            <BsFillBookmarkStarFill
                              size={"27px"}
                              onClick={() =>
                                handleLike(noteData, item?.is_favorite)
                              }
                              className={`transition duration-200 cursor-pointer ${
                                item?.is_favorite
                                  ? "text-green-500"
                                  : "text-gray-500"
                              }`}
                            />
                          )}
                        </span>
                        <span className=" h-full text-md font-medium text-gray-800">
                          {item?.description}
                        </span>
                      </span>
                    </button>
                  )}

                  {index === 3 && (
                    <button
                      onBlur={() => setAppear(false)}
                      className="relative cursor-pointer top-[395px] left-[315px] w-[50px] group"
                      onClick={() => {
                        setAppear(true);
                        setSelecetedIndex(3);
                        setNoteData({
                          favorite_middle_school_subject: {
                            favoriteSubjectId:
                              getSkill?.favorite_middle_school_subject?._id,
                            descriptionId: item._id,
                          },
                        });
                        setNoteDescription(item?.description);
                      }}
                    >
                      {item.title.length > 8
                        ? item.title.substring(0, 8) + "..."
                        : item.title}
                      <div
                        className="absolute -top-16 -right-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                      >
                        <div
                          className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                        >
                          {item?.title}
                        </div>
                        <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                      </div>
                      <span
                        className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0  z-10 ${
                          appear && selectedIndex == 3 ? "scale-100" : "scale-0"
                        } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                      >
                        <span className="w-[20%] h-full flex  items-start">
                          {loading ? (
                            <span className="animate-pulse text-green-500">
                              <BsFillBookmarkStarFill size={"27px"} />
                            </span>
                          ) : (
                            <BsFillBookmarkStarFill
                              size={"27px"}
                              onClick={() =>
                                handleLike(noteData, item?.is_favorite)
                              }
                              className={`transition duration-200 cursor-pointer ${
                                item?.is_favorite
                                  ? "text-green-500"
                                  : "text-gray-500"
                              }`}
                            />
                          )}
                        </span>
                        <span className=" h-full text-md font-medium text-gray-800">
                          {item?.description}
                        </span>
                      </span>
                    </button>
                  )}

                  {index === 4 && (
                    <button
                      onBlur={() => setAppear(false)}
                      className="relative cursor-pointer top-[465px] left-[200px] group"
                      onClick={() => {
                        setAppear(true);
                        setSelecetedIndex(4);
                        setNoteData({
                          favorite_middle_school_subject: {
                            favoriteSubjectId:
                              getSkill?.favorite_middle_school_subject?._id,
                            descriptionId: item._id,
                          },
                        });
                        setNoteDescription(item?.description);
                      }}
                    >
                      {item.title.length > 8
                        ? item.title.substring(0, 8) + "..."
                        : item.title}
                      <div
                        className="absolute -top-12 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                      >
                        <div
                          className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                        >
                          {item?.title}
                        </div>
                        <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                      </div>
                      <span
                        className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0  z-10 ${
                          appear && selectedIndex == 4 ? "scale-100" : "scale-0"
                        } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                      >
                        <span className="w-[20%] h-full flex  items-start">
                          {loading ? (
                            <span className="animate-pulse text-green-500">
                              <BsFillBookmarkStarFill size={"27px"} />
                            </span>
                          ) : (
                            <BsFillBookmarkStarFill
                              size={"27px"}
                              onClick={() =>
                                handleLike(noteData, item?.is_favorite)
                              }
                              className={`transition duration-200 cursor-pointer ${
                                item?.is_favorite
                                  ? "text-green-500"
                                  : "text-gray-500"
                              }`}
                            />
                          )}
                        </span>
                        <span className=" h-full text-md font-medium text-gray-800">
                          {item?.description}
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              )
            )}
          </div>
          <img src={skillright} className="h-[725px]" alt="" />
        </div>
      )}
      {getSkill?.military?.rank?.rank_name && bottomLeft && (
        <div
          className={`relative top-[-258px] left-[-124px] ${
            bottomLeft
              ? "animationtransferaable"
              : "opacity-0 transform scale-95"
          }`}
        >
          <div className="absolute text-sm font-medium text-white text-center">
            {getSkill?.military?.rank?.topics?.map((item, index) => (
              <div key={item._id}>
                {index === 0 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative cursor-pointer top-[135px] flex justify-center left-[155px]  group"
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(0);
                      setNoteData({
                        rank: {
                          rankId: getSkill?.military?.rank?._id,
                          descriptionId: item._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                        appear && selectedIndex == 0 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className="w-[20%] h-full flex  items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                      <span className=" h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                    </span>
                  </button>
                )}

                {index === 1 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative cursor-pointer top-[300px] flex justify-center left-[120px] group"
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(1);
                      setNoteData({
                        rank: {
                          rankId: getSkill?.military?.rank?._id,
                          descriptionId: item._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                        appear && selectedIndex == 1 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className="w-[20%] h-full flex  items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                      <span className=" h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                    </span>
                  </button>
                )}

                {index === 2 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative cursor-pointer top-[300px] flex justify-center left-[315px] group "
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(2);
                      setNoteData({
                        rank: {
                          rankId: getSkill?.military?.rank?._id,
                          descriptionId: item._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                        appear && selectedIndex == 2 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className="w-[20%] h-full flex  items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                      <span className=" h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                    </span>
                  </button>
                )}

                {index === 3 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative cursor-pointer top-[440px] flex justify-center left-[435px] group "
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(3);
                      setNoteData({
                        rank: {
                          rankId: getSkill?.military?.rank?._id,
                          descriptionId: item._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                        appear && selectedIndex == 3 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className="w-[20%] h-full flex  items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                      <span className=" h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                    </span>
                  </button>
                )}

                {index === 4 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative cursor-pointer top-[315px] flex justify-center left-[598px]  group"
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(4);
                      setNoteData({
                        rank: {
                          rankId: getSkill?.military?.rank?._id,
                          descriptionId: item._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                        appear && selectedIndex == 4 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className="w-[20%] h-full flex  items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                      <span className=" h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
          <img src={skillbottomleft} className="h-[625px]" alt="" />
        </div>
      )}
      {getSkill?.athlete?.sport_position?.position_name && bottomright && (
        <div
          className={`relative top-[-233px] right-[-520px] ${
            bottomright
              ? "animationtransferaable"
              : "opacity-0 transform scale-95"
          }`}
        >
          <div className="absolute text-sm font-medium text-white ">
            {getSkill?.athlete?.sport_position?.topics?.map((item, index) => (
              <div key={item._id}>
                {index === 0 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative cursor-pointer top-[110px] left-[570px]  flex justify-center text-center group"
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(0);
                      setNoteData({
                        athlete: {
                          athleteId: getSkill?.athlete?.sport_position?._id,
                          descriptionId: item?._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 z-10 ${
                        appear && selectedIndex == 0 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className=" h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                      <span className="w-[20%] h-full flex  items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                    </span>
                  </button>
                )}
                {index === 1 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative cursor-pointer top-[350px] left-[125px] flex justify-center text-center group "
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(1);
                      setNoteData({
                        athlete: {
                          athleteId: getSkill?.athlete?.sport_position?._id,
                          descriptionId: item?._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {" "}
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 z-10 ${
                        appear && selectedIndex == 1 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className=" h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                      <span className="w-[20%] h-full flex  items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                    </span>
                  </button>
                )}
                {index === 2 && (
                  <button
                    className="relative cursor-pointer top-[275px] left-[410px] flex justify-center text-center group"
                    onBlur={() => setAppear(false)}
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(2);
                      setNoteData({
                        athlete: {
                          athleteId: getSkill?.athlete?.sport_position?._id,
                          descriptionId: item?._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 z-10 ${
                        appear && selectedIndex == 2 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className=" h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                      <span className="w-[20%] h-full flex  items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                    </span>
                  </button>
                )}
                {index === 3 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative cursor-pointer top-[430px] left-[305px]  flex justify-center text-center group"
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(3);
                      setNoteData({
                        athlete: {
                          athleteId: getSkill?.athlete?.sport_position?._id,
                          descriptionId: item?._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-12 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 z-10 ${
                        appear && selectedIndex == 3 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className=" h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                      <span className="w-[20%] h-full flex  items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                    </span>
                  </button>
                )}
                {index === 4 && (
                  <button
                    onBlur={() => setAppear(false)}
                    className="relative cursor-pointer top-[240px] left-[633px] flex justify-center text-center group"
                    onClick={() => {
                      setAppear(true);
                      setSelecetedIndex(4);
                      setNoteData({
                        athlete: {
                          athleteId: getSkill?.athlete?.sport_position?._id,
                          descriptionId: item?._id,
                        },
                      });
                      setNoteDescription(item?.description);
                    }}
                  >
                    {" "}
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                    <div
                      className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-300 ease-in-out"
                    >
                      <div
                        className="bg-[#56EC17] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
                      w-max max-w-[250px] text-center"
                      >
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                    <span
                      className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 z-10 ${
                        appear && selectedIndex == 4 ? "scale-100" : "scale-0"
                      } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                    >
                      <span className=" h-full text-md font-medium text-gray-800">
                        {item?.description}
                      </span>
                      <span className="w-[20%] h-full flex  items-start">
                        {loading ? (
                          <span className="animate-pulse text-green-500">
                            <BsFillBookmarkStarFill size={"27px"} />
                          </span>
                        ) : (
                          <BsFillBookmarkStarFill
                            size={"27px"}
                            onClick={() =>
                              handleLike(noteData, item?.is_favorite)
                            }
                            className={`transition duration-200 cursor-pointer ${
                              item?.is_favorite
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </span>
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
          <img src={skillbottomright} className="  h-[625px]" alt="" />
        </div>
      )}
      <TransferableSkillsModal
        isOpen={isFirst.transferable}
        handleClick={() => {
          setIsFirst((prev) => ({
            ...prev,
            transferable: false,
          }));
        }}
      />
      <LockModal
        isOpen={lock}
        handleClick={() => navigate("/subscriptionplans")}
        onClose={() => setLock(false)}
      />
    </div>
  );
};

export default NewTrasnferSkill;
