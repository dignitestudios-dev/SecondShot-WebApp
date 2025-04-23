import React from "react";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { PlaybookAward } from "../../assets/export";
import { IoIosArrowBack } from "react-icons/io";
import CongratsModal from "./CongratsModal";
import { useFormik } from "formik";
import { stepTwoAward } from "../../Schema/awardSchema";

const StepTwo = ({
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
        carreroption: "",
      },
      validationSchema: stepTwoAward,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        console.log("Selected carreroption:", values.carreroption);
        setModalOpen(true);
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
          Learning the Plays
        </h2>
        <p className="text-[16px] text-center text-[#00000080] mb-2">
          Exploring Career Choices
        </p>
        <form onSubmit={handleSubmit}>
          <label className="text-[14px] font-[500] text-[#181818]   ">
            Research and narrow down 1-2 potential career paths that align with
            strengths and passions.
          </label>
          <select
            name="carreroption"
            value={values.carreroption}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border rounded-[12px] p-2 h-[49px] mb-1 mt-2 text-sm"
          >
            <option value="">Select career path</option>
            <option value="communication">Communication</option>
            <option value="leadership">Leadership</option>
            <option value="problemSolving">Problem Solving</option>
            <option value="teamwork">Teamwork</option>
          </select>
          {errors.carreroption && touched.carreroption && (
            <p className="text-red-500 text-sm mb-2">{errors.carreroption}</p>
          )}
          <div className="mt-3">
            <AuthSubmitBtn text="Submit" type="submit" />
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
          "Second Shot has awarded Sanethia Thomas the Playbook Pro Award for identifying her top Career Choice: Computer Science."
        }
        handleClick={handleModalClose}
        onclick={() => setModalOpen(false)}
      />
    </div>
  );
};

export default StepTwo;
