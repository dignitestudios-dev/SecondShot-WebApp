import React, { useState } from "react";
import { ChampionAward, Downloadimg, Printimg } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { useFormik } from "formik";
import { stepFiveAward } from "../../Schema/awardSchema";
import CongratsModal from "./CongratsModal";

const StepFive = ({
  prevStep,
  imageFaded,
  modalOpen,
  setModalOpen,
  setFormOpen,
  setImageFaded
}) => {
  const [hideBtn, setHideBtn] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        ChampionAward: "",
      },
      validationSchema: stepFiveAward,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        console.log("Selected carreroption:", values.ChampionAward);
        if (hideBtn === true) {
          setFormOpen(false);
        } else {
          setModalOpen(true);
          setImageFaded(true)
        }
      },
    });
  return (
    <div>
      <div className="mt-10  px-4">
        <div className="flex justify-center items-center">
          <img
            src={ChampionAward}
            className={`w-[90px] h-[85.63px] transition-opacity duration-500 ${
              imageFaded ? "opacity-100" : "opacity-20"
            }`}
            alt=""
          />
        </div>
        <h2 className="text-[32px] text-center font-semibold text-[#012C57] ">
          Outstanding and Significant
        </h2>
        <p className="text-[16px] text-center text-[#00000080] mb-3 mt-2">
          Creating a Statement of Focus
        </p>
        <label
          htmlFor=""
          className="text-[14px] text-start font-[500] text-[#181818] mb-3 mt-3"
        >
          Write a clear, focused statement about yourself and who you are to
          become. Use transferable skills, summarize college and career goals
          and how you plan to achieve them.
        </label>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <input
              id="ChampionAward"
              name="ChampionAward"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.ChampionAward}
              type="text"
              className="w-full border rounded-[12px] p-2 h-[49px]  mb-2  mt-2 text-sm"
              placeholder="Write your asnwer here"
            />
            {errors.ChampionAward && touched.ChampionAward && (
              <p className="text-red-500 text-sm mb-2">
                {errors.ChampionAward}
              </p>
            )}
          </div>

          <div>
            <AuthSubmitBtn
              text={`${hideBtn ? "Close" : "Submit"}`}
              type={"submit"}
            />
          </div>
        </form>
        <div className="flex justify-center items-center mt-3">
          <button
            onClick={() => prevStep()}
            className="flex font-[600] text-[12px] gap-1 items-center"
          >
            <IoIosArrowBack size={12} />
            Back
          </button>
        </div>
        {hideBtn && (
          <div className="flex mt-10 justify-center animate-fade-in">
            <div className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer">
              <img
                className="w-[27.61px] h-[23px] "
                src={Printimg}
                title="Print Resume"
              />
            </div>
            <div className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer">
              <img
                className="w-[12px] h-[18.38px] "
                src={Downloadimg}
                title="Download"
              />
            </div>

            <div className="w-[189px]">
              <AuthSubmitBtn text={"Email It To Yourself"} />
            </div>
          </div>
        )}
      </div>
      <CongratsModal
        img={ChampionAward}
        showModal={modalOpen}
        heading={"Congratulations!"}
        para={
          "Second Shot has awarded Sanethia Thomas the Hall of Fame Award for completing her Individual Development Plan."
        }
        handleClick={() => {
          setModalOpen(false);
          setHideBtn(true);
        }}
        onclick={() => setModalOpen(false)}
      />
    </div>
  );
};

export default StepFive;
