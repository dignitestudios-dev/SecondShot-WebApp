import React from "react";
import { GameTime } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import CongratsModal from "./CongratsModal";
import { stepThreeAward } from "../../Schema/awardSchema";
import { useFormik } from "formik";

const StepThree = ({
  nextStep,
  prevStep,
  handleModalClose,
  imageFaded,
  modalOpen,
  setModalOpen,
}) => {
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        gameTime: "",
      },
      validationSchema: stepThreeAward,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        console.log("Selected carreroption:", values.gameTime);
        setModalOpen(true);
      },
    });
  return (
    <div>
      <div className="mt-10  px-4">
        <div className="flex justify-center items-center">
          <img
            src={GameTime}
            className={`w-[90px] h-[85.63px] transition-opacity duration-500 ${
              imageFaded ? "opacity-100" : "opacity-20"
            }`}
            alt=""
          />
        </div>
        <h2 className="text-[32px] text-center font-semibold text-[#012C57] ">
          Ready to Compete
        </h2>
        <p className="text-[16px] text-center text-[#00000080] mb-3 mt-2">
          Selecting a College, Trade School, or Company to research or apply to.
        </p>
        <label
          htmlFor=""
          className="text-[14px] text-start font-[500] text-[#181818] mb-3 mt-3"
        >
          Evaluate and choose a college or program that supports your academic
          goals  /or identify a company that aligns with your career goals.
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
            />
            {errors.gameTime && touched.gameTime && (
              <p className="text-red-500 text-sm mb-2">{errors.gameTime}</p>
            )}
          </div>

          <div>
            <AuthSubmitBtn text={"Submit"} />
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
        img={GameTime}
        showModal={modalOpen}
        heading={"Congratulations!"}
        para={
          "Second Shot has awarded Sanethia Thomas the Game Time Award for selecting the University of Florida to further research and apply."
        }
        handleClick={handleModalClose}
        onclick={() => setModalOpen(false)}
      />
    </div>
  );
};

export default StepThree;
