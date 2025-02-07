import * as Yup from "yup";

export const goalSchema = Yup.object().shape({
  main_goal_name: Yup.string().required("Main goal is required"),
  startDate: Yup.date().nullable().required("Start date is required"),
  sub_goals: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Sub-goal name is required"),
        deadline: Yup.date().nullable().required("Deadline is required"),
      })
    )
    .when("$showSubGoal", {
      is: true,
      then: (schema) => schema.min(1, "At least one sub-goal is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const supportPeopleSchema = Yup.object({
  fullname: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email Address is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  isSecond: Yup.boolean()
    .required("This field is required.")
    .default(false), // Defaults to false if not provided
  fullname_2: Yup.string().when("isSecond", {
    is: true, // Only validate if isSecond is true
    then: Yup.string().required("Full Name is required for 2nd person"),
    otherwise: Yup.string().notRequired(), // Not required if isSecond is false
  }),
  email_2: Yup.string().when("isSecond", {
    is: true, // Only validate if isSecond is true
    then: Yup.string()
      .email("Invalid email format")
      .required("Email Address is required for 2nd person"),
    otherwise: Yup.string().notRequired(), // Not required if isSecond is false
  }),
  phone_2: Yup.string().when("isSecond", {
    is: true, // Only validate if isSecond is true
    then: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required for 2nd person"),
    otherwise: Yup.string().notRequired(), // Not required if isSecond is false
  }),
});