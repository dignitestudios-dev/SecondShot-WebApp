import Login from "../pages/onboarding/Login";
import OtpEmail from "../pages/onboarding/OtpEmail";
import OtpPhone from "../pages/onboarding/OtpPhone";
import ResetPassword from "../pages/onboarding/ResetPassword";
import SignUpForm from "../pages/onboarding/Signup";
import VerifiedScreen from "../pages/onboarding/VerifedScreen";
import ForgotPassword from "./../pages/onboarding/ForgotPassword";

export const authRoutes = [
  {
    url: "/sign-up",
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
    url: "/verified-success",
    page: <VerifiedScreen />,
  },
];
