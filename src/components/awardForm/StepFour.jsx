import React from "react";
import { FameAward } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { useFormik } from "formik";
import { stepFourAward } from "../../Schema/awardSchema";
import CongratsModal from "./CongratsModal";

const StepFour = ({
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
        linkdInprofile: "",
      },
      validationSchema: stepFourAward,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        console.log("Selected carreroption:", values.linkdInprofile);
        setModalOpen(true);
      },
    });
  return (
    <div>
      <div className="mt-10  px-4">
        <div className="flex justify-center items-center">
          <img
            src={FameAward}
            className={`w-[90px] h-[85.63px] transition-opacity duration-500 ${
                imageFaded ? "opacity-100" : "opacity-20"
              }`}
            alt=""
          />
        </div>
        <h2 className="text-[32px] text-center font-semibold text-[#012C57] ">
          Undefeated
        </h2>
        <p className="text-[16px] text-center text-[#00000080] mb-3 mt-2">
          Creating a LinkedIn Profile
        </p>
        <label
          htmlFor=""
          className="text-[14px] text-start font-[500] text-[#181818] mb-3 mt-3"
        >
          Create a LinkedIn Profile 
        </label>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <input
              id="linkdInprofile"
              name="linkdInprofile"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.linkdInprofile}
              type="text"
              className="w-full border rounded-[12px] p-2 h-[49px]  mb-2  mt-2 text-sm"
              placeholder="Lorem ipsum dolor sit amet consectetur."
            />
            {errors.linkdInprofile && touched.linkdInprofile && (
              <p className="text-red-500 text-sm mb-2">
                {errors.linkdInprofile}
              </p>
            )}
          </div>
          <div>
            <AuthSubmitBtn text={"Submit"} type={"submit"} />
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
        img={FameAward}
        showModal={modalOpen}
        heading={"Congratulations!"}
        para={
          "Second Shot has awarded Sanethia Thomas the Career Champion Award for completing her LinkedIn Profile. "
        }
        handleClick={handleModalClose}
        onclick={() => setModalOpen(false)}
      />
    </div>
  );
};

export default StepFour;
