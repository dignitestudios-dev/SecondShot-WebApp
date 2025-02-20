import * as Yup from "yup";

export const signUpSchema = Yup.object({
  fullname: Yup.string()
    .min(3, "Full name must be at least 3 characters.")
    .max(30, "Full name can't exceed 30 characters.")

    .required("Please enter your full name"),

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

    phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits.")  
    .required("Please enter your phone number"),

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
    .required("Please confirm your password"),
});
