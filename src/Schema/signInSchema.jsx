import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .test(
      "email-at-symbol",
      "Email address must contain '@' symbol.",
      (value) => {
        return value && value.includes("@");
      }
    )
    .test(
      "email-single-at",
      "Email address must contain only one '@' symbol.",
      (value) => {
        return value && value.indexOf("@") === value.lastIndexOf("@");
      }
    )
    .email("Email must be valid.")
    .required("Please enter your email"),

  password: Yup.string().required("Please enter your password"),
});

export const forgetSchema = Yup.object({
  email: Yup.string()
    .email("Email must be valid.")
    .required("Please enter your email"),
});

export const resetSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .max(50, "Password must not exceed 50 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/\d/, "Password must contain at least one number.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one @ special character."
    )
    .matches(/^[^\s]*$/, "Password should not contain spaces.")
    .trim()
    .required("Please enter your password"),

  Cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Please confirm your new password"),
});
