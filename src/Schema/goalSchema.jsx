import * as Yup from "yup";

export const goalSchema = Yup.object().shape({
  main_goal_name: Yup.string()
    .min(3, "Goal name must be at least 3 characters long")
    .required("Main goal name is required"),
  isOpen: Yup.boolean().required(),
  deadline: Yup.date()
    .min(new Date(), "Deadline must be a future date")
    .required("Deadline is required"),
  startDate: Yup.date().required("Please select a start date"),

  // Conditional sub_goals validation based on isOpen
  sub_goals: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Sub-goal name is required"),
        deadline: Yup.date().required("Sub-goal deadline is required"),
      })
    )
    .when("isOpen", {
      is: true,
      then: (schema) =>
        schema
          .min(1, "At least one sub-goal is required")
          .required("Sub-goals are required when isOpen is true"),
      otherwise: (schema) => schema.notRequired(),
    }),

  support_people: Yup.array().of(
    Yup.object().shape({
      full_name: Yup.string().required("Full name is required"),
      email_address: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone_number: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
        .required("Phone number is required"),
    })
  ),
});
