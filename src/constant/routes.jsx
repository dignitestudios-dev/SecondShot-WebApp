import OtpEmail from "../pages/onboarding/OtpEmail";
import OtpPhone from "../pages/onboarding/OtpPhone";
import VerifedScreen from "../pages/onboarding/VerifedScreen";
import SubscriptionPlannew from "../pages/packages/SubscriptionPlannew";
import ProfileDetails from "../pages/profileDetail/ProfileDetails";
import Subscription from "../pages/packages/SubscriptionPlans";
import SubscriptionNew from "../pages/packages/SubscriptionPlans";
import Home from "../pages/home/Home";
import Applayout from "../layout/Applayout";
import CareerRecommendations from "../pages/careerrecommendations/CareerRecommendations";
import CareerDetails from "../pages/careerrecommendations/CareerDetails";
import MyGoals from "../pages/mygoals/MyGoals";
import MyResume from "../pages/myresume/MyResume";
import ViewResume from "../pages/myresume/ViewResume";
import SuccessStory from "../pages/successstory/SuccessStory";
import SuccessProDetail from "../pages/successstory/SuccessProDetail";
import MyLibrary from "../pages/mylibrary/Mylibrary";
import MyProfile from "../pages/myProfile/MyProfile";
import ProfileSubscription from "../pages/myProfile/ProfileSubscription";
import EditProfileDetails from "../pages/myProfile/EditProfileDetail";
import MyTransferableSkills from "../pages/transferableskills/MyTransferableSkills";
import StartAssesment from "../pages/careerrecommendations/StartAssesment";
import CreateResume from "../pages/myresume/CreateResume";
import AddGoals from "../pages/mygoals/AddGoals";
import ReviewYourGoal from "../pages/mygoals/ReviewGoal";
import SmartGoalDetails from "../pages/mygoals/SmartGoalDetails";
import GoalDetail from "../pages/mygoals/GoalDetail";
import MakeitSmart from "../pages/mygoals/MakeitSmart";
import RegistrationQuestion from "../pages/registrationquestions/RegistrationQuestion";
import CongratsMessage from "../pages/registrationquestions/CongratsMessage";
import Notifications from "../pages/notifications/Notifications";
import ReviewSmartGoal from "../pages/mygoals/ReviewSmartGoals";
import EditRegistrationQuestion from "../pages/editregistrationquestion/EditRegistrationQuestion";
import ReviewYourGoalOld from "../pages/mygoals/ReviewGoalOld";
import CreateResumeInfo from "../pages/myresume/CreateResumeInfo";
import MyRecommedation from "../pages/careerrecommendations/MyRecommedation";
import StartGoal from "../pages/mygoals/StartGoal";
import StartResume from "../pages/myresume/StartResume";
import NewTrasnferSkill from "../pages/NewtrnaferSkill/NewTrasnferSkill";
import SuccessScreen from "../components/subscriptions/SuccessScreen";
import EditResume from "../pages/myresume/EditResume";
import CareerFavDetail from "../pages/mylibrary/CareerFavDetail";

export const routes = [
  {
    url: "/profiledetail",
    page: <ProfileDetails />,
  },
  {
    url: "/subscriptionplans",
    page: <SubscriptionPlannew />,
  },
  {
    url: "/subscription-new",
    page: <SubscriptionNew />,
  },
  {
    title: "Home",
    url: "/home",
    page: <Applayout page={<Home />} />,
  },
  {
    title: "MyTransferableSkills",
    url: "/transferablekills",
    page: <Applayout page={<NewTrasnferSkill />} />,
  },
  {
    title: "Careerrecommendation",
    url: "/careerrecommendation",
    page: <Applayout page={<CareerRecommendations />} />,
  },
  {
    title: "CareerDetails",
    url: "/careerdetails/:id",
    page: <Applayout page={<CareerDetails />} />,
  },
  {
    title: "MyGoals",
    url: "/mygoals",
    page: <Applayout page={<MyGoals />} />,
  },
  {
    title: "GoalsDetails",
    url: "/smartgoaldetails",
    page: <Applayout page={<SmartGoalDetails />} />,
  },
  {
    title: "MyResume",
    url: "/myresume",
    page: <Applayout page={<MyResume />} />,
  },
  {
    title: "ViewResume",
    url: "/view-resume",
    page: <Applayout page={<ViewResume />} />,
  },
  {
    title: "SuccessStory",
    url: "/success-story",
    page: <Applayout page={<SuccessStory />} />,
  },
  {
    title: "SuccessProDetail",
    url: "/story-pro-detail",
    page: <Applayout page={<SuccessProDetail />} />,
  },
  {
    title: "Mylibrary",
    url: "/my-library",
    page: <Applayout page={<MyLibrary />} />,
  },
  {
    title: "MyProfile",
    url: "/my-profile",
    page: <Applayout page={<MyProfile />} />,
  },
  {
    title: "ProfileSubscription",
    url: "/profile-subscription",
    page: <Applayout page={<ProfileSubscription />} />,
  },
  {
    title: "EditProfileDetails",
    url: "/edit-profile-details",
    page: <Applayout page={<EditProfileDetails />} />,
  },
  {
    title: "StartAssesment",
    url: "/start-assesment",
    page: <Applayout page={<StartAssesment />} />,
  },
  {
    title: "CreateResume",
    url: "/create-resume",
    page: <Applayout page={<CreateResume />} />,
  },
  {
    title: "AddGoals",
    url: "/create-goals",
    page: <Applayout page={<AddGoals />} />,
  },
  {
    title: "ReviewGoal",
    url: "/review-goals",
    page: <Applayout page={<ReviewYourGoalOld />} />,
  },
  {
    title: "GoalDetail",
    url: "/goal-detail/:id",
    page: <Applayout page={<GoalDetail />} />,
  },
  {
    title: "CareerFavDetail",
    url: "/careerfav-detail/:id",
    page: <Applayout page={<CareerFavDetail />} />,
  },
  {
    title: "MakeitSmart",
    url: "/make-smart",
    page: <Applayout page={<MakeitSmart />} />,
  },
  {
    title: "RegistrationQuestion",
    url: "/registration-question",
    page: <RegistrationQuestion />,
  },

  {
    title: "CongratsMessage",
    url: "/congrats-message",
    page: <CongratsMessage />,
  },
  {
    title: "notifications",
    url: "/notifications",
    page: <Applayout page={<Notifications />} />,
  },
  {
    title: "review-smart-goals",
    url: "/review-smart-goals",
    page: <Applayout page={<ReviewSmartGoal />} />,
  },
  {
    title: "edit-registration-question",
    url: "/edit-registration-question",
    page: <Applayout page={<EditRegistrationQuestion />} />,
  },
  {
    title: "createresumeinfo",
    url: "/create-resume-info",
    page: <Applayout page={<CreateResumeInfo />} />,
  },
  {
    title: "myRecommedation",
    url: "/myRecommedation",
    page: <Applayout page={<MyRecommedation />} />,
  },
  {
    title: "StartGoal",
    url: "/startGoal",
    page: <Applayout page={<StartGoal />} />,
  },
  {
    title: "StartResume",
    url: "/startResume",
    page: <Applayout page={<StartResume />} />,
  },
  {
    title: "edit-resume",
    url: "/edit-resume/:id",
    page: <Applayout page={<EditResume />} />,
  },
 
];
