import React, { useEffect, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import { RxCross2 } from "react-icons/rx";
import axios from "../../axios";
const AwardForm = ({ showModal, setFormOpen, getMyIdp,step,setStep ,cardData,idpData,profilename}) => {
 
  const [formLoading, setFormLoading] = useState(false);
  const [imageFaded, setImageFaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [question, setQuestion] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState([]);
  const [loadingSkill, setloadingSkills] = useState(false);
  const [careerloading, setCareerloading] = useState(false);
  const [questionloading, setQuestionloading] = useState(false);
  const [filteredskills, setFilteredskills] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillQuery, setSkillQuery] = useState("");
  const [carrerData, setcarrerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredcareer, setFilteredcareer] = useState([]);
  const [gameTime, setGameTime] = useState("");
  const [linkdInprofile, setLinkdInprofile] = useState("");
  const [championAward, setChampionAward] = useState("");
  

  const Questions = question?.map((item) => item?.question);
  const QuestionID = question?.map((item) => item?._id);



  const handleModalClose = () => {
    setImageFaded(true);
    setModalOpen(false);

    setTimeout(() => {
      nextStep();
      setImageFaded(false);
    }, 1000);
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const sections = [
    "Rookie",
    "Game Time",
    "MVP",
    "Career Champion",
    "Hall of Fame",
  ];

  const getQuestion = async () => {
    setQuestionloading(true);
    try {
      const response = await axios.get("/api/user/idp-questions");
      if (response.status === 200) {
        setQuestion(response?.data?.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setQuestionloading(false);
    }
  };


  const getSkills = async () => {
    setloadingSkills(true);
    try {
      const response = await axios.get(
        "/api/user/get-user-transferable-skills"
      );
      if (response.status === 200) {
        setSkills(response?.data?.data);
        setFilteredskills(response?.data?.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setloadingSkills(false);
    }
  };

  const getfavcareer = async () => {
    setCareerloading(true);
    try {
      const response = await axios.get("/api/user/my-favorite-careers");

      setcarrerData(response?.data?.data);
      setFilteredcareer(response?.data?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setCareerloading(false);
    }
  };

  useEffect(() => {
    let filtered = skills;

    if (skillQuery) {
      filtered = filtered.filter((item) => {
        let title = "";

        if (item?.athlete) {
          title = item?.athlete?.title;
        }
        if (item?.favorite_middle_school_subject) {
          title = item?.favorite_middle_school_subject?.title;
        }
        if (item?.favorite_hobby1) {
          title = item?.favorite_hobby1?.title;
        }
        if (item?.favorite_hobby2) {
          title = item?.favorite_hobby2?.title;
        }
        if (item?.rank) {
          title = item?.rank?.title;
        }

        title = title ? title.toLowerCase().trim() : "";

        const query = skillQuery.toLowerCase().trim();

        return title && title.includes(query);
      });
    }

    setFilteredskills(filtered);
  }, [skillQuery, skills]);

  useEffect(() => {
    let filtered = carrerData;

    if (searchQuery) {
      filtered = filtered.filter((recommendation) => {
        return recommendation.careers.some((carrer) => {
          const careerName = carrer.career_name.toLowerCase().trim();
          const query = searchQuery.toLowerCase().trim();

          return careerName.includes(query);
        });
      });
    }

    setFilteredcareer(filtered);
  }, [searchQuery, carrerData]);

  useEffect(() => {
    getQuestion();
    getSkills();
    getfavcareer();
  }, []);

  // useEffect(() => {
  //   setPayload([
  //     {
  //       questionId: QuestionID[0],
  //       answer: selectedSkills || null,
  //     },
  //     {
  //       questionId: QuestionID[1],
  //       answer: selectedCareer || null,
  //     },
  //     {
  //       questionId: QuestionID[2],
  //       answer: gameTime || null,
  //     },
  //     {
  //       questionId: QuestionID[3],
  //       answer: linkdInprofile || null,
  //     },
  //     {
  //       questionId: QuestionID[4],
  //       answer: championAward || null,
  //     },
  //   ]);
  // }, [  ]);

  // console.log(payLoad, "payloadpayload");

  // const handleFormSubmit = async () => {
  //   setFormLoading(true);
  //   try {
  //     const response = await axios.post(
  //       "/api/user/update-idp-form",
  //       payLoad[step - 1]
  //     );
  //     if (response.status === 200) {
  //       SuccessToast(response?.data?.message);
  //       getMyIdp();
  //     }
  //   } catch (error) {
  //     ErrorToast(error?.response?.data?.message);
  //   } finally {
  //     setFormLoading(false);
  //   }
  // };

  return (
    showModal && (
      <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-4xl relative">
          <div
            onClick={() => setFormOpen(false)}
            className="flex justify-end cursor-pointer"
          >
            <RxCross2 />
          </div>
          <div className="flex items-center justify-between w-full px-4 md:px-10">
            {sections.map((label, index) => (
              <div
                key={index}
                className="flex-1 relative flex flex-col items-center"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-transform duration-300 transform ${
                    index + 1 === step ? "animate-pop" : ""
                  } ${
                    index + 1 < step
                      ? "bg-gradient-to-r from-[#012C57] to-[#061523] text-white"
                      : index + 1 === step
                      ? "bg-[#56EC17] text-[#012C57]"
                      : "bg-[#969696] text-white"
                  }`}
                >
                  {index + 1}
                </div>

                <p
                  className={`text-xs mt-2 font-medium text-center ${
                    index + 1 < step
                      ? "text-[#012C57]"
                      : index + 1 === step
                      ? "text-[#061523]"
                      : "text-[#969696]"
                  }`}
                >
                  {label}
                </p>

                {index < sections.length - 1 && (
                  <div
                    className={`absolute top-6 left-14 h-0.5 ${
                      index + 1 < step
                        ? "bg-gradient-to-r from-[#012C57] to-[#061523]"
                        : "bg-[#969696]"
                    }`}
                    style={{ width: "100%" }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className=" flex justify-center items-center">
            <div className="w-[540px]">
              <div className="mt-4 relative">
                {step === 1 && (
                  <div className="animate-fade-in">
                    <StepOne
                      question={Questions[0]}
                      nextStep={nextStep}
                      handleModalClose={handleModalClose}
                      imageFaded={imageFaded}
                      modalOpen={modalOpen}
                      skills={filteredskills}
                      setModalOpen={setModalOpen}
                      selectedSkills={selectedSkills}
                      setSelectedSkills={setSelectedSkills}
                      questionId={QuestionID[0]}
                      getMyIdp={getMyIdp}
                      cardData={cardData}
                      idpData={idpData}
                 
                    />
                  </div>
                )}
                {step === 2 && (
                  <div className="animate-fade-in">
                    <StepTwo
                      question={Questions[1]}
                      nextStep={nextStep}
                      prevStep={prevStep}
                      handleModalClose={handleModalClose}
                      imageFaded={imageFaded}
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                      selectedCareer={selectedCareer}
                      carrer={filteredcareer}
                      setSelectedCareer={setSelectedCareer}
                      questionId={QuestionID[1]}
                      getMyIdp={getMyIdp}
                      cardData={cardData}
                    />
                  </div>
                )}
                {step === 3 && (
                  <div className="animate-fade-in">
                    <StepThree
                      gameTime={gameTime}
                      setGameTime={setGameTime}
                      question={Questions[2]}
                      nextStep={nextStep}
                      prevStep={prevStep}
                      handleModalClose={handleModalClose}
                      imageFaded={imageFaded}
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                      questionId={QuestionID[2]}
                      getMyIdp={getMyIdp}
                      cardData={cardData}
                    />
                  </div>
                )}
                {step === 4 && (
                  <div className="animate-fade-in">
                    <StepFour
                      linkdInprofile={linkdInprofile}
                      setLinkdInprofile={setLinkdInprofile}
                      question={Questions[3]}
                      nextStep={nextStep}
                      prevStep={prevStep}
                      handleModalClose={handleModalClose}
                      imageFaded={imageFaded}
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                      questionId={QuestionID[3]}
                      getMyIdp={getMyIdp}
                      cardData={cardData}
                    />
                  </div>
                )}
                {step === 5 && (
                  <div className="animate-fade-in">
                    <StepFive
                      championAward={championAward}
                      setChampionAward={setChampionAward}
                      question={Questions[4]}
                      prevStep={prevStep}
                      handleModalClose={handleModalClose}
                      imageFaded={imageFaded}
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                      setFormOpen={setFormOpen}
                      setImageFaded={setImageFaded}
                      questionId={QuestionID[4]}
                      getMyIdp={getMyIdp}
                      cardData={cardData}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AwardForm;
