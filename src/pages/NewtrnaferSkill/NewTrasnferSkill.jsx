import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Centerpro,
  CenterSkill,
  Dottedvertical,
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
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import { AuthContext } from "../../context/AuthContext";
import LockModal from "../../components/home/LockModal";
import { useNavigate } from "react-router-dom";
import {
  downloadCombinedPDF,
  downloadProfilePDF,
  downloadSendCombinedPDF,
} from "../../lib/utils";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AddTrasnferSkillPeople from "./AddTrasnferSkillPeople";
import { FiLoader } from "react-icons/fi";
import MessageModal from "./MessageModal";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import NewTranfer from "./NewTranfer";
const NewTrasnferSkill = ({ id }) => {
  const navigate = useNavigate();
  const [topSkill, setTopSkill] = useState(true);
  const [leftSkill, setLeftSkill] = useState(true);
  const [rightSkill, setRightSkill] = useState(true);
  const [bottomLeft, setBottomLeft] = useState(true);
  const [bottomright, setBottomright] = useState(true);
  const [isTopSkillActive, setIsTopSkillActive] = useState(true);
  const [isLeftSkillActive, setIsLeftSkillActive] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isRightSkillActive, setIsRightSkillActive] = useState(true);
  const [isBottomRightSkillActive, setIsBottomRightSkillActive] =
    useState(true);
  const [isBottomLeftSkillActive, setIsBottomLeftSkillActive] = useState(true);

  const { isFirst, setIsFirst } = useContext(ModalContext);
  const [isActive, setIsActive] = useState(false);
  const [appear, setAppear] = useState(false);
  const [cardnote, setCardnote] = useState(false);
  const [lock, setLock] = useState(false);
  const { subscriptionpaid, profilepic, profilename } = useContext(AuthContext);
  const [formData, setformData] = useState({
    fullname: "",
    email: "",
    phone: "",
    fullname_2: "",
    email_2: "",
    phone_2: "",
  });
  const [messageModal, setMessageModal] = useState(false); // For controlling modal visibility
  const [modalMessage, setModalMessage] = useState("");

  const handleLock = () => {
    setLock(true);
  };
  const handleTopSKill = () => {
    setTopSkill((prev) => !prev);
  };

  const handleLeftSKill = () => {
    if (!subscriptionpaid) {
      setLock(true);
      return;
    }

    setLeftSkill((prev) => !prev);

    setAppear(false);
  };

  const handleRightSKill = () => {
    if (!subscriptionpaid) {
      setLock(true);
      return;
    }
    setRightSkill((prev) => !prev);

    setAppear(false);
  };
  const handlebottomleft = () => {
    if (!subscriptionpaid) {
      setLock(true);
      return;
    }
    setBottomLeft((prev) => !prev);

    setAppear(false);
  };
  const handlebottomright = () => {
    if (!subscriptionpaid) {
      setLock(true);
      return;
    }
    setBottomright((prev) => !prev);

    setAppear(false);
  };

  useEffect(() => {
    const isPaid = !!subscriptionpaid;

    setLeftSkill(isPaid);
    setRightSkill(isPaid);
    setBottomLeft(isPaid);
    setBottomright(isPaid);
  }, [subscriptionpaid]);

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
  const [downloading, setDownloading] = useState(false);
  const [isSnapshot, setIsSnapshot] = useState(true);

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

  const handleDownloadCombined = (e, data, filename, loaders) => {
    if (
      !isTopSkillActive ||
      !isLeftSkillActive ||
      !isRightSkillActive ||
      !isBottomLeftSkillActive ||
      !isBottomRightSkillActive
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
      profilename,
      setIsSnapshot,
      loaders
    );
  };

  const [emailLoading, setEmailLoading] = useState(false);

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
      formData.append(
        "transferablleSkills",
        pdfBlob,
        "Transferable Skills Report.pdf"
      );

      const response = await axios.post("/api/user/send-skills", formData);

      if (response.status === 200) {
        SuccessToast(response?.data?.message);
        setShowPeopleModal(false);
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

  const transferpdfElement = document.getElementById("download-skills");



 const handlePrint = async () => {
  const element = document.getElementById("download-skills");
  if (!element) return alert("Skills section not found!");

  // ✅ Wait for layout stabilization
  await new Promise((resolve) => requestAnimationFrame(resolve));

  // ✅ Wait for all images to fully load
  const images = element.querySelectorAll("img");
  await Promise.all(
    Array.from(images).map(
      (img) =>
        img.complete ||
        new Promise((resolve) => (img.onload = img.onerror = resolve))
    )
  );

  // ✅ Temporarily disable transitions/filters
  const style = document.createElement("style");
  style.innerHTML = `
    * {
      transition: none !important;
      animation: none !important;
      filter: none !important;
      opacity: 1 !important;
      backdrop-filter: none !important;
    }
  `;
  document.head.appendChild(style);

  // ✅ Backup + force visibility
  const prevStyles = {
    zIndex: element.style.zIndex,
    opacity: element.style.opacity,
    visibility: element.style.visibility,
    position: element.style.position,
    backgroundColor: element.style.backgroundColor,
  };
  Object.assign(element.style, {
    zIndex: "9999",
    opacity: "1",
    visibility: "visible",
    position: "relative",
    backgroundColor: "#fff",
  });

  // ✅ Wait a short time to ensure styles applied
  await new Promise((resolve) => setTimeout(resolve, 300));

  // ✅ Capture high quality snapshot
  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  // ✅ Restore everything
  Object.assign(element.style, prevStyles);
  document.head.removeChild(style);

  // ✅ Open print window
  const imgData = canvas.toDataURL("image/png");
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Second Shot Career Prep Toolbox Map</title>
        <style>
          @page { size: A4; margin: 10mm; }
          body {
            background: #fff;
            text-align: center;
            margin: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          img {
            max-width: 100%;
            height: auto;
          }
        </style>
      </head>
      <body>
        <img src="${imgData}" />
        <script>
          window.onload = () => {
            setTimeout(() => {
              window.print();
              window.onafterprint = () => window.close();
            }, 300);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};
const [imagesLoaded, setImagesLoaded] = useState(false);
const checkImagesLoaded = async (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) return false;

  const images = element.querySelectorAll("img");
  if (images.length === 0) return true;

  await Promise.all(
    Array.from(images).map(
      (img) =>
        img.complete ||
        new Promise((resolve) => (img.onload = img.onerror = resolve))
    )
  );
  return true;
};

useEffect(() => {
  const interval = setInterval(async () => {
    const loaded = await checkImagesLoaded("download-skills");
    if (loaded) {
      setImagesLoaded(true);
      clearInterval(interval);
    }
  }, 3000); // har second check karega
  return () => clearInterval(interval);
}, []);


  return (
    <div>
      <div>
        <div className="flex gap-20 items-center max-w-screen-xl mx-auto mt-11 px-2 pe-11">
          <div className="w-[450px]">
            <h1 className="text-3xl  font-semibold text-gray-800 mb-4">
              My Transferable Skills
            </h1>
            <p className="text-[16px]   leading-[24px] text-gray-800 ">
              {subscriptionpaid === false
                ? "Explore key skills that can help you transition into new career paths. On the Free Plan, you can only access the first circle in the Transferable Map. Unlock all circle by upgrading your plan."
                : "  Here is a map of your transferable skills. Click on each circle to expand to learn about how you can use your soft skills in other areas of your life. Click the ribbon to save your favorite skills."}
            </p>
          </div>
          <h2 className="text-red-500 text-[16px]    font-[500] leading-[24px]">
            {" "}
            {subscriptionpaid === false
              ? "The free version allows clicking only on the top circle."
              : ""}
          </h2>
        </div>
        <div className="flex gap-2 justify-end items-center max-w-screen-xl mx-auto mt-11 px-11 pe-11    ">
          {/* <div
            onClick={(e) =>
              subscriptionpaid
                ? handleDownloadCombined(
                    e,
                    getSkill,
                    "Transferable Skills Report.pdf",
                    false
                  )
                : setLock(true)
            }
            className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white  shadow-lg    rounded-lg cursor-pointer"
          >
            <img
              className="w-[27.61px] h-[23px] "
              src={Printimg}
              title="Print "
            />
          </div> */}
          <div
            onClick={() =>
              subscriptionpaid
                ? handleShowPeopleModal(() => setShowPeopleModal(true))
                : setLock(true)
            }
            className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-lg rounded-lg cursor-pointer  "
          >
            <img
              className="h-[20px] w-[20px] object-contain "
              src={Shareimg}
              title="Share"
            />
          </div>
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
                subscriptionpaid
                  ? handleDownloadCombined(
                      e,
                      getSkill,
                      "Transferable Skills Report.pdf",
                      true
                    )
                  : setLock(true)
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
        <div
  className={`p-2 mx-1 w-[47px] h-[49px] flex justify-center items-center rounded-lg shadow-lg 
    ${
      imagesLoaded
        ? "bg-white cursor-pointer hover:scale-105 transition-all"
        : "bg-gray-200 cursor-not-allowed opacity-50"
    }`}
  onClick={() => {
    if (imagesLoaded) handlePrint(); // ✅ disable click if not ready
  }}
  title={imagesLoaded ? "Print" : "Loading images..."}
>
  <img
    src={Printimg}
    alt="Print"
    className="w-[27.61px] h-[23px]"
  />
</div>

          <div className="w-[189px] shadow-lg rounded-full">
            <AuthSubmitBtn
              text={"Email It To Yourself"}
              handleSubmit={subscriptionpaid ? handleEmailSend : handleLock}
              loading={emailLoading}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <NewTranfer
          topSkill={isTopSkillActive}
          setTopSkill={setIsTopSkillActive}
          LeftSkill={isLeftSkillActive}
          setLeftSkill={setIsLeftSkillActive}
          RightSkill={isRightSkillActive}
          setRightSkill={setIsRightSkillActive}
          BottomLeftSkill={isBottomLeftSkillActive}
          setBottomLeftSkill={setIsBottomLeftSkillActive}
          BottomRightSkill={isBottomRightSkillActive}
          setBottomRightSkill={setIsBottomRightSkillActive}
        />
      </div>
      <div className="relative w-full   ">
        <MessageModal
          showModal={messageModal}
          setShowModal={setMessageModal}
          handleClick={() => setMessageModal(false)}
        />
        <ResumeDownloadModal
          showModal={showModalDownload}
          onclick={handleDownloadModal}
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
        {/*  */}
        {loading ? (
          <></>
        ) : (
          <div id="download-skills" className={"absolute  -z-50 bottom-0"}>
            <div
              className={`  ${
                (getSkill?.military?.rank?.rank_name && topSkill) ||
                (getSkill?.favorite_middle_school_subject?.subject_name &&
                  topSkill)
                  ? "visible"
                  : "invisible"
              } flex    justify-center transition-all duration-1000 ease-in-out ${
                topSkill
                  ? "animationtransferaable"
                  : "opacity-0 transform scale-95"
              }`}
            >
              <div className="absolute  text-sm font-medium text-white text-center ">
                <>
                  {getSkill?.military?.rank?.rank_name
                    ? getSkill?.military?.rank?.topics?.map((item, index) => {
                        // har button ki position define karne ke liye ek array
                        const positions = [
                          "absolute top-[150px]", // index 0
                          "relative top-[70px] right-[200px]", // index 1
                          "relative top-[-8px] left-[190px]", // index 2
                          "relative top-[90px] left-[260px]", // index 3
                          "relative top-[34px] right-[260px]", // index 4
                        ];

                        return (
                          <div key={index}>
                            <button
                              onBlur={() => setAppear(false)}
                              className={`cursor-pointer bg-transparent h-[70px] rounded-full flex justify-center items-center group ${positions[index]}`}
                              onClick={() => {
                                setAppear(true);
                                setSelecetedIndex({
                                  id: index,
                                  name: item?.title,
                                  description: item?.description,
                                });
                                setNoteData({
                                  athlete: {
                                    athleteId:
                                      getSkill?.athlete?.sport_position?._id,
                                    descriptionId: item?._id,
                                  },
                                });
                                setNoteDescription(item?.description);
                              }}
                            >
                              <p className="text-nowrap">
                                {item?.title?.length > 8
                                  ? item?.title.substring(0, 8) + "..."
                                  : item?.title}
                              </p>

                              {/* Tooltip */}
                              <div
                                className="absolute -top-6 -left-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
            opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
            transition-all duration-300 ease-in-out"
                              >
                                <div className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3 w-max max-w-[250px] text-center">
                                  {item?.title}
                                </div>
                                <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                              </div>

                              {/* Description Box */}
                              <span
                                className={`w-[388px] flex transition-all duration-500 absolute top-20 right-0 z-10 ${
                                  appear &&
                                  selectedIndex?.id === index &&
                                  selectedIndex?.name === item?.title
                                    ? "scale-100"
                                    : "scale-0"
                                } rounded-2xl bg-[#D4FFC2] p-4 justify-between items-start`}
                              >
                                <span className="w-[80%] h-full text-md font-medium text-[#172E55]">
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
                                      title={
                                        item?.is_favorite
                                          ? "Remove from Favorites"
                                          : "Add to Favorites"
                                      }
                                    />
                                  )}
                                </span>
                              </span>
                            </button>
                          </div>
                        );
                      })
                    : getSkill?.favorite_middle_school_subject?.topics?.map(
                        (item, index) => {
                          // har button ki position define karne ke liye ek array
                          const positions = [
                            "absolute top-[150px]", // index 0
                            "relative top-[70px] right-[200px]", // index 1
                            "relative top-[-8px] left-[190px]", // index 2
                            "relative top-[90px] left-[260px]", // index 3
                            "relative top-[34px] right-[260px]", // index 4
                          ];

                          return (
                            <div key={index}>
                              <button
                                onBlur={() => setAppear(false)}
                                className={`cursor-pointer bg-transparent h-[70px] rounded-full flex justify-center items-center group ${positions[index]}`}
                                onClick={() => {
                                  setAppear(true);
                                  setSelecetedIndex({
                                    id: index,
                                    name: item?.title,
                                    description: item?.description,
                                  });
                                  setNoteData({
                                    athlete: {
                                      athleteId:
                                        getSkill?.athlete?.sport_position?._id,
                                      descriptionId: item?._id,
                                    },
                                  });
                                  setNoteDescription(item?.description);
                                }}
                              >
                                <p className="text-nowrap">
                                  {item?.title?.length > 8
                                    ? item?.title.substring(0, 8) + "..."
                                    : item?.title}
                                </p>

                                {/* Tooltip */}
                                <div
                                  className="absolute -top-6 -left-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
            opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
            transition-all duration-300 ease-in-out"
                                >
                                  <div className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3 w-max max-w-[250px] text-center">
                                    {item?.title}
                                  </div>
                                  <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                                </div>

                                {/* Description Box */}
                                <span
                                  className={`w-[388px] flex transition-all duration-500 absolute top-20 right-0 z-10 ${
                                    appear &&
                                    selectedIndex?.id === index &&
                                    selectedIndex?.name === item?.title
                                      ? "scale-100"
                                      : "scale-0"
                                  } rounded-2xl bg-[#D4FFC2] p-4 justify-between items-start`}
                                >
                                  <span className="w-[80%] h-full text-md font-medium text-[#172E55]">
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
                                          handleLike(
                                            noteData,
                                            item?.is_favorite
                                          )
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
                                </span>
                              </button>
                            </div>
                          );
                        }
                      )}
                </>
              </div>
              <img src={skilltop} className="h-[474px]" alt="" />
            </div>
            <div className="flex justify-center relative -top-[119px] items-baseline flex-nowrap ">
              <div
                className={` ${
                  leftSkill ? "visible" : "invisible"
                } relative -top-[80px] -right-20 duration-1000 ease-in-out ${
                  leftSkill
                    ? "animationtransferaable"
                    : "opacity-0 transform scale-95"
                }`}
              >
                <div className="absolute text-sm font-medium text-white">
                  {getSkill?.favorite_hobby2?.topics?.map((item, index) => (
                    <div key={index}>
                      {index === 0 && (
                        <button
                          onBlur={() => setAppear(false)}
                          className="relative top-[140px] cursor-pointer left-[100px] group" // Added 'group' class for hover functionality
                          onClick={() => {
                            setAppear(true);
                            setSelecetedIndex({ id: 0, name: item.title });
                            setNoteData({
                              favorite_hobby2: {
                                favorite_hobbyId:
                                  getSkill?.favorite_hobby2?._id,
                                descriptionId: item._id,
                              },
                            });
                            setNoteDescription(item?.description);
                          }}
                        >
                          <p className="text-nowrap">
                            {item?.title.length > 8
                              ? item?.title.substring(0, 8) + "..."
                              : item?.title}
                          </p>

                          {/* Tooltip */}
                          <div
                            className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                          >
                            <div
                              className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                            >
                              {item?.title}
                            </div>
                            <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                          </div>

                          {/* Note description */}
                          <span
                            className={`w-[388px] flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                              appear &&
                              selectedIndex?.id === 0 &&
                              selectedIndex?.name === item?.title
                                ? "scale-100"
                                : "scale-0"
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
                                  title={
                                    item?.is_favorite
                                      ? "Remove from Favorites"
                                      : "Add to Favorites"
                                  }
                                />
                              )}
                            </span>
                            <span className="h-full text-md font-medium text-[#172E55]">
                              {item?.description}
                            </span>
                          </span>
                        </button>
                      )}
                      {index === 1 && (
                        <button
                          onBlur={() => setAppear(false)}
                          className="relative top-[110px] cursor-pointer left-[256px] group  "
                          onClick={() => {
                            setAppear(true);
                            setSelecetedIndex({ id: 1, name: item.title });
                            setNoteData({
                              favorite_hobby2: {
                                favorite_hobbyId:
                                  getSkill?.favorite_hobby2?._id,
                                descriptionId: item._id,
                              },
                            });
                            setNoteDescription(item?.description);
                          }}
                        >
                          <p className="text-nowrap">
                            {item.title.length > 8
                              ? item.title.substring(0, 8) + "..."
                              : item.title}
                          </p>
                          <div
                            className="absolute -top-14 -left-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                          >
                            <div
                              className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                            >
                              {item?.title}
                            </div>
                            <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                          </div>
                          <span
                            className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                              appear &&
                              selectedIndex?.id === 1 &&
                              selectedIndex?.name === item?.title
                                ? "scale-100"
                                : "scale-0"
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
                                  title={
                                    item?.is_favorite
                                      ? "Remove from Favorites"
                                      : "Add to Favorites"
                                  }
                                />
                              )}
                            </span>
                            <span className=" h-full text-md font-medium text-[#172E55]">
                              {item?.description}
                            </span>
                          </span>
                        </button>
                      )}
                      {index === 2 && (
                        <button
                          onBlur={() => setAppear(false)}
                          className="relative top-[305px] cursor-pointer left-[130px] group "
                          onClick={() => {
                            setAppear(true);
                            setSelecetedIndex({ id: 2, name: item.title });
                            setNoteData({
                              favorite_hobby2: {
                                favorite_hobbyId:
                                  getSkill?.favorite_hobby2?._id,
                                descriptionId: item._id,
                              },
                            });
                            setNoteDescription(item?.description);
                          }}
                        >
                          <p className="text-nowrap">
                            {item.title.length > 8
                              ? item.title.substring(0, 8) + "..."
                              : item.title}
                          </p>
                          <div
                            className="absolute -top-16 -right-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                          >
                            <div
                              className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                            >
                              {item?.title}
                            </div>
                            <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                          </div>
                          <span
                            className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                              appear &&
                              selectedIndex?.id === 2 &&
                              selectedIndex?.name === item?.title
                                ? "scale-100"
                                : "scale-0"
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
                                  title={
                                    item?.is_favorite
                                      ? "Remove from Favorites"
                                      : "Add to Favorites"
                                  }
                                />
                              )}
                            </span>
                            <span className=" h-full text-md font-medium text-[#172E55]">
                              {item?.description}
                            </span>
                          </span>
                        </button>
                      )}
                      {index === 3 && (
                        <button
                          onBlur={() => setAppear(false)}
                          className="relative top-[425px]   cursor-pointer left-[59px] group "
                          onClick={() => {
                            setAppear(true);
                            setSelecetedIndex({ id: 3, name: item.title });
                            setNoteData({
                              favorite_hobby2: {
                                favorite_hobbyId:
                                  getSkill?.favorite_hobby2?._id,
                                descriptionId: item._id,
                              },
                            });
                            setNoteDescription(item?.description);
                          }}
                        >
                          <p className="text-nowrap">
                            {item.title.length > 8
                              ? item.title.substring(0, 8) + "..."
                              : item.title}
                          </p>
                          <div
                            className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                          >
                            <div
                              className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                            >
                              {item?.title}
                            </div>
                            <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                          </div>
                          <span
                            className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                              appear &&
                              selectedIndex?.id === 3 &&
                              selectedIndex?.name === item?.title
                                ? "scale-100"
                                : "scale-0"
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
                                  title={
                                    item?.is_favorite
                                      ? "Remove from Favorites"
                                      : "Add to Favorites"
                                  }
                                />
                              )}
                            </span>
                            <span className=" h-full text-wrap text-md font-medium text-[#172E55]">
                              {item?.description}
                            </span>
                          </span>
                        </button>
                      )}
                      {index === 4 && (
                        <button
                          onBlur={() => setAppear(false)}
                          className="relative top-[495px] text-nowrap w-[40px] cursor-pointer flex justify-center text-center left-[180px] group "
                          onClick={() => {
                            setAppear(true);
                            setSelecetedIndex({ id: 4, name: item.title });
                            setNoteData({
                              favorite_hobby2: {
                                favorite_hobbyId:
                                  getSkill?.favorite_hobby2?._id,
                                descriptionId: item._id,
                              },
                            });
                            setNoteDescription(item?.description);
                          }}
                        >
                          <p className="text-nowrap">
                            {item.title.length > 8
                              ? item.title.substring(0, 8) + "..."
                              : item.title}
                          </p>
                          <div
                            className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                          >
                            <div
                              className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                            >
                              {item?.title}
                            </div>
                            <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                          </div>
                          <span
                            className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                              appear &&
                              selectedIndex?.id === 4 &&
                              selectedIndex?.name === item?.title
                                ? "scale-100"
                                : "scale-0"
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
                                  title={
                                    item?.is_favorite
                                      ? "Remove from Favorites"
                                      : "Add to Favorites"
                                  }
                                />
                              )}
                            </span>
                            <span className=" h-full text-wrap text-md font-medium text-[#172E55]">
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

              <div className={`flex justify-center  items-center`}>
                <div className="absolute ">
                  <div
                    className="relative right-[12px]  text-[16px] leading-[16px] w-[20px] flex justify-center text-[#172E55] font-[600] bottom-[242px] cursor-pointer  text-center z-10 group"
                    onClick={handleTopSKill}
                  >
                    <span className=" w-full text-center">
                      {loading ? (
                        <div className="w-16 h-16 rounded-[100px] absolute -bottom-8 left-0 bg-green-700 animate-pulse flex justify-center items-center"></div>
                      ) : getSkill?.military?.rank?.rank_name ? (
                        <div className="text-nowrap">
                          {getSkill?.military?.rank?.rank_name?.substring(
                            0,
                            7
                          ) + "..."}
                        </div>
                      ) : getSkill?.favorite_middle_school_subject
                          ?.subject_name ? (
                        <div className="text-nowrap">
                          {getSkill.favorite_middle_school_subject.subject_name?.substring(
                            0,
                            7
                          ) + "..."}
                        </div>
                      ) : null}
                    </span>

                    <div
                      className="absolute -top-16 bottom-full mb-2 hidden group-hover:flex flex-col items-center 
          opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 
          transition-all duration-300 ease-in-out "
                    >
                      <div
                        className="bg-[#172E55] text-white text-md font-medium rounded-lg shadow-lg py-2 px-3 
          w-max max-w-[250px] relative z-10 text-center"
                      >
                        {getSkill?.athlete?.primary_sport?.sport_name}
                      </div>
                      <div className="w-3 h-3 bg-[#172E55] relative z-0 -top-2 rotate-45 -mb-10"></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center absolute ">
                  {profilepic ? (
                    <img
                      src={profilepic}
                      className=" h-[175.75px] relative top-[43px] left-[2px]  w-[176.1px] rounded-full object-cover"
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

                  <div
                    className={`text-md text-center absolute ${
                      profilepic
                        ? "top-[250px] left-[35px]"
                        : "top-[170px] -left-[54px]"
                    }  w-[120px] text-wrap break-words   font-[600] text-[#0a1723]`}
                  >
                    {profilename}
                  </div>
                </div>
                <img src={CenterSkill} className="h-[655.67px]" alt="" />
                <div className="absolute">
                  <div
                    className="relative text-[16px] w-[80px] h-[80px] bg-transparent rounded-full 
             items-center leading-[16px] flex justify-center text-[#172E55] font-[600] 
             z-10 cursor-pointer top-[-47px] right-[285px] text-center group"
                    onClick={handleLeftSKill}
                  >
                    <span className="w-[0px]">
                      {loading ? (
                        <div className="w-16 h-16 rounded-[100px] absolute bottom-2 -right-[24px] bg-green-700 animate-pulse flex justify-center items-center "></div>
                      ) : getSkill?.favorite_hobby2?.hobbie_name.length > 7 ? (
                        <div className="text-nowrap">
                          {getSkill.favorite_hobby2.hobbie_name.substring(
                            0,
                            7
                          ) + "..."}
                        </div>
                      ) : (
                        getSkill?.favorite_hobby2?.hobbie_name
                      )}
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
                    className="relative text-[16px] leading-[16px] w-[80px] h-[80px] bg-transparent items-center flex justify-center text-[#172E55] font-[600] cursor-pointer z-10 top-[-47px] left-[225px] text-center group"
                    onClick={handleRightSKill}
                  >
                    <span className=" w-[20px]">
                      {loading ? (
                        <div className="w-16 h-16 rounded-[100px] absolute bottom-2 truncate  bg-green-700 animate-pulse flex "></div>
                      ) : getSkill?.athlete?.primary_sport?.sport_name.length >
                        5 ? (
                        <div className="text-nowrap">
                          {getSkill?.athlete?.primary_sport?.sport_name.substring(
                            0,
                            5
                          ) + "..."}
                        </div>
                      ) : (
                        <span className="absolute -right-[1px] top-8">
                          {getSkill?.athlete?.primary_sport?.sport_name ||
                            "Null"}
                        </span>
                      )}
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
                        {getSkill?.athlete?.primary_sport?.sport_name}
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
              !getSkill?.favorite_hobby1?.hobbie_name
                ? "right-[185px]"
                : "right-[200px]"
            }`}
                    onClick={handlebottomleft}
                  >
                    <span className=" w-[20px]">
                      {loading ? (
                        <div className="w-16 h-16 rounded-[100px] absolute bottom-2 -right-[13px] bg-green-700 animate-pulse flex "></div>
                      ) : getSkill?.favorite_hobby1?.hobbie_name?.length > 7 ? (
                        <div className="text-nowrap">
                          {getSkill?.favorite_hobby1?.hobbie_name.substring(
                            0,
                            7
                          ) + "..."}
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
                        {getSkill?.favorite_hobby1?.hobbie_name}
                      </div>
                      <div className="w-3 h-3 bg-[#172E55] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                  </div>
                  <div
                    className="relative text-[16px] leading-[16px]  w-[100px] h-[80px] bg-transparent rounded-full items-center flex justify-center text-[#172E55] font-[600] cursor-pointer   z-10 top-[224px] left-[184px] text-center group"
                    onClick={handlebottomright}
                  >
                    <span className=" w-full text-center">
                      {loading ? (
                        <div className="w-16 h-16 rounded-[100px] absolute bottom-2 left-[18px] bg-green-700 animate-pulse flex justify-center items-center "></div>
                      ) : getSkill?.athlete?.sport_position?.position_name
                          ?.length > 7 ? (
                        <div className="text-nowrap">
                          {getSkill?.athlete?.sport_position?.position_name?.substring(
                            0,
                            7
                          ) + "..."}
                        </div>
                      ) : (
                        getSkill?.athlete?.sport_position?.position_name ||
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
                        {getSkill?.favorite_middle_school_subject?.subject_name}
                      </div>
                      <div className="w-3 h-3 bg-[#172E55] relative -top-2 rotate-45 -mb-10"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  getSkill?.athlete?.primary_sport?.topics && rightSkill
                    ? "visible"
                    : "invisible"
                } relative -top-[70px] -left-16 duration-1000 ease-in-out ${
                  rightSkill
                    ? "animationtransferaable"
                    : "opacity-0 transform scale-95"
                }`}
              >
                <div className="absolute cursor-pointer text-sm font-medium text-white text-center">
                  {getSkill?.athlete?.primary_sport?.topics?.map(
                    (item, index) => (
                      <div key={item._id}>
                        {index === 0 && (
                          <button
                            onBlur={() => setAppear(false)}
                            className="relative cursor-pointer bg-transparent h-[70px] rounded-full flex justify-center items-center top-[90px] -right-[100px] group"
                            onClick={() => {
                              setAppear(true);
                              setSelecetedIndex({ id: 0, name: item.title });
                              setNoteData({
                                rank: {
                                  rankId: getSkill?.military?.rank?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-5 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-20 right-0  z-10 ${
                                appear &&
                                selectedIndex?.id === 0 &&
                                selectedIndex?.name === item?.title
                                  ? "scale-100"
                                  : "scale-0"
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
                                  />
                                )}
                              </span>
                              <span className=" h-full text-md font-medium text-[#172E55]">
                                {item?.description}
                              </span>
                            </span>
                          </button>
                        )}

                        {index === 1 && (
                          <button
                            onBlur={() => setAppear(false)}
                            className="relative  cursor-pointer top-[60px] left-[285px] w-[50px] group"
                            onClick={() => {
                              setAppear(true);
                              setSelecetedIndex({
                                id: 1,
                                name: item.title,
                                description: item.description,
                              });
                              setNoteData({
                                rank: {
                                  rankId: getSkill?.military?.rank?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-16 -right-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0  z-10 ${
                                appear &&
                                selectedIndex?.id === 1 &&
                                selectedIndex?.description === item?.description
                                  ? "scale-100"
                                  : "scale-0"
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
                                  />
                                )}
                              </span>
                              <span className=" h-full text-md font-medium text-[#172E55]">
                                {item?.description}
                              </span>
                            </span>
                          </button>
                        )}

                        {index === 2 && (
                          <button
                            onBlur={() => setAppear(false)}
                            className="relative cursor-pointer  top-[245px] left-[220px] w-[50px] group"
                            onClick={() => {
                              setAppear(true);
                              setSelecetedIndex({ id: 2, name: item.title });
                              setNoteData({
                                rank: {
                                  rankId: getSkill?.military?.rank?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-12 -right-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0  z-10 ${
                                appear &&
                                selectedIndex?.id === 2 &&
                                selectedIndex?.name === item?.title
                                  ? "scale-100"
                                  : "scale-0"
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
                                  />
                                )}
                              </span>
                              <span className=" h-full text-md font-medium text-[#172E55]">
                                {item?.description}
                              </span>
                            </span>
                          </button>
                        )}

                        {index === 3 && (
                          <button
                            onBlur={() => setAppear(false)}
                            className="relative cursor-pointer top-[395px] left-[285px] w-[50px] group"
                            onClick={() => {
                              setAppear(true);
                              setSelecetedIndex({ id: 3, name: item.title });
                              setNoteData({
                                rank: {
                                  rankId: getSkill?.military?.rank?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-16 -right-20 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0  z-10 ${
                                appear &&
                                selectedIndex?.id === 3 &&
                                selectedIndex?.name === item?.title
                                  ? "scale-100"
                                  : "scale-0"
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
                                  />
                                )}
                              </span>
                              <span className=" h-full text-md font-medium text-[#172E55]">
                                {item?.description}
                              </span>
                            </span>
                          </button>
                        )}

                        {index === 4 && (
                          <button
                            onBlur={() => setAppear(false)}
                            className="relative cursor-pointer top-[465px] left-[180px] group"
                            onClick={() => {
                              setAppear(true);
                              setSelecetedIndex({ id: 4, name: item.title });
                              setNoteData({
                                rank: {
                                  rankId: getSkill?.military?.rank?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-12 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0  z-10 ${
                                appear &&
                                selectedIndex?.id === 4 &&
                                selectedIndex?.name === item?.title
                                  ? "scale-100"
                                  : "scale-0"
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
                                  />
                                )}
                              </span>
                              <span className=" h-full text-md font-medium text-[#172E55]">
                                {item?.description}
                              </span>
                            </span>
                          </button>
                        )}
                      </div>
                    )
                  )}
                </div>
                <img src={skillright} className="h-[725px] " alt="" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-10">
              <div className="h-[600px]">
                <div
                  className={`${
                    bottomLeft ? "visible" : "invisible"
                  } relative -top-[270px]  left-[78px] duration-1000 ease-in-out ${
                    bottomLeft
                      ? "animationtransferaable"
                      : "opacity-0 transform scale-95"
                  }`}
                >
                  <div className="absolute text-sm font-medium text-white text-center">
                    {getSkill?.favorite_hobby1?.topics?.map((item, index) => (
                      <div key={item._id}>
                        {index === 0 && (
                          <button
                            onBlur={() => setAppear(false)}
                            className="relative cursor-pointer top-[135px] flex justify-center left-[145px]  group"
                            onClick={() => {
                              setAppear(true);
                              setSelecetedIndex({ id: 0, name: item.title });
                              setNoteData({
                                favorite_hobby1: {
                                  favorite_hobbyId:
                                    getSkill?.favorite_hobby1?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                                appear &&
                                selectedIndex?.id === 0 &&
                                selectedIndex?.name === item?.title
                                  ? "scale-100"
                                  : "scale-0"
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
                                  />
                                )}
                              </span>
                              <span className=" h-full text-md font-medium text-[#172E55]">
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
                              setSelecetedIndex({ id: 1, name: item.title });
                              setNoteData({
                                favorite_hobby1: {
                                  favorite_hobbyId:
                                    getSkill?.favorite_hobby1?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                                selectedIndex?.id === 1 &&
                                appear &&
                                selectedIndex?.name === item?.title
                                  ? "scale-100"
                                  : "scale-0"
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
                                  />
                                )}
                              </span>
                              <span className=" h-full text-md font-medium text-[#172E55]">
                                {item?.description}
                              </span>
                            </span>
                          </button>
                        )}

                        {index === 2 && (
                          <button
                            onBlur={() => setAppear(false)}
                            className="relative cursor-pointer top-[300px] flex justify-center left-[305px] group "
                            onClick={() => {
                              setAppear(true);
                              setSelecetedIndex({ id: 2, name: item.title });
                              setNoteData({
                                favorite_hobby1: {
                                  favorite_hobbyId:
                                    getSkill?.favorite_hobby1?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                                appear &&
                                selectedIndex?.id === 2 &&
                                selectedIndex?.name === item?.title
                                  ? "scale-100"
                                  : "scale-0"
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
                                  />
                                )}
                              </span>
                              <span className=" h-full text-md font-medium text-[#172E55]">
                                {item?.description}
                              </span>
                            </span>
                          </button>
                        )}

                        {index === 3 && (
                          <button
                            onBlur={() => setAppear(false)}
                            className="relative cursor-pointer top-[440px] flex justify-center left-[415px] group "
                            onClick={() => {
                              setAppear(true);
                              setSelecetedIndex({ id: 3, name: item.title });
                              setNoteData({
                                favorite_hobby1: {
                                  favorite_hobbyId:
                                    getSkill?.favorite_hobby1?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                                appear &&
                                selectedIndex?.id === 3 &&
                                selectedIndex?.name === item?.title
                                  ? "scale-100"
                                  : "scale-0"
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
                                  />
                                )}
                              </span>
                              <span className=" h-full text-md font-medium text-[#172E55]">
                                {item?.description}
                              </span>
                            </span>
                          </button>
                        )}

                        {index === 4 && (
                          <button
                            onBlur={() => setAppear(false)}
                            className="relative cursor-pointer top-[315px] flex justify-center left-[572px]  group"
                            onClick={() => {
                              setAppear(true);
                              setSelecetedIndex({ id: 4, name: item.title });
                              setNoteData({
                                favorite_hobby1: {
                                  favorite_hobbyId:
                                    getSkill?.favorite_hobby1?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 left-0 z-10 ${
                                appear &&
                                selectedIndex?.id === 4 &&
                                selectedIndex?.name === item?.title
                                  ? "scale-100"
                                  : "scale-0"
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
                                  />
                                )}
                              </span>
                              <span className=" h-full text-md font-medium text-[#172E55]">
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
              </div>

              <div
                className={`${
                  getSkill?.athlete?.sport_position?.topics && bottomright
                    ? "visible"
                    : "invisible"
                } relative -top-[230px]  right-[104px] duration-1000 ease-in-out ${
                  bottomright
                    ? "animationtransferaable"
                    : "opacity-0 transform scale-95"
                }`}
              >
                <div className="absolute text-sm font-medium text-white ">
                  {getSkill?.athlete?.sport_position?.topics?.map(
                    (item, index) => (
                      <div key={item._id}>
                        {index === 0 && (
                          <button
                            onBlur={() => setAppear(false)}
                            className="relative cursor-pointer top-[110px] left-[550px]  flex justify-center text-center group"
                            onClick={() => {
                              setAppear(true);
                              setSelecetedIndex({ id: 0, name: item.title });
                              setNoteData({
                                favorite_middle_school_subject: {
                                  favoriteSubjectId:
                                    getSkill?.favorite_middle_school_subject
                                      ?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 z-10 ${
                                appear &&
                                selectedIndex?.id === 0 &&
                                selectedIndex?.name === item?.title
                                  ? "scale-100"
                                  : "scale-0"
                              } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                            >
                              <span className=" h-full text-md font-medium text-[#172E55]">
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
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
                              setSelecetedIndex({ id: 1, name: item.title });

                              setNoteData({
                                favorite_middle_school_subject: {
                                  favoriteSubjectId:
                                    getSkill?.favorite_middle_school_subject
                                      ?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            {" "}
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 z-10 ${
                                appear &&
                                selectedIndex?.id === 1 &&
                                selectedIndex?.name === item?.title
                                  ? "scale-100"
                                  : "scale-0"
                              } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                            >
                              <span className=" h-full text-md font-medium text-[#172E55]">
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
                                  />
                                )}
                              </span>
                            </span>
                          </button>
                        )}
                        {index === 2 && (
                          <button
                            onBlur={() => setAppear(false)}
                            className="relative cursor-pointer top-[275px] left-[390px] flex justify-center text-center group"
                            onClick={() => {
                              setAppear(true);
                              setSelecetedIndex({ id: 2, name: item.title });
                              setNoteData({
                                favorite_middle_school_subject: {
                                  favoriteSubjectId:
                                    getSkill?.favorite_middle_school_subject
                                      ?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 z-10 ${
                                appear &&
                                (selectedIndex?.id === 2) &
                                  (selectedIndex?.name === item?.title)
                                  ? "scale-100"
                                  : "scale-0"
                              } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                            >
                              <span className=" h-full text-md font-medium text-[#172E55]">
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
                                  />
                                )}
                              </span>
                            </span>
                          </button>
                        )}
                        {index === 3 && (
                          <button
                            onBlur={() => setAppear(false)}
                            className="relative cursor-pointer top-[430px] left-[295px]  flex justify-center text-center group"
                            onClick={() => {
                              setAppear(true);
                              setSelecetedIndex({ id: 3, name: item.title });
                              setNoteData({
                                favorite_middle_school_subject: {
                                  favoriteSubjectId:
                                    getSkill?.favorite_middle_school_subject
                                      ?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-12 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 z-10 ${
                                appear &&
                                selectedIndex?.id === 3 &&
                                selectedIndex?.name === item?.title
                                  ? "scale-100"
                                  : "scale-0"
                              } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                            >
                              <span className=" h-full text-md font-medium text-[#172E55]">
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
                                  />
                                )}
                              </span>
                            </span>
                          </button>
                        )}
                        {index === 4 && (
                          <button
                            onBlur={() => setAppear(false)}
                            className="relative cursor-pointer top-[240px] left-[613px] flex justify-center text-center group"
                            onClick={() => {
                              setAppear(true);
                              setSelecetedIndex({ id: 4, name: item.title });
                              setNoteData({
                                favorite_middle_school_subject: {
                                  favoriteSubjectId:
                                    getSkill?.favorite_middle_school_subject
                                      ?._id,
                                  descriptionId: item._id,
                                },
                              });
                              setNoteDescription(item?.description);
                            }}
                          >
                            {" "}
                            <p className="text-nowrap">
                              {item.title.length > 8
                                ? item.title.substring(0, 8) + "..."
                                : item.title}
                            </p>
                            <div
                              className="absolute -top-14 -right-10 bottom-full mb-2 hidden group-hover:flex flex-col items-center
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out"
                            >
                              <div
                                className="bg-[#56EC17] text-[#172E55] text-md font-medium rounded-lg shadow-lg py-2 px-3
                    w-max max-w-[250px] text-center"
                              >
                                {item?.title}
                              </div>
                              <div className="w-3 h-3 bg-[#56EC17] relative -top-2 rotate-45 -mb-10"></div>
                            </div>
                            <span
                              className={`w-[388px]  flex transition-all duration-500 absolute top-10 right-0 z-10 ${
                                appear &&
                                selectedIndex?.id === 4 &&
                                selectedIndex?.name === item?.title
                                  ? "scale-100"
                                  : "scale-0"
                              } zIndex   rounded-2xl bg-[#D4FFC2] p-4  justify-between items-start`}
                            >
                              <span className=" h-full text-md font-medium text-[#172E55]">
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
                                    title={
                                      item?.is_favorite
                                        ? "Remove from Favorites"
                                        : "Add to Favorites"
                                    }
                                  />
                                )}
                              </span>
                            </span>
                          </button>
                        )}
                      </div>
                    )
                  )}
                </div>
                <img src={skillbottomright} className="  h-[625px]" alt="" />
              </div>
            </div>
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
          handleClick={() =>
            navigate("/subscriptionplans", {
              state: { cardShow: true },
            })
          }
          onClose={() => setLock(false)}
          text={
            "Subscribe to unlock the full map and access all of the modules."
          }
        />
      </div>
    </div>
  );
};

export default NewTrasnferSkill;
