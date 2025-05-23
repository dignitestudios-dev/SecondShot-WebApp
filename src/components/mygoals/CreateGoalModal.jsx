import React, { useEffect, useState } from "react";
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
  const [showCalenderIndex, setShowCalenderIndex] = useState(null);
  const [showCalender, setShowCalender] = useState(false);
  const [showSubGoal, setShowSubGoal] = useState(false);
  const [formData, setFormData] = useState("");
  const location = useLocation();
  const [isSmart, setIsSmart] = useState(location.state?.isSmart || false);
  const { lastStep } = location.state || {};
  const [threeMonthsAgo, setThreeMonthsAgo] = useState(new Date());
  console.log(lastStep, "lastStep");
  useEffect(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    setThreeMonthsAgo(date);
  }, []);

  const handleDateChange = (date) => {
    setThreeMonthsAgo(date);
    formik.setValues({ ...formik.values, startDate: date });
  };
  const formik = useFormik({
    initialValues: {
      main_goal_name: lastStep || "",
      startDate: threeMonthsAgo,
      sub_goals: [],
    },
    validationSchema: goalSchema,
    validateOnChange: true,
    validateOnBlur: true,
    context: { showSubGoal },
    onSubmit: (values) => {
      console.log(values, "Ss");
      setFormData(values);

      navigate("/review-goals", {
        state: { formData: values, threeMonthsAgo: threeMonthsAgo },
      });
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
    setErrors,
  } = formik;

  const handleNavigation = () => {
    if (!values.main_goal_name) {
      setErrors({ main_goal_name: "Please enter your main goal first" });
      return;
    }
    setIsPeople(false);
    navigate("/make-smart", { state: { inputData: values } });
  };

  useEffect(() => {
    if (showSubGoal && values?.sub_goals?.length === 0) {
      setFieldValue("sub_goals", [{ name: "", deadline: "" }]);
    }
  }, [showSubGoal]);

  useEffect(() => {
    if (lastStep?.timeboundedit) {
      formik.setFieldValue("main_goal_name", lastStep.timeboundedit, false);
    } else if (lastStep?.timebound) {
      formik.setFieldValue("main_goal_name", lastStep.timebound, false);
    }
  }, [lastStep]);
  

  return (
    showModal && (
      <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-80 backdrop-blur-sm">
        <div
          className={`bg-white rounded-lg shadow-lg w-[450px] overflow-auto p-6 relative ${
            showSubGoal ? "h-[700px]" : "h-auto"
          }`}
        >
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <button
                className="absolute top-0 right-2 text-xl text-gray-500 hover:text-gray-600"
                onClick={() => {
                  handleClick();
                  setIsSmart(false);
                }}
              >
                &times;
              </button>
              {
                <div>
                  <div className="flex justify-center mt-3">
                    <div>
                      <h2 className="text-[24px] text-center font-semibold">
                        {isSmart ? "S.M.A.R.T Goal" : "Create Goal"}
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
                      maxLength={250}
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-[14px] font-[500] m-1">Time-Bound</p>
                    <div className="text-xs p-3 rounded-lg bg-[#F5F5F5] text=[#5C5C5C] flex justify-between items-center">
                      <div>
                        <p className="font-[500] text-[16px] py-1">
                          Set a deadline for achieving your main goal!
                        </p>
                        <p className="text-[16px] mt-2 font-[400] text-[#767676] pb-1">
                          {threeMonthsAgo
                            ? threeMonthsAgo.toLocaleDateString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                              })
                            : "No date selected"}
                        </p>
                      </div>
                      <div>
                        <span
                          className="p-2 cursor-pointer"
                          onClick={() => setShowCalender((prev) => !prev)}
                        >
                          <img className="w-[24px]" src={Calender} />
                        </span>
                        {showCalender && (
                          <div>
                            <CustomCalendar
                              startDate={threeMonthsAgo}
                              setStartDate={handleDateChange}
                              setShowCalender={setShowCalender}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {showSubGoal && (
                    <div className="mt-4 h-[250px] overflow-y-auto">
                      <FieldArray name="sub_goals">
                        {({ push, remove }) => (
                          <div>
                            {values.sub_goals.map((subGoal, index) => (
                              <div key={index} className="pt-2">
                                <div className="w-full flex justify-between items-center">
                                  <label className="text-[14px] text-[#181818] font-[500]">
                                    Sub-goal {index + 1}
                                  </label>
                                  <button
                                    type="button"
                                    className="text-red-500 text-[12px] me-5 underline"
                                    onClick={() => {
                                      remove(index);
                                      if (values.sub_goals.length === 1) {
                                        setShowSubGoal(false); // ✅ Jab last sub-goal remove ho jaye to hide kar do
                                      }
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>

                                <AuthInput
                                  placeholder="Write your sub goal here"
                                  name={`sub_goals[${index}].name`}
                                  value={subGoal.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    touched.sub_goals?.[index]?.name &&
                                    errors.sub_goals?.[index]?.name
                                  }
                                  maxLength={250}
                                />

                                <div className="mt-4">
                                  <p className="text-[14px] font-[500] m-1">
                                    Time-Bound
                                  </p>
                                  <div className="text-xs p-3 rounded-lg bg-[#F5F5F5] flex justify-between items-center">
                                    <div>
                                      <p className="font-[500] text-[16px] py-1">
                                        Set a deadline for this sub-goal!
                                      </p>
                                      <p className="text-[16px] mt-2 font-[400] text-[#767676] pb-1">
                                        {subGoal.deadline
                                          ? subGoal.deadline.toLocaleDateString(
                                              "en-US",
                                              {
                                                month: "long",
                                                day: "2-digit",
                                                year: "numeric",
                                              }
                                            )
                                          : "No date selected"}
                                      </p>
                                    </div>
                                    <div>
                                      <span
                                        className="p-2 cursor-pointer"
                                        onClick={() =>
                                          setShowCalenderIndex(
                                            index === showCalenderIndex
                                              ? null
                                              : index
                                          )
                                        }
                                      >
                                        <img
                                          className="w-[24px]"
                                          src={Calender}
                                        />
                                      </span>
                                      {showCalenderIndex === index && (
                                        <div className="absolute z-10">
                                          <CustomCalendar
                                            startDate={subGoal.deadline}
                                            setStartDate={(date) =>
                                              setFieldValue(
                                                `sub_goals[${index}].deadline`,
                                                date
                                              )
                                            }
                                            setShowCalender={() =>
                                              setShowCalenderIndex(null)
                                            }
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {errors.sub_goals?.[index]?.deadline &&
                                    touched.sub_goals?.[index]?.deadline && (
                                      <p className="text-red-500 text-xs">
                                        {errors.sub_goals[index].deadline}
                                      </p>
                                    )}
                                </div>
                              </div>
                            ))}

                            <button
                              type="button"
                              className="text-[#012C57] cursor-pointer underline font-[500] text-[12px] leading-[13.31px] mt-2"
                              onClick={() => push({ name: "", deadline: null })}
                            >
                              + Add More
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  )}

                  {!isSmart && (
                    <button
                      type="button"
                      onClick={handleNavigation}
                      className="w-full bg-[#E5EAED] font-[500] capitalize text-[#012C57] py-2 my-2 rounded-[8px] h-[49px] hover:bg-[#d0d5d8]"
                    >
                      Make it S.M.A.R.T (optional)
                    </button>
                  )}

                  <div className="mt-1">
                    <AuthSubmitBtn
                      text={
                        showSubGoal
                          ? "Hide Sub Goals"
                          : "Add Sub Goals (Optional)"
                      }
                      type={"button"}
                      handleSubmit={() => setShowSubGoal((prev) => !prev)}
                    />
                  </div>
                  <div className="mt-2">
                    <AuthSubmitBtn text={"Submit Your Goal"} type={"submit"} />
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
