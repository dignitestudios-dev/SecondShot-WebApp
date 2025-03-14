import * as Yup from "yup";

export const accessCodeSchema = Yup.object({
  accesscode: Yup.string().required("Please enter your access code."),
});
