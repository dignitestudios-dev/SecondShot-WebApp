import React, { useContext, useState } from "react";
import {
  ChampionAward,
  Downloadimg,
  FameAward,
  Printimg,
} from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { useFormik } from "formik";
import { stepFiveAward } from "../../Schema/awardSchema";
import CongratsModal from "./CongratsModal";
import { ErrorToast, SuccessToast } from "../toaster/ToasterContainer";
import axios from "../../axios";
import { AuthContext } from "../../context/AuthContext";
const StepFive = ({
  prevStep,
  imageFaded,
  modalOpen,
  setModalOpen,
  setFormOpen,
  setImageFaded,
  question,
  championAward,
  setChampionAward,
  questionId,
  getMyIdp,
  cardData,
  idpData
}) => {
  
  const [loading, setLoading] = useState(false);
  const{ profilename} =useContext(AuthContext)

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        ChampionAward: cardData[4] || "",
      },
      validationSchema: stepFiveAward,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        setChampionAward(values.ChampionAward);
        setLoading(true)
        try {
          const response = await axios.post("/api/user/update-idp-form", {
            questionId: questionId,
            answer:values.ChampionAward,
          });
          if (response.status === 200) {
            SuccessToast(response?.data?.message);
            setModalOpen(true);
            setImageFaded(true);
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
            src={FameAward}
            className={`w-[90px] h-[85.63px] transition-opacity duration-500 ${
              idpData?.data?.[4]?.answer?.length > 0 ? "opacity-100" : "opacity-20"
            }`}
            alt=""
          />
        </div>
        <h2 className="text-[32px] text-center font-semibold text-[#012C57] ">
          The GOAT
        </h2>
        <p className="text-[16px] text-center text-[#00000080] mb-3 mt-2">
          Creating a Statement of Focus
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
              id="ChampionAward"
              name="ChampionAward"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.ChampionAward}
              type="text"
              className="w-full border rounded-[12px] p-2 h-[49px]  mb-2  mt-2 text-sm"
              placeholder="Write your asnwer here"
              maxLength={50}
            />
            {errors.ChampionAward && touched.ChampionAward && (
              <p className="text-red-500 text-sm mb-2">
                {errors.ChampionAward}
              </p>
            )}
          </div>

          <div>
            <AuthSubmitBtn
              text={"Submit"}
              type={"submit"}
              loading={loading}
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
        {/* {hideBtn && (
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
        )} */}
      </div>
      <CongratsModal
        img={FameAward}
        showModal={modalOpen}
        heading={"Congratulations!"}
        para={
          `Second Shot has awarded ${profilename} the Hall of Fame Award for completing her Individual Development Plan. Congratulations!`
        }
        handleClick={() => {
          setModalOpen(false);
          setFormOpen(false);
        }}
        onclick={() => setFormOpen(false)}
      />
    </div>
  );
};

export default StepFive;
