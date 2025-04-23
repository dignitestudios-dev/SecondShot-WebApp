import * as Yup from "yup";


export const stepOneAward = Yup.object({
  skilloption: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one skill.")
    .max(5, "You can select a maximum of 5 skills.")
    .required("Skills are required."),
});

export const stepTwoAward = Yup.object({
    carreroption: Yup.string().required("Please select a field."),
});
export const stepThreeAward = Yup.object({
   gameTime: Yup.string().required("Please Enter a field."),
});
export const stepFourAward = Yup.object({
    linkdInprofile: Yup.string().required("Please Enter a field."),
});
export const stepFiveAward = Yup.object({
    ChampionAward: Yup.string().required("Please Enter a field."),
});
