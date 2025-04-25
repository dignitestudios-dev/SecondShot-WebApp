import React, { useContext, useEffect, useState } from "react";
import {
  CenterSkill,
  Downloadimg,
  Profileimage,
  Shareimg,
  skillbottomleft,
  skillbottomright,
  skillleft,
  skillright,
  skilltop,
} from "../../assets/export";
import axios from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import { downloadCombinedPDF, downloadSendCombinedPDF } from "../../lib/utils";
import { FiLoader } from "react-icons/fi";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import AddTrasnferSkillPeople from "./AddTrasnferSkillPeople";
import MessageModal from "./MessageModal";
import NewTrasnferSkill from "./NewTrasnferSkill";
import LockModal from "../../components/home/LockModal";

const NewTranfer = () => {
  const [topSkill, setTopSkill] = useState(true);
  const [LeftSkill, setLeftSkill] = useState(true);
  const [lock, setLock] = useState(false);
  const [RightSkill, setRightSkill] = useState(true);
  const [BottomRightSkill, setBottomRightSkill] = useState(true);
  const [BottomLeftSkill, setBottomLeftSkill] = useState(true);
  const [appear, setAppear] = useState(false);
  const [indexAppear, setIndexAppear] = useState("");
  const [rigtindexAppear, setRigtindexAppear] = useState("");
  const [getSkill, setGetSkill] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noteData, setNoteData] = useState({});
  const [notedescription, setNoteDescription] = useState("");
  const [selectedIndex, setSelecetedIndex] = useState(0);
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setformData] = useState({
    fullname: "",
    email: "",
    phone: "",
    fullname_2: "",
    email_2: "",
    phone_2: "",
  });
  const handleShowPeopleModal = () => {
    setShowPeopleModal(!showPeopleModal);
  };
  
  const { subscriptionpaid, profilepic, profilename } = useContext(AuthContext);
  useEffect(() => {
     const isPaid = !!subscriptionpaid;
 
     setLeftSkill(isPaid);
     setRightSkill(isPaid);
     setBottomLeftSkill(isPaid);
     setBottomRightSkill(isPaid);
   }, [subscriptionpaid]);
  const gettransferableskill = async () => {
    setLoading(true);
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

  const handleLike = async (noteData, isLiked) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/toggle-transferable-skill", {
        ...noteData,
      });

      if (response.status === 200) {
        SuccessToast(
          isLiked ? "Skills remove from favorites" : "Skills saved to favorites"
        );
        gettransferableskill();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    gettransferableskill();
  }, []);

  const handleDownloadCombined = (e, data, filename) => {
    if (
      !topSkill ||
      !LeftSkill ||
      !RightSkill ||
      !BottomLeftSkill ||
      !BottomRightSkill
    ) {
      setModalMessage("Please open all skills before downloading.");
      setMessageModal(true);
      return;
    }
    e.preventDefault();
    downloadCombinedPDF(
      data,
      "download-skills",
      filename,
      setDownloading,
      subscriptionpaid,
      profilename
    );
  };
  const handleEmailSend = async (filename) => {
    setEmailLoading(true);
    try {
      // Get the PDF blob from the modified function
      const pdfBlob = await downloadSendCombinedPDF(
        getSkill,
        "download-skills",
        filename,
        setEmailLoading,
        subscriptionpaid,
        profilename
      );

      if (!pdfBlob) {
        console.error("Failed to generate PDF blob");
        return;
      }

      const formData = new FormData();
      formData.append("transferablleSkills", pdfBlob, "skills.pdf");

      const response = await axios.post("/api/user/send-skills", formData);

      if (response.status === 200) {
        SuccessToast(response?.data?.message);

        gettransferableskill();
      }
    } catch (error) {
      console.log(error, "errorerror");
      ErrorToast(error?.response?.data?.message);
    } finally {
      const excludeElements = document.querySelectorAll(".pdf-exclude");
      excludeElements.forEach((el) => (el.style.display = ""));
      setEmailLoading(false);
    }
  };
  const positionMapRightSkill = {
    0: {
      bottom: "64%",
      left: "30%",
      transform: "translate(-50%, -50%)",
      zIndex: 10,
    },
    1: {
      bottom: "62.2%",
      right: "23%",
      transform: "translate(50%, -50%)",
      zIndex: 10,
    },
    2: {
      bottom: "43%",
      right: "19%",
      transform: "translate(-50%, -50%)",
      zIndex: 6,
    },
    3: {
      bottom: "36%",
      right: "3%",
      transform: "translate(-50%, 50%)",
      zIndex: 5,
    },
    4: {
      bottom: "27.6%",
      left: "31.4%",
      transform: "translate(50%, 50%)",
      zIndex: 4,
    },
  };
  const transferpdfElement = document.getElementById("download-skills");

  return (
    <div className="max-w-screen-xl overflow-hidden">
      <MessageModal
        showModal={messageModal}
        setShowModal={setMessageModal}
        handleClick={() => setMessageModal(false)}
      />
      <AddTrasnferSkillPeople
        showModal={showPeopleModal}
        handleClick={handleShowPeopleModal}
        transferpdfId={transferpdfElement}
        transferId={getSkill?._id}
        InputDataSupport={getSkill}
        formData={formData}
        gettransferableskill={gettransferableskill}
        setShowPeopleModal={setShowPeopleModal}
        profilename={profilename}
      />
      <LockModal
        isOpen={lock}
        handleClick={() =>
          navigate("/subscriptionplans", {
            state: { cardShow: true },
          })
        }
        onClose={() => setLock(false)}
        text={"Subscribe to unlock the full map and access all of the modules."}
      />
      {/* <div className="w-[450px]">
        <h1 className="text-3xl  font-semibold text-gray-800 mb-4">
          My Transferable Skills
        </h1>
        <p className="text-[16px]   leading-[24px] text-gray-800 ">
          {subscriptionpaid === false
            ? "Explore key skills that can help you transition into new career paths. On the Free Plan, you can only access the first node in the Transferable Map. Unlock all nodes by upgrading your plan."
            : "  Here is a map of your transferable skills. Click on each circle to expand to learn about how you can use your soft skills in other areas of your life. Click the ribbon to save your favorite skills."}
        </p>
        <h2 className="text-red-500 text-[16px]  font-[500] mt-3 leading-[24px]">
          {" "}
          {subscriptionpaid === false
            ? "The free version allows clicking only on the top circle."
            : ""}
        </h2>
      </div>

      <div className="flex justify-end items-center gap-3">
        <div
          onClick={() => handleShowPeopleModal(() => setShowPeopleModal(true))}
          className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-lg rounded-lg cursor-pointer  "
        >
          <img
            className="h-[20px] w-[20px] object-contain "
            src={Shareimg}
            title="Share"
          />
        </div>
        <div>
          {loading ? (
            <div className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-lg rounded-lg cursor-not-allowed">
              <img
                className="h-[20px] w-[20px] object-contain"
                src={Downloadimg}
              />
            </div>
          ) : (
            <div
              onClick={(e) =>
                handleDownloadCombined(e, getSkill, "profile-report.pdf")
              }
              className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-lg rounded-lg cursor-pointer"
            >
              {downloading ? (
                <FiLoader className="animate-spin text-lg" />
              ) : (
                <img
                  className="h-[20px] w-[20px] object-contain"
                  src={Downloadimg}
                  title="Download"
                />
              )}
            </div>
          )}
        </div>
        <div className="w-[189px] shadow-lg rounded-full">
          <AuthSubmitBtn
            text={"Email It To Yourself"}
            handleSubmit={handleEmailSend}
            loading={emailLoading}
          />
        </div>
      </div> */}

      <div className="relative z-10">
        <div className="grid grid-cols-12 justify-center items-center relative z-50">
          <div
            className={`col-span-12 flex justify-center relative top-[65px] left-[4px]  ${
              getSkill?.athlete?.sport_position?.topics && topSkill
                ? "flex"
                : "invisible"
            }`}
          >
            <div className="relative">
              <img
                src={skilltop}
                className="h-[344px] object-contain"
                alt="Top Skill"
              />
              {getSkill?.athlete?.sport_position?.topics?.map((item, index) => {
                const positions = [
                  {
                    top: "21%",
                    left: "22.5%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  },
                  {
                    top: "21%",
                    right: "24%",
                    transform: "translate(50%, -50%)",
                    zIndex: 10,
                  },
                  {
                    top: "39%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: appear == index - 10,
                  },
                  {
                    bottom: "41%",
                    left: "14%",
                    transform: "translate(-50%, 50%)",
                    zIndex: 7,
                  },
                  {
                    bottom: "43%",
                    right: "14%",
                    transform: "translate(50%, 50%)",
                    zIndex: indexAppear == 2 && -2,
                  },
                ];

                return (
                  <button
                    key={item?._id}
                    onBlur={() => setAppear(false)}
                    className="group absolute  w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[11.82px] font-[600] text-center"
                    style={positions[index]}
                    onClick={() => {
                      setSelecetedIndex({ id: item?._id, name: item?.title });
                      setIndexAppear(index);
                      setAppear((prev) => (prev === index ? null : item._id));
                      setNoteData({
                        athlete: {
                          athleteId: getSkill?.athlete?.sport_position?._id,
                          descriptionId: item?._id,
                        },
                      });

                      setNoteDescription(item?.description);
                    }}
                  >
                    <div className="text-nowrap max-h-10">
                      {item?.title.length > 9
                        ? item?.title.substring(0, 9) + "..."
                        : item?.title}
                    </div>
                    <div
                      className="absolute -top-4 -right-18 bottom-full mb-2 hidden group-hover:flex flex-col items-center
          opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100
          transition-all duration-300 ease-in-out z-30"
                    >
                      <div className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3 w-max max-w-[250px] text-center">
                        {item?.title}
                      </div>
                      <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10" />
                    </div>
                    <div
                      className={`w-[388px] flex  z-50    p-3  transition-all duration-500 absolute  top-12 right-0 left-0  rounded-2xl bg-[#D4FFC2] justify-between items-start ${
                        appear &&
                        selectedIndex?.id === item?._id &&
                        selectedIndex?.name === item?.title
                          ? "scale-100"
                          : "scale-0"
                      }`}
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
                            title={
                              item?.is_favorite
                                ? "Remove from Favorites"
                                : "Add to Favorites"
                            }
                          />
                        )}
                      </span>
                      <span className="text-start text-wrap text-[14px] leading-[20px] font-medium text-[#172E55]">
                        {item?.description}
                      </span>
                      <div className="absolute -top-2 right-0 left-4 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#D4FFC2]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className={`grid grid-cols-12 relative ${
            rigtindexAppear ? "z-40 " : ""
          }`}
        >
          <div
            className={`col-span-3 flex justify-center relative bottom-[150px] left-[60px]  ${
              LeftSkill ? "flex" : "invisible"
            } `}
          >
            <div className="relative">
              <img
                src={skillleft}
                className="h-[725px] object-contain "
                alt="Left Skill"
              />
              {getSkill?.favorite_hobby2?.topics
                ?.slice(0, 5)
                ?.map((item, index) => {
                  const positions = [
                    {
                      bottom: "61.4%",
                      left: "30%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                    },
                    {
                      bottom: "63%",
                      right: "33%",
                      transform: "translate(50%, -50%)",
                      zIndex: 10,
                    },
                    {
                      bottom: "42%",
                      left: "38%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 7,
                    },
                    {
                      bottom: "37.5%",
                      left: "22%",
                      transform: "translate(-50%, 50%)",
                      zIndex: 6,
                    },
                    {
                      bottom: "29%",
                      left: "26%",
                      transform: "translate(50%, 50%)",
                      zIndex: 5,
                    },
                  ];

                  return (
                    <button
                      key={item._id}
                      onBlur={() => setAppear(false)}
                      className="group absolute  w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[11.82px] font-[600] text-center"
                      style={positions[index]}
                      onClick={() => {
                        setSelecetedIndex({ id: item?._id, name: item?.title });

                        setAppear((prev) => (prev === index ? null : item._id));
                        setNoteData({
                          favorite_hobby2: {
                            favorite_hobbyId: getSkill?.favorite_hobby2?._id,
                            descriptionId: item._id,
                          },
                        });

                        setNoteDescription(item?.description);
                      }}
                    >
                      <div className="text-nowrap max-h-10 ">
                        {item?.title.length > 9
                          ? item?.title.substring(0, 9) + "..."
                          : item?.title}
                      </div>
                      <div
                        className="absolute -top-4 -right-18 bottom-full mb-2 hidden group-hover:flex flex-col items-center
          opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100
          transition-all duration-300 ease-in-out z-30"
                      >
                        <div className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3 w-max max-w-[250px] text-center">
                          {item?.title}
                        </div>
                        <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10" />
                      </div>
                      <div
                        className={`w-[310px] flex  p-3  transition-all duration-500 absolute top-12  right-0 left-0 z-40 rounded-2xl bg-[#D4FFC2] justify-between items-start ${
                          appear &&
                          selectedIndex?.id === item?._id &&
                          selectedIndex?.name === item?.title
                            ? "scale-100"
                            : "scale-0"
                        }`}
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
                              title={
                                item?.is_favorite
                                  ? "Remove from Favorites"
                                  : "Add to Favorites"
                              }
                            />
                          )}
                        </span>
                        <span className="text-start text-wrap text-[14px] leading-[20px] font-medium text-[#172E55]">
                          {item?.description}
                        </span>
                        <div className="absolute -top-2 left-3 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#D4FFC2]" />
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
          {/* Center Section Start */}
          <div className="col-span-6 flex justify-center">
            <div className="relative">
              <img
                src={CenterSkill}
                className="h-[615.67px] object-contain"
                alt="Center Skill"
              />
              <div className="absolute bottom-[41.7%] left-[38.35%]">
                {profilepic ? (
                  <img
                    src={profilepic}
                    className="w-[152px] h-[152px]  rounded-full"
                    alt=""
                  />
                ) : (
                  <p className="absolute text-[40px] top-[20px]">
                    {profilename
                      ?.split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </p>
                )}
                <div>
                <div
                className={`text-md text-center absolute ${
                  profilepic
                    ? "top-[180px] left-[21px]"
                    : "top-[170px] -left-[54px]"
                }  w-[120px] text-wrap break-words   font-[600] text-[#0a1723]`}
              >
                {profilename}
              </div>
                </div>
              </div>
              <div
                className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-[#152b4e] leading-[12.82px] text-[12.82px] font-[600] text-center group"
                style={{
                  top: "13%",
                  left: "51.5%",
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setTopSkill((prev) => !prev)}
              >
                <span className=" w-full text-center">
                  {loading ? (
                    <div className="w-14 h-14 rounded-[100px] absolute bottom-[3px] left-[3px]  bg-green-700 animate-pulse flex justify-center items-center "></div>
                  ) : getSkill?.athlete?.sport_position?.position_name?.length >
                    7 ? (
                    <div className="text-nowrap">
                      {getSkill?.athlete?.sport_position?.position_name?.substring(
                        0,
                        7
                      ) + "..."}
                    </div>
                  ) : (
                    getSkill?.athlete?.sport_position?.position_name || "Null"
                  )}
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
                    {getSkill?.athlete?.sport_position?.position_name ||
                      "Not Found"}
                  </div>
                  <div className="w-3 h-3 bg-[#172E55] relative -top-2 rotate-45 -mb-10"></div>
                </div>
              </div>

              <div
                className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-[#152b4e] leading-[12.82px] text-[12.82px] font-[600] text-center group"
                style={{
                  top: "37%",
                  left: "12%",
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => {
                  if (!subscriptionpaid) {
                    setLock(true);
                    return;
                  }
                  setLeftSkill((prev) => !prev);

                  setAppear(false);
                }}
              >
                <span className=" w-full text-center">
                  {loading ? (
                    <div className="w-14 h-14 rounded-[100px] absolute bottom-[3px] left-[3px]  bg-green-700 animate-pulse flex justify-center items-center "></div>
                  ) : getSkill?.favorite_hobby2?.hobbie_name?.length > 7 ? (
                    <div className="text-nowrap">
                      {getSkill?.favorite_hobby2?.hobbie_name?.substring(0, 7) +
                        "..."}
                    </div>
                  ) : (
                    getSkill?.favorite_hobby2?.hobbie_name || "Null"
                  )}
                </span>
                <div
                  className="absolute  bottom-full mb-2 hidden group-hover:flex flex-col items-center
    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
    transition-all duration-300 ease-in-out"
                >
                  <div
                    className="bg-[#172E55] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
      w-max max-w-[250px] text-center"
                  >
                    {getSkill?.favorite_hobby2?.hobbie_name || "Not Found"}
                  </div>
                  <div className="w-3 h-3 bg-[#172E55] relative -top-2 rotate-45 -mb-10"></div>
                </div>
              </div>

              <div
                className="absolute z-0 w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-[#152b4e] leading-[12.82px] text-[12.82px] font-[600] text-center group"
                style={{
                  top: "37%",
                  right: "2%",
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => {
                  if (!subscriptionpaid) {
                    setLock(true);
                    return;
                  }
                  setRightSkill((prev) => !prev)
                  setAppear(false)
                }}
              >
                <span className="w-full text-center">
                  {loading ? (
                    <div className="w-14 h-14 rounded-[100px] absolute bottom-[3px] left-[3px] bg-green-700 animate-pulse flex justify-center items-center"></div>
                  ) : getSkill?.military?.rank?.rank_name?.length > 7 ? (
                    <div className="text-nowrap">
                      {getSkill?.military?.rank?.rank_name?.substring(0, 7) +
                        "..."}
                    </div>
                  ) : (
                    getSkill?.military?.rank?.rank_name || "Null"
                  )}
                </span>

                {/* Tooltip on hover */}
                <div
                  className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center
    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
    transition-all duration-300 ease-in-out"
                >
                  <div
                    className="bg-[#172E55] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3
      w-max max-w-[250px] text-center"
                  >
                    {getSkill?.military?.rank?.rank_name || "Not Found"}
                  </div>
                  <div className="w-3 h-3 bg-[#172E55] relative -top-2 rotate-45 -mb-10"></div>
                </div>
              </div>

              <div
                className="absolute 0 w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-[#152b4e] leading-[12.82px] text-[12.82px] font-[600] text-center group"
                style={{
                  bottom: "17%",
                  right: "13%",
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => {
                  if (!subscriptionpaid) {
                    setLock(true);
                    return;
                  }
                  setBottomRightSkill((prev) => !prev)
                
                  setAppear(false);}}
              >
                <span className=" w-full text-center">
                  {loading ? (
                    <div className="w-14 h-14 rounded-[100px] absolute bottom-[3px] left-[3px]  bg-green-700 animate-pulse flex justify-center items-center "></div>
                  ) : getSkill?.favorite_middle_school_subject?.subject_name
                      ?.length > 7 ? (
                    <div className="text-nowrap">
                      {getSkill?.favorite_middle_school_subject?.subject_name?.substring(
                        0,
                        7
                      ) + "..."}
                    </div>
                  ) : (
                    getSkill?.favorite_middle_school_subject?.subject_name ||
                    "Null"
                  )}
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
                    {getSkill?.favorite_middle_school_subject?.subject_name ||
                      "Not Found"}
                  </div>
                  <div className="w-3 h-3 bg-[#172E55] relative -top-2 rotate-45 -mb-10"></div>
                </div>
              </div>
              <div
                className="absolute  z-20 w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-[#152b4e] leading-[12.82px] text-[12.82px] font-[600] text-center group"
                style={{
                  bottom: "17%",
                  left: "22%",
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => {
                  if (!subscriptionpaid) {
                    setLock(true);
                    return;
                  }
                  setBottomLeftSkill((prev) => !prev)
                  setAppear(false);
                
                }}
              >
                <span className=" w-full   text-center">
                  {loading ? (
                    <div className="w-14 h-14 rounded-[100px] absolute bottom-[3px] left-[3px]  bg-green-700 animate-pulse flex justify-center items-center "></div>
                  ) : getSkill?.favorite_hobby1?.hobbie_name?.length > 7 ? (
                    <div className="text-nowrap">
                      {getSkill?.favorite_hobby1?.hobbie_name?.substring(0, 7) +
                        "..."}
                    </div>
                  ) : (
                    getSkill?.favorite_hobby1?.hobbie_name || "Null"
                  )}
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
                    {getSkill?.favorite_hobby1?.hobbie_name || "Not Found"}
                  </div>
                  <div className="w-3 h-3 bg-[#172E55] relative -top-2 rotate-45 -mb-10"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Center Section End */}
          <div
            className={`col-span-3 flex justify-center relative bottom-[142px] right-[52px] ${
              getSkill?.military?.rank?.topics && RightSkill
                ? "flex"
                : "invisible"
            }`}
          >
            <div className="relative ">
              <img
                src={skillright}
                className="h-[725px]  object-contain"
                alt="Right Skill"
              />
              {getSkill?.military?.rank?.topics?.map((item, index) => (
                <button
                  key={item._id}
                  onBlur={() => setAppear(false)}
                  className="absolute w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[12.82px] font-[600] text-center group"
                  style={positionMapRightSkill[index] || {}}
                  onClick={() => {
                    setSelecetedIndex({ id: item?._id, name: item?.title });
                    setRigtindexAppear(index);
                    setAppear((prev) => (prev === index ? null : item._id));
                    setNoteData({
                      rank: {
                        rankId: getSkill?.military?.rank?._id,
                        descriptionId: item._id,
                      },
                    });
                    setNoteDescription(item?.description);
                  }}
                >
                  <p className="text-nowrap truncate max-h-10">
                    {item.title.length > 8
                      ? item.title.substring(0, 8) + "..."
                      : item.title}
                  </p>

                  {/* Tooltip */}
                  <div
                    className={`absolute -top-6  ${
                      index == 1
                        ? " -right-24"
                        : "-right-10" || index == 2
                        ? " -right-18"
                        : ""
                    }   bottom-full mb-2 hidden group-hover:flex flex-col items-center
          opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
          transition-all duration-300 ease-in-out z-20`}
                  >
                    <div className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3 w-max max-w-[250px] text-center">
                      {item?.title}
                    </div>
                    <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                  </div>

                  {/* Description Card */}
                  <span
                    className={`w-[300px] flex text-start transition-all duration-500 absolute top-12 right-0 z-10 ${
                      appear &&
                      selectedIndex?.id === item?._id &&
                      selectedIndex?.name === item?.title
                        ? "scale-100"
                        : "scale-0"
                    } rounded-2xl bg-[#D4FFC2] p-4 justify-between items-start`}
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
                          title={
                            item?.is_favorite
                              ? "Remove from Favorites"
                              : "Add to Favorites"
                          }
                        />
                      )}
                    </span>
                    <span className="text-start text-wrap text-[14px] leading-[20px] font-medium text-[#172E55]">
                      {item?.description}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`grid z-0  relative grid-cols-12 items-center`}>
          {/* {'Bottom Left Skills Start'} */}
          <div
            className={`col-span-6 flex justify-center relative bottom-[220px] left-[43px]  ${
              BottomLeftSkill ? "flex" : "invisible"
            }`}
          >
            <div className="relative ">
              <img
                src={skillbottomleft}
                className="h-[425px] object-contain "
                alt="Left Skill"
              />
              {getSkill?.favorite_hobby1?.topics
                ?.slice(0, 5)
                ?.map((item, index) => {
                  const positions = [
                    {
                      bottom: "63%",
                      left: "25%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                    },
                    {
                      bottom: "4%",
                      left: "49%",
                      transform: "translate(50%, -50%)",
                      zIndex: 2,
                    },
                    {
                      bottom: "29%",
                      left: "46%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                    },
                    {
                      bottom: "47%",
                      left: "20%",
                      transform: "translate(-50%, 50%)",
                      zIndex: 2,
                    },
                    {
                      bottom: "35%",
                      right: "18%",
                      transform: "translate(50%, 50%)",
                      zIndex: 1,
                    },
                  ];

                  return (
                    <button
                      key={item._id}
                      onBlur={() => setAppear(false)}
                      className="group absolute  w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[11.82px] font-[600] text-center"
                      style={positions[index]}
                      onClick={() => {
                        setSelecetedIndex({ id: item?._id, name: item?.title });
                        setIndexAppear(item._id);
                        setAppear((prev) => (prev === index ? null : item._id));
                        setNoteData({
                          favorite_hobby1: {
                            favorite_hobbyId: getSkill?.favorite_hobby1?._id,
                            descriptionId: item._id,
                          },
                        });

                        setNoteDescription(item?.description);
                      }}
                    >
                      <div className=" text-nowrap ">
                        {item?.title.length > 10
                          ? item?.title.substring(0, 10) + "..."
                          : item?.title}
                      </div>
                      <div
                        className="absolute -top-4 -right-18 bottom-full mb-2 hidden group-hover:flex flex-col items-center
          opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100
          transition-all duration-300 ease-in-out z-30"
                      >
                        <div className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3 w-max max-w-[250px] text-center">
                          {item?.title}
                        </div>
                        <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10" />
                      </div>
                      <div
                        className={`w-[388px] flex  p-3  transition-all duration-500 absolute top-12 right-0 left-0 z-10 rounded-2xl bg-[#D4FFC2] justify-between items-start ${
                          appear &&
                          selectedIndex?.id === item?._id &&
                          selectedIndex?.name === item?.title
                            ? "scale-100"
                            : "scale-0"
                        }`}
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
                              title={
                                item?.is_favorite
                                  ? "Remove from Favorites"
                                  : "Add to Favorites"
                              }
                            />
                          )}
                        </span>
                        <span className="text-start text-wrap text-[14px] leading-[20px] font-medium text-[#172E55]">
                          {item?.description}
                        </span>
                        <div className="absolute -top-2 right-0 left-4 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#D4FFC2]" />
                      </div>
                    </button>
                  );
                })}
            </div>
            {/* {'Bottom Left Skills End'} */}
          </div>
          {/* {'Bottom Right Skills'} */}
          <div
            className={`col-span-6 z-1 flex justify-center relative bottom-[204px] right-[61px]  ${
              BottomRightSkill ? "flex" : "invisible"
            }`}
          >
            <div className="relative">
              <img
                src={skillbottomright}
                className="h-[425px] object-contain "
                alt="Right Skill"
              />
              {getSkill?.favorite_middle_school_subject?.topics?.map(
                (item, index) => {
                  const positions = [
                    {
                      top: "19%",
                      right: "10%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                    },
                    {
                      bottom: "5%",
                      left: "33%",
                      transform: "translate(50%, -50%)",
                    },
                    {
                      top: "52%",
                      right: "30%",
                      transform: "translate(-50%, -50%)",
                    },
                    {
                      bottom: "39.5%",
                      left: "22%",
                      transform: "translate(-50%, 50%)",
                    },
                    {
                      bottom: "47%",
                      right: "14%",
                      transform: "translate(50%, 50%)",
                    },
                  ];

                  return (
                    <button
                      key={item._id}
                      onBlur={() => setAppear(false)}
                      className="group absolute  w-[60px] h-[60px] rounded-full bg-transparent flex items-center justify-center cursor-pointer text-white leading-[12.82px] text-[11.82px] font-[600] text-center"
                      style={positions[index]}
                      onClick={() => {
                        setSelecetedIndex({ id: item?._id, name: item?.title });

                        setAppear((prev) => (prev === index ? null : item._id));
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
                      <div className="text-nowrap max-h-10 ">
                        {item?.title.length > 10
                          ? item?.title.substring(0, 10) + "..."
                          : item?.title}
                      </div>
                      <div
                        className="absolute -top-4 -right-18 bottom-full mb-2 hidden group-hover:flex flex-col items-center
          opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100
          transition-all duration-300 ease-in-out z-30"
                      >
                        <div className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3 w-max max-w-[250px] text-center">
                          {item?.title}
                        </div>
                        <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10" />
                      </div>
                      <div
                        className={`w-[348px] flex  p-3  transition-all duration-500 absolute top-12 right-0 left-0 z-10 rounded-2xl bg-[#D4FFC2] justify-between items-start ${
                          appear &&
                          selectedIndex?.id === item?._id &&
                          selectedIndex?.name === item?.title
                            ? "scale-100"
                            : "scale-0"
                        }`}
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
                              title={
                                item?.is_favorite
                                  ? "Remove from Favorites"
                                  : "Add to Favorites"
                              }
                            />
                          )}
                        </span>
                        <span className="text-start text-wrap text-[14px] leading-[20px] font-medium text-[#172E55]">
                          {item?.description}
                        </span>
                        <div className="absolute -top-2 right-0 left-4 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#D4FFC2]" />
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          </div>
          {/* {'Bottom Right Skills End'} */}
        </div>
      </div>
    </div>
  );
};

export default NewTranfer;
