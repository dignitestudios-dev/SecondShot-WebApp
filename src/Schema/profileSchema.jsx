import * as Yup from "yup";

export const profileSchema = Yup.object({
  country: Yup.string().required("Please select your city."),

  state: Yup.string().required("Please select your state."),

  // address: Yup.string().required("Please enter your address."),
  // profilePicture: Yup.mixed()
  //   .required("Profile picture is required")
  //   .test(
  //     "fileType",
  //     "Only PNG, JPEG, and JPG formats are allowed",
  //     (value) =>
  //       !value ||
  //       (value && ["image/png", "image/jpeg", "image/jpg"].includes(value.type))
  //   ),
});

export const EditProfileSchema = Yup.object({
  fullname: Yup.string().required("Please enter your fullname."),
  city: Yup.string().required("Please select your city."),

  state: Yup.string().required("Please select your state."),

  address: Yup.string().required("Please enter your address."),
  profilePicture: Yup.mixed()
    .notRequired("Profile picture is required")
    .test(
      "fileType",
      "Only PNG, JPEG, and JPG formats are allowed",
      (value) =>
        !value ||
        (value && ["image/png", "image/jpeg", "image/jpg"].includes(value.type))
    ),
});

export const ChangePassword = Yup.object({
  oldpassword: Yup.string()
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
  newpassword: Yup.string()
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

  Cnewpassword: Yup.string()
    .oneOf([Yup.ref("newpassword"), null], "Passwords must match.")
    .required("Please confirm your new password"),
});
