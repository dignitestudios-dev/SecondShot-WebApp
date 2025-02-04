import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthInput from "../onboarding/AuthInput";
import { Calender } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import CustomCalendar from "../calendar/Calender";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import { goalValues } from "../../data/gola";
import { goalSchema } from "../../Schema/goalSchema";
const CreateGoalModal = ({ showModal, handleClick, handleClose }) => {
  const navigate = useNavigate();
  const [isPeople, setIsPeople] = useState(false);
  const [loading, setloading] = useState(false);

  const [showCalender, setShowCalender] = useState(false);
  const [showSubGoal, setShowSubGoal] = useState(false);
  const formik = useFormik({
    initialValues: goalValues,
    validationSchema: goalSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log(values, "Goal Vlaues");
    },
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  const handleNavigation = () => {
    setIsPeople(false);
    navigate("/make-smart");
  };
  return (
    showModal && (
      <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-80 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-lg w-[450px] h-auto overflow-auto p-6 relative">
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <button
                className="absolute top-0 right-2 text-xl text-gray-500 hover:text-gray-600"
                onClick={handleClick}
              >
                &times;
              </button>
              {
                <div>
                  <div className="flex justify-center mt-3">
                    <div>
                      <h2 className="text-[24px] text-center font-semibold">
                        Create Goal
                      </h2>
                    </div>
                  </div>
                  <div className="pt-4">
                    <AuthInput
                      text={"Goal"}
                      placeholder={"Write your main goal here"}
                      value={values.main_goal_name}
                      id={"main_goal_name"}
                      name={"main_goal_name"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.main_goal_name}
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-[14px] font-[500] m-1">Time-Bound</p>
                    <div className="text-xs p-3 rounded-lg bg-[#F5F5F5] text=[#5C5C5C] flex justify-between items-center">
                      <div>
                        <p className="font-[500] text-[16px] py-1">
                          Set a deadline for achieving your main goal!
                        </p>
                        <p className="text-[16px] mt-1 font-[400] text-[#767676] pb-1">
                          {values.startDate
                            ? values.startDate.toLocaleDateString()
                            : "No date selected"}
                        </p>
                      </div>
                      <div>
                        <span
                          className=" cursor-pointer"
                          onClick={() => setShowCalender((prev) => !prev)}
                        >
                          <img className="w-[24px]" src={Calender} />
                        </span>
                        {showCalender && (
                          <div className="">
                            <CustomCalendar
                              startDate={values.startDate}
                              setStartDate={(date) =>
                                setFieldValue("startDate", date)
                              }
                              setShowCalender={setShowCalender}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {errors.startDate && touched.startDate && (
                      <p className="text-red-500 text-xs">{errors.startDate}</p>
                    )}
                  </div>

                  {showSubGoal && values.isOpen && (
                    <div className="mt-4">
                      <FieldArray name="sub_goals">
                        {({ push, remove }) => (
                          <div>
                            {values.sub_goals.map((subGoal, index) => (
                              <div key={index} className="pt-2">
                                <div className="w-full flex justify-between items-center">
                                  <label className="text-[14px] text-[#181818] font-[500]">
                                    Sub-goal {index + 1}
                                  </label>

                                  {values.sub_goals.length > 1 && (
                                    <button
                                      type="button"
                                      className="text-red-500 text-[12px] underline"
                                      onClick={() => remove(index)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>

                                <AuthInput
                                  placeholder={"Write your sub goal here"}
                                  name={`sub_goals[${index}].name`}
                                  value={values.sub_goals[index].name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    touched.sub_goals?.[index]?.name &&
                                    errors.sub_goals?.[index]?.name
                                      ? errors.sub_goals[index].name
                                      : ""
                                  }
                                />

                                <AuthInput
                                  placeholder={"Set sub-goal deadline"}
                                  name={`sub_goals[${index}].deadline`}
                                  value={values.sub_goals[index].deadline}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    touched.sub_goals?.[index]?.deadline &&
                                    errors.sub_goals?.[index]?.deadline
                                      ? errors.sub_goals[index].deadline
                                      : ""
                                  }
                                />
                              </div>
                            ))}

                            <button
                              type="button"
                              className="text-[#012C57] cursor-pointer underline font-[500] text-[12px] leading-[13.31px] mt-2"
                              onClick={() => push({ name: "", deadline: "" })}
                            >
                              + Add More
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  )}

                  <button
                    onClick={handleNavigation}
                    className="w-full  bg-[#E5EAED] font-[500] capitalize text-[#012C57] py-2 my-2 rounded-[8px] h-[49px] hover:bg-[#d0d5d8]"
                  >
                    Make it S.M.A.R.T (optional)
                  </button>
                  <div>
                    <AuthSubmitBtn
                      text={"Add Sub Goals (Optional)"}
                      handleSubmit={() => setShowSubGoal((prev) => !prev)}
                    />
                  </div>
                  <div className="mt-2">
                    <AuthSubmitBtn
                      text={"Submit Your Goal"}
                      // handleSubmit={handleClose}
                      type={"submit"}
                    />
                  </div>
                </div>
              }
            </Form>
          </FormikProvider>
        </div>
      </div>
    )
  );
};

export default CreateGoalModal;
