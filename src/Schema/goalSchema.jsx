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
  fullname: Yup.string()
    .min(3, "Full name must be at least 3 characters.")
    .max(50, "Full name can't exceed 50 characters.")
    .required("Please enter your full name"),

  email: Yup.string()
    .email("Email must be valid.")
    .required("Please enter your email"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits.")
    .required("Please enter your phone number"),
});
