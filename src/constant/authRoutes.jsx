import SuccessScreen from "../components/subscriptions/SuccessScreen";
import Login from "../pages/onboarding/Login";
import OtpEmail from "../pages/onboarding/OtpEmail";
import OtpPhone from "../pages/onboarding/OtpPhone";
import ResetPassword from "../pages/onboarding/ResetPassword";
import SignUpForm from "../pages/onboarding/Signup";
import PrivacyPolicy from "../pages/privacyPolicy/PrivacyPolicy";
import TermsAndCondition from "../pages/TermsAndCondition/TermsAndCondition";
import ForgotPassword from "./../pages/onboarding/ForgotPassword";

export const authRoutes = [
  {
    url: "/",
    page: <SignUpForm />,
  },

  {
    url: "/sign-in",
    page: <Login />,
  },

  {
    url: "/email-otp",
    page: <OtpEmail />,
  },
  {
    url: "/phone-otp",
    page: <OtpPhone />,
  },
  {
    url: "/forgot",
    page: <ForgotPassword />,
  },
  {
    url: "/reset-password",
    page: <ResetPassword />,
  },
  {
    title: "verify-payment",
    url: "/verify-payment",
    page: <SuccessScreen />
  },
  {
    title: "terms-condition",
    url: "/terms-and-condition",
    page: <TermsAndCondition />
  },
  {
    title: "privacy-policy",
    url: "/privacy-policy",
    page: <PrivacyPolicy />
  },
 
];
