import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Email must be valid.")
    .required("Please enter your email"),

  password: Yup.string()
    .min(6, "Password must contain at least 6 alphanumeric characters.")
    .required("Please enter your password"),
});