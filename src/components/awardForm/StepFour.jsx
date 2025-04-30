import React, { useState } from "react";
import { ChampionAward, FameAward } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { useFormik } from "formik";
import { stepFourAward } from "../../Schema/awardSchema";
import CongratsModal from "./CongratsModal";
import { ErrorToast, SuccessToast } from "../toaster/ToasterContainer";
import axios from "../../axios";
const StepFour = ({
  nextStep,
  prevStep,
  handleModalClose,
  imageFaded,
  modalOpen,
  setModalOpen,
  question,
  setLinkdInprofile,
  linkdInprofile,
  questionId,
  getMyIdp,
  cardData
}) => {

  
    const [loading, setLoading] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
    
      initialValues: {
        linkdInprofile:cardData[3] || '',
      },
      validationSchema: stepFourAward,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        setLinkdInprofile(values.linkdInprofile);
        setLoading(true)
        try {
          const response = await axios.post("/api/user/update-idp-form", {
            questionId: questionId,
            answer:values.linkdInprofile,
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
            src={ChampionAward}
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
         {question}
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
              maxLength={50}
            />
            {errors.linkdInprofile && touched.linkdInprofile && (
              <p className="text-red-500 text-sm mb-2">
                {errors.linkdInprofile}
              </p>
            )}
          </div>
          <div>
            <AuthSubmitBtn text={"Submit"} type={"submit"}  loading={loading}/>
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
        img={ChampionAward}
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
