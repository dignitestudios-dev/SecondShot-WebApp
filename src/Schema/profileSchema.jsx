import * as Yup from "yup";

export const profileSchema = Yup.object({
  firstname: Yup.string()
    .min(3, "First name must be at least 3 characters.")
    .max(50, "First name can't exceed 50 characters.")
    .required("Please enter your first name"),
  lastname: Yup.string()
    .min(3, "Last name must be at least 3 characters.")
    .max(50, "Last name can't exceed 50 characters.")
    .required("Please enter your last name"),

  email: Yup.string()
    .email("Email must be valid.")
    .required("Please enter your email."),

  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits.")
    .required("Please enter your phone number"),

  country: Yup.string().required("Please select your country."),

  state: Yup.string().required("Please select your city."),

  address: Yup.string().required("Please enter your address."),
  profilePicture: Yup.mixed()
    .required("Profile picture is required")
    .test(
      "fileType",
      "Only PNG, JPEG, and JPG formats are allowed",
      (value) =>
        !value || (value && ["image/png", "image/jpeg", "image/jpg"].includes(value.type))
    ),
});
