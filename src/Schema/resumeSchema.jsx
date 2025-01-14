import * as Yup from "yup";

export const informationSchema = Yup.object({
  fullname: Yup.string()
    .min(3, "Full name must be at least 3 characters.")
    .max(50, "Full name can't exceed 50 characters.")
    .required("Please enter your full name"),
  email: Yup.string()
    .email("Email must be valid.")
    .required("Please enter your email"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits.")
    .required("Please enter your phone number"),
});

export const objectiveSchema = Yup.object({
  description: Yup.string().required("Please enter your resume objective"),
});

export const educationSchema = Yup.object({
    eductioninstitute: Yup.string().required("Please enter your resume objective"),
    degree: Yup.string().required("Please enter your resume objective"),
    fieldofstudy: Yup.string().required("Please enter your resume objective"),
    startyear: Yup.string().required("Please enter your resume objective"),
    endyear: Yup.string().required("Please enter your resume objective"),
});
