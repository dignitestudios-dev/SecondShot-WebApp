import * as Yup from "yup";

export const otpEmailSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be exactly 6 digits.")
    .matches(/^[0-9]+$/, "OTP can only contain numeric values.")
    .required("Please enter the OTP"),
});
