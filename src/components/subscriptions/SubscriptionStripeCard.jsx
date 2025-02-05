import React, { useContext, useEffect, useState } from "react";
import GrayBtn from "../onboarding/grayBtn";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import SubcriptionActivateModal from "./SubcriptionActivateModal";
import { useLocation, useNavigate } from "react-router-dom";
import { Visa, Visaicon } from "../../assets/export";
import SubscriptionModal from "../Modal/SubscriptionModal";
import StripeForm from "./StripeForm";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../../axios";
import { ErrorToast } from "../toaster/ToasterContainer";
import { Elements } from "@stripe/react-stripe-js";
import { AuthContext } from "../../context/AuthContext";

// Load your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUB_DEV_KEY);

const SubscriptionStripeCard = ({ selected, handleModal, cardsubdata }) => {
  const location = useLocation();
  const { modal, product_id = null } = location?.state || {};
  const [showNew, setShowNew] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const [activatModal, setActivatModal] = useState(modal);
  const navigation = useNavigate();

  const { setSubscriptionpaid, profileCompleted, registrationQuestion } =
    useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState(null);

  const [loading, setLoading] = useState(false);
  const getPaymentInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/subscription/create-subscription-intent",
        {
          product_id: cardsubdata?._id || product_id,
        }
      );

      if (data?.success) {
        setClientSecret(data?.clientSecret);
        localStorage.setItem(
          "stripeSubscriptionId",
          data?.stripeSubscriptionId
        );
        localStorage.setItem("product_id", cardsubdata?._id || product_id);
        localStorage.setItem("cardsubdata", JSON.stringify(cardsubdata));
        localStorage.setItem("paymentIntentId", data?.paymentIntentId);
        setSubscriptionpaid(true);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  
  const handlestarted = () => {
    setActivatModal(false);
    if (profileCompleted === true && registrationQuestion === true) {
      navigation("/home");
    } else {
      navigation("/profiledetail");
    }
  };



  useEffect(() => {
    (cardsubdata?._id || product_id) && getPaymentInfo();
  }, []);

  const options = {
    clientSecret,
  };

  const [cardData, setCardData] = useState(() => {
    try {
      return (
        cardsubdata ||
        (localStorage.getItem("cardsubdata")
          ? JSON.parse(localStorage.getItem("cardsubdata"))
          : null)
      );
    } catch (err) {
      console.error("Error parsing cardsubdata from localStorage:", err);
      return null;
    }
  });
  return (
    <div>
      <div className="bg-transparent p-2 mb-20 ">
        <div className="mt-">
          <h2 className="text-[24px] font-[600] leading-[32.4px] mb-2">
            Payment Details
          </h2>
        </div>

        <div className="bg-gradient-to-l from-[#012C57] to-[#061523] text-white py-2 px-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-[600] text-[18px] leading-[24.3px] ">
              {cardData?.subscription_duration}
            </p>
          </div>
          <div className="text-right flex items-center h-12">
            <p className="text-[#56EC17] font-semibold text-lg pe-1">
              {cardData?.price}
            </p>
            / <p className="text-sm px-1">{cardData?.subscription_duration}</p>
          </div>
        </div>

        <div className="text-right mt-2">
          <p className="text-gray-600 text-xs font-semibold">Total Price</p>
        </div>
        <hr className="w-full border-t border-gray-300 mt-4" />
        <div className="flex justify-between items-center mt-4">
          <p className="text-black font-[500]">Payment Method</p>
        </div>

        <>
          <div className="mt-4">
            <div className="mt-2">
              {clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                  <StripeForm />
                </Elements>
              ) : (
                <div className="animate-pulse bg-gray-300 h-12 w-full rounded"></div>
              )}
            </div>
          </div>
        </>

        <div className="mt-4 w-[40%]  ">
          <GrayBtn text={"Back"} handleSubmit={() => navigation(-1)} />
        </div>

        <SubscriptionModal isOpen={activatModal} handleClick={handlestarted} />
      </div>
    </div>
  );
};

export default SubscriptionStripeCard;
