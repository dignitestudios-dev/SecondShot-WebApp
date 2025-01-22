import * as Yup from "yup";

export const signUpSchema = Yup.object({
  fullname: Yup.string()
    .min(3, "Full name must be at least 3 characters.")
    .max(50, "Full name can't exceed 50 characters.")
    .required("Please enter your full name"),
    
  email: Yup.string()
    .email("Email must be valid.")
    .required("Please enter your email"),

  phoneNumber: Yup.string()
    .matches(
      /^[0-12]{12}$/,
      "Phone number must be exactly 12 digits."
    )
    .required("Please enter your phone number"),

  password: Yup.string()
    .min(6, "Password must contain at least 6 alphanumeric characters.")
    .required("Please enter your password"),

  Cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Please confirm your password"),
});
