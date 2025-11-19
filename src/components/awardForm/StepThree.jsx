import React, { useContext, useEffect, useState } from "react";
import { GameTime, PlaybookAward } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import CongratsModal from "./CongratsModal";
import { stepThreeAward } from "../../Schema/awardSchema";
import { useFormik } from "formik";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../toaster/ToasterContainer";
import { AuthContext } from "../../context/AuthContext";
const StepThree = ({
  nextStep,
  prevStep,
  handleModalClose,
  imageFaded,
  modalOpen,
  setModalOpen,
  question,
  gameTime,
  setGameTime,
  questionId,
  getMyIdp,
  cardData,
  idpData,
}) => {
  const [loading, setLoading] = useState(false);
  const { profilename } = useContext(AuthContext);
  const [tags, setTags] = useState([]);

  const handleTagInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = e.target.value.trim();

      if (!newTag) return;

      if (tags.length >= 3) {
        ErrorToast("You can only add 3 items!");
        return;
      }

      setTags([...tags, newTag]);
      e.target.value = "";
    }
  };

  useEffect(() => {
    console.log("Tags array:", tags);
  }, [tags]);

 const { values, handleSubmit } = useFormik({
  initialValues: {
    gameTime: cardData?.[2] || "",
  },
  enableReinitialize: true,
  onSubmit: async () => {
    if (tags.length !== 3) {
      ErrorToast("Please enter exactly 3 items!");
      return;
    }

    console.log("Final Tags Submitted:", tags);

    setGameTime(tags);
    setLoading(true);

    try {
      const response = await axios.post("/api/user/update-idp-form", {
        questionId,
        answer: tags,
      });

      if (response.status === 200) {
        SuccessToast(response?.data?.message);
        setModalOpen(true);
        getMyIdp();
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  },
});

  return (
    <div>
      <div className="mt-10  px-4">
        <div className="flex justify-center items-center">
          <img
            src={PlaybookAward}
            className={`w-[90px] h-[85.63px] transition-opacity duration-500 ${
              idpData?.data?.[2]?.answer?.length > 0
                ? "opacity-100"
                : "opacity-20"
            }`}
            alt=""
          />
        </div>
        <h2 className="text-[32px] text-center font-semibold text-[#012C57] ">
          Most Valuable Player
        </h2>
        <p className="text-[16px] text-center text-[#00000080] mb-3 mt-2">
          Selecting a College, Trade School, or Company to research or apply to.
        </p>
        <label
          htmlFor=""
          className="text-[14px] text-start font-[500] text-[#181818] mb-3 mt-3"
        >
          {question}
        </label>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <div className="border rounded-[12px] p-2 min-h-[49px] flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-[#012C57] text-white rounded-full text-xs flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() =>
                      setTags(tags.filter((_, index) => index !== i))
                    }
                    className="font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}

              {tags.length < 3 && (
                <input
                  type="text"
                  placeholder="Type & Press Enter"
                  onKeyDown={handleTagInput}
                  className="outline-none text-sm flex-1 min-w-[120px]"
                  maxLength={50}
                />
              )}
            </div>
          </div>

          <div className="mt-3">
            <AuthSubmitBtn text={"Submit"} loading={loading} type={"submit"} />
          </div>
        </form>
        <button
          onClick={() => nextStep()}
          className="w-full py-2 mt-2 bg-[#E5EAED] h-[49px] text-[#012C57] rounded-[12px] font-medium"
        >
          Skip
        </button>
        <div className="flex justify-center items-center mt-3">
          <button
            onClick={() => prevStep()}
            className="flex font-[600] text-[12px] gap-1 items-center"
          >
            <IoIosArrowBack size={12} />
            Back
          </button>
        </div>
      </div>
      <CongratsModal
        img={PlaybookAward}
        showModal={modalOpen}
        heading={"Congratulations!"}
        para={`Second Shot has awarded ${profilename} the Game Time Award for selecting the ${values.gameTime} to further research and apply. Congratulations!`}
        handleClick={handleModalClose}
        onclick={() => setModalOpen(false)}
      />
    </div>
  );
};

export default StepThree;
