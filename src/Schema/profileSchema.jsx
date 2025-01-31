import * as Yup from "yup";

export const profileSchema = Yup.object({
  country: Yup.string().required("Please select your city."),

  state: Yup.string().required("Please select your state."),

  address: Yup.string().required("Please enter your address."),
  profilePicture: Yup.mixed()
    .required("Profile picture is required")
    .test(
      "fileType",
      "Only PNG, JPEG, and JPG formats are allowed",
      (value) =>
        !value ||
        (value && ["image/png", "image/jpeg", "image/jpg"].includes(value.type))
    ),
});

export const EditProfileSchema = Yup.object({
  fullname: Yup.string().required("Please enter your fullname."),
  country: Yup.string().required("Please select your city."),

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
    .min(6, "Password must contain at least 6 alphanumeric characters.")
    .required("Please enter your old password"),

  newpassword: Yup.string()
    .min(6, "Password must contain at least 6 alphanumeric characters.")
    .required("Please enter your new password"),

  Cnewpassword: Yup.string()
    .oneOf([Yup.ref("newpassword"), null], "Passwords must match.")
    .required("Please confirm your new password"),
});
