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
  cardData

}) => {

  const [loading, setLoading] = useState(false);
  const{ profilename} =useContext(AuthContext)

  
  
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        gameTime: cardData?.[2] || '', // use cardData[2] directly
      },
      enableReinitialize: true,
      validationSchema: stepThreeAward,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        setGameTime(values.gameTime);
        setLoading(true)
        try {
          const response = await axios.post("/api/user/update-idp-form", {
            questionId: questionId,
            answer:values.gameTime,
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
              imageFaded ? "opacity-100" : "opacity-20"
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
            <input
              id="gameTime"
              name="gameTime"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gameTime}
              type="text"
              className="w-full border rounded-[12px] p-2 h-[49px]  mb-2  mt-2 text-sm"
              placeholder="Enter your answer here"
              maxLength={50}
            />
            {errors.gameTime && touched.gameTime && (
              <p className="text-red-500 text-sm mb-2">{errors.gameTime}</p>
            )}
          </div>

          <div>
            <AuthSubmitBtn text={"Submit"} loading={loading} type={'submit'} />
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
        para={
          `Second Shot has awarded ${profilename} the Game Time Award for selecting the ${values.gameTime} to further research and apply. Congratulations!`
        }
        handleClick={handleModalClose}
        onclick={() => setModalOpen(false)}
      />
    </div>
  );
};

export default StepThree;
