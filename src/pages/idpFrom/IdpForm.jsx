import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  ChampionAward,
  Downloadimg,
  FameAward,
  GameTime,
  PlaybookAward,
  Printimg,
  Rookieaward,
  Shareimg,
} from "../../assets/export";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import AwardForm from "../../components/awardForm/AwardForm";
import axios from "../../axios";
import DownladButton from "../../components/awardForm/DownladButton";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import { AuthContext } from "../../context/AuthContext";
import MyLibrary from "../mylibrary/Mylibrary";
import ViewModal from "../../components/awardForm/ViewModal";
import { FaEye } from "react-icons/fa";
import AllIDPViewModal from "../../components/awardForm/AllIDPViewModal";

const IdpForm = () => {
  const { profilename } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  const [idpData, setIdpData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passData, setPassData] = useState("");
  const [passimg, setPassimg] = useState("");
  const [passQuestion, setPassQuestion] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [allIDPViewModal, setAllIDPViewModal] = useState(false);
  const [selected, setSelected] = useState("IDPForm");
  const [view, setView] = useState("career");

  const getMyIdp = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/my-idp-award");
      if (response.status === 200) {
        setIdpData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching IDP data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyIdp();
  }, []);

  const cardData = idpData?.data?.map((item) => item.answer);
  const cardDataQuestion = idpData?.data?.map(
    (item) => item?.question?.question
  );

  console.log(cardDataQuestion, "cardDataQuestion");

  const handleViewChange = (newView) => {
    setView(newView);
    setSelected(newView);
  };
  const cards = [
    {
      img: Rookieaward,
      title: "Getting in the Game",
      textColor: "text-[#5470B5]",
      steps: 1,
      para: `Second Shot has awarded ${profilename} the Rookie Award for identifying her top transferable skills: ${
        Array.isArray(cardData?.[0]) ? cardData[0].join(", ") : "N/A"
      }. Congratulations!`,
    },
    {
      img: GameTime,
      title: "Ready to Compete",
      textColor: "text-[#00303A]",
      steps: 2,
      para: `Second Shot has awarded ${profilename} the Playbook Pro Award for identifying her top Career Choice: ${
        Array.isArray(cardData?.[1]) ? cardData[1].join(", ") : "N/A"
      }. Congratulations!`,
    },
    {
      img: PlaybookAward,
      title: "Most Valuable Player",
      textColor: "text-[#FF6CAC]",
      steps: 3,
      para: `Second Shot has awarded ${profilename} the Game Time Award for selecting the ${cardData?.[2]} to further research and apply. Congratulations!`,
    },
    {
      img: ChampionAward,
      title: "Undefeated",
      textColor: "text-[#DE6CFF]",
      steps: 4,
      para: `Second Shot has awarded  ${profilename} the Career Champion Award for ${cardData?.[3]} completing her LinkedIn Profile`,
    },
    {
      img: FameAward,
      title: "The GOAT",
      textColor: "text-[#0080FF]",
      steps: 5,
      para: `Second Shot has awarded ${profilename} the Hall of Fame Award for completing her Individual ${cardData?.[4]} Development Plan. Congratulations!`,
    },
  ];
  return (
    <div>
      <AwardForm
        showModal={formOpen}
        setFormOpen={setFormOpen}
        getMyIdp={getMyIdp}
        setStep={setStep}
        step={step}
        cardData={cardData}
        idpData={idpData}
      />
      <div className="flex space-x-4 relative z-20 mb-6 bg-white p-1 rounded-md">
        <button
          className={`${
            selected === "IDPForm"
              ? "bg-gradient-to-r from-[#061523] to-[#012C57] text-white"
              : "text-black text-[16px] font-[400]"
          }  h-[57px] p-5 text-[14px] rounded-sm leading-[18.9px] `}
          onClick={() => setSelected("IDPForm")}
        >
          IDP Form
        </button>
        <button
          className={`${
            selected === "mylibrary"
              ? "bg-gradient-to-r from-[#061523] to-[#012C57] text-white"
              : "text-black text-[16px] font-[400]"
          }  h-[57px] p-5 text-[14px] rounded-sm leading-[18.9px] `}
          onClick={() => setSelected("mylibrary")}
        >
          My Library
        </button>
      </div>

      {selected === "IDPForm" ? (
        <>
          <div className="flex justify-between mt-3">
            <div>
              <div className="flex">
                <button
                  onClick={() => navigate(-1)}
                  className="flex font-[600] text-[12px] gap-1 items-center"
                >
                  <IoIosArrowBack size={12} />
                  Back
                </button>
              </div>
              <h1 className="text-3xl font-semibold text-gray-800 leading-[43.2px] text-left ">
                IDP Form
              </h1>
            </div>
            <div className="flex justify-between items-center gap-3 ">
              <div
                className="border rounded-[12px] flex items-center  p-3 justify-center h-[48px]  font-[600] text-[18px] cursor-pointer "
                onClick={() => setFormOpen(true)}
              >
                + Create your Individual Development Plan
              </div>
              {idpData?.data?.length > 0 &&
                idpData.data.every(
                  (item) => item.answer !== null && item.answer !== undefined
                ) && (
                  <div
                    onClick={() => setAllIDPViewModal(true)}
                    className="border rounded-[12px] flex items-center  p-3 justify-center h-[48px]  font-[600] text-[18px] cursor-pointer "
                  >
                    <FaEye />
                  </div>
                )}
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-4 mt-5">
            <div className="flex  justify-between">
              <h1 className="text-[32px]  text-[#000000] font-[500] ">
                Awards and IDP
              </h1>
              {idpData?.data?.length > 0 &&
                idpData.data.every(
                  (item) => item.answer !== null && item.answer !== undefined
                ) && (
                  <div className="flex justify-end">
                    <DownladButton idpData={idpData} getMyIdp={getMyIdp} />
                  </div>
                )}
            </div>

            <div className="flex gap-5   mt-5 flex-wrap  ">
              {cards?.map((card, index) => {
                const answer = cardData?.[index];
                const question = cardDataQuestion?.[index];

                return (
                  <div
                    key={index}
                    className="bg-[#F4F4F4] w-[215px] rounded-[16px] p-4 flex flex-col justify-between min-h-[320px]"
                  >
                    <div className="flex flex-col space-y-2 justify-center items-center border-b pb-3 ">
                      {loading ? (
                        <img
                          src={card.img}
                          alt=""
                          className={`w-[92px] h-[87.53px] object-contain opacity-15`}
                        />
                      ) : (
                        <img
                          src={card.img}
                          alt=""
                          className={`w-[92px] h-[87.53px]  ${
                            idpData.length === 0 || answer === null
                              ? "opacity-15"
                              : "opacity-"
                          }`}
                        />
                      )}
                      <h2
                        className={`text-center text-[16px] font-[600] text-nowrap ${
                          idpData.length === 0 || answer === null
                            ? "text-gray-400"
                            : card.textColor
                        }`}
                      >
                        {card.title}
                      </h2>
                    </div>

                    <div className="text-center text-[16px] font-[600] text-nowrap ">
                      {idpData.length === 0 || answer === null ? (
                        ""
                      ) : card.para.includes("null") ||
                        card.para.includes("undefined") ? null : (
                        <h3
                          className={`text-wrap  break-words text-[12px] text-center  ${card.textColor}  `}
                        >
                          {card.para}
                        </h3>
                      )}
                    </div>

                    {loading ? (
                      <>
                        <div className="bg-gray-200  w-[170px] h-[40px] rounded-[12px]  mx-2 mt-3"></div>
                      </>
                    ) : idpData.length === 0 || answer === null ? (
                      <div className="flex justify-center">
                        <div className="mt-3 w-[170px]">
                          <AuthSubmitBtn
                            text={"Get This Badge"}
                            handleSubmit={() => {
                              setFormOpen(true);
                              setStep(card.steps);
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3 w-[170px]">
                        <AuthSubmitBtn
                          text={"View Badge "}
                          handleSubmit={() => {
                            setViewModalOpen(true);
                            setPassData(answer);
                            setPassQuestion(question);
                            setPassimg(card.img);
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <MyLibrary />
      )}
      <ViewModal
        showModal={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        passData={passData}
        passimg={passimg}
        passQuestion={passQuestion}
      />
      <AllIDPViewModal
        showModal={allIDPViewModal}
        onClose={() => setAllIDPViewModal(false)}
        cardDataQuestion={cardDataQuestion}
        answer={cardData}
        idpData={idpData}
      />
    </div>
  );
};

export default IdpForm;
