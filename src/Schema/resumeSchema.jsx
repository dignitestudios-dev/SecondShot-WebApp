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

export const educationSchema = Yup.object().shape({
  educationList: Yup.array()
    .of(
      Yup.object().shape({
        education: Yup.string().required(
          "Please enter your educational institution"
        ),
        degree: Yup.string().required("Please enter your degree"),
        fieldofStudy: Yup.string().required("Please enter your field of study"),
        startYear: Yup.string().required("Please select a start year"),
        endYear: Yup.string().required("Please select an end year"),
      })
    )
    .required("Education list is required")
    .min(1, "At least one education entry is required"),
});

export const experienceSchema = Yup.object().shape({
  experienceList: Yup.array()
    .of(
      Yup.object().shape({
        jobTitle: Yup.string().required(
          "Please enter your jobtitle institution"
        ),
        company: Yup.string().required("Please enter your degree"),
        startmonth: Yup.string().required("Please select a start month"),
        startyear: Yup.string().required("Please select a start year"),
        endmonth: Yup.string(),
        endyear: Yup.string(),       
        description: Yup.string().required("Please enter description"),
      })
    )
    .required("Experience List required")
    .min(1, "At least one education entry is required"),
});

export const certificationSchema = Yup.object().shape({
  certificationsList: Yup.array()
    .of(
      Yup.object().shape({
        certificationsname: Yup.string().required(
          "Please enter your Certification Name"
        ),
        issuingOrganization: Yup.string().required(
          "Please enter your Issuing Organization"
        ),
        credentialId: Yup.string().required("Please enter your credential Id"),
        Issuemonth: Yup.string().required("Please select a Issue month"),
        Issueyear: Yup.string().required("Please select a Issue year"),
      })
    )
    .required("Crtifications list is required")
    .min(1, "At least one education entry is required"),
});

export const skillsSchema = Yup.object({
  technicalSkills: Yup.string().required("Please enter your Technical Skills"),
  softskills: Yup.string().required("Please enter your Soft Skills"),
});

export const honorsSchema = Yup.object().shape({
  honorsList: Yup.array()
    .of(
      Yup.object().shape({
        awardName: Yup.string().required(
          "Please enter the name of the award or certification."
        ),
        awardingOrganization: Yup.string().required(
          "Please enter the name of the issuing organization."
        ),
        receivedmonth: Yup.string().required(
          "Please select the month the award was received."
        ),
        receivedyear: Yup.string().required(
          "Please select the year the award was received."
        ),
      })
    )
    .required("The honors and awards list is required.")
    .min(1, "Please add at least one honor or award."),
});

export const volunteerSchema = Yup.object().shape({
  volunteerList: Yup.array()
    .of(
      Yup.object().shape({
        organizationName: Yup.string().required(
          "Please enter the name of the organization."
        ),
        volunteerRules: Yup.string().required(
          "Please enter your role in the organization."
        ),
        startYear: Yup.string().required("Please select the start year."),
        endYear: Yup.string().required("Please select the end year."),
      })
    )
    .required("The volunteer experience list is required.")
    .min(1, "Please add at least one volunteer experience."),
});
