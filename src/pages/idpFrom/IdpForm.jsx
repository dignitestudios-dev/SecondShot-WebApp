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

const IdpForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  const [idpData, setIdpData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("IDPForm");
  const [view, setView] = useState("career");
  const cards = [
    {
      img: Rookieaward,
      title: "Getting in the Game",
      textColor: "text-[#5470B5]",
      steps: 1,
    },
    {
      img: GameTime,
      title: "Ready to Compete",
      textColor: "text-[#00303A]",
      steps: 2,
    },
    {
      img: PlaybookAward,
      title: "Most Valuable Player",
      textColor: "text-[#FF6CAC]",
      steps: 3,
    },
    {
      img: ChampionAward,
      title: "Undefeated",
      textColor: "text-[#DE6CFF]",
      steps: 4,
    },
    {
      img: FameAward,
      title: "The GOAT",
      textColor: "text-[#0080FF]",
      steps: 5,
    },
  ];
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
  const handleViewChange = (newView) => {
    setView(newView);
    setSelected(newView);
  };
  

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
      {/* <div className="flex space-x-4 relative z-20 mb-6 bg-white p-1 rounded-md">
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
      </div> */}
     
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
            <div
              className="border rounded-[12px] flex items-center  p-3 justify-center h-[48px]  font-[600] text-[18px] cursor-pointer "
              onClick={() => setFormOpen(true)}
            >
              + Create your Individual Development Plan
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
                    <DownladButton idpData={idpData} />
                  </div>
                )}
            </div>

            <div className="flex gap-5   mt-5 flex-wrap" onClick={()=>setFormOpen(true)}>
              {cards?.map((card, index) => {
                const answer = cardData?.[index];

                return (
                  <div
                    key={index}
                    className="bg-[#F4F4F4] w-[215px] rounded-[16px] p-4"
                  >
                    <div className="flex justify-center items-center">
                      {loading ? (
                        <img
                          src={card.img}
                          alt=""
                          className={`w-[92px] h-[87.53px] opacity-15`}
                        />
                      ) : (
                        <img
                          src={card.img}
                          alt=""
                          className={`w-[92px] h-[87.53px] ${
                            idpData.length === 0 || answer === null
                              ? "opacity-15"
                              : "opacity-"
                          }`}
                        />
                      )}
                    </div>

                    <div className="text-center text-[16px] font-[600] text-nowrap mt-2">
                      <h2
                        className={`${
                          idpData.length === 0 || answer === null
                            ? "text-gray-400"
                            : card.textColor
                        }`}
                      >
                        {card.title}
                      </h2>
                      
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
                      ""
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
    </div>
  );
};

export default IdpForm;
