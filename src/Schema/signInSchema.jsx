import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Email must be valid.")
    .required("Please enter your email"),

  password: Yup.string()
  .required("Please enter your password"),
});

export const forgetSchema = Yup.object({
  email: Yup.string()
    .email("Email must be valid.")
    .required("Please enter your email"),
});

export const resetSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must contain at least 6 alphanumeric characters.")
    .required("Please enter your new password"),

  Cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Please confirm your new password"),
});
