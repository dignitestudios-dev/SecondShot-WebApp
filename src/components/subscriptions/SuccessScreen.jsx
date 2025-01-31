import React, { useEffect, useState } from "react";
import { BgAuth, TickIcon } from "../../assets/export";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../axios";
import { ErrorToast } from "../toaster/ToasterContainer";
const SuccessScreen = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const queryParams = new URLSearchParams(location?.search);
  const paymentIntentId = queryParams.get("payment_intent");

  const stripeSubscriptionId = localStorage.getItem("stripeSubscriptionId");
  const product_id = localStorage.getItem("product_id");

  const handleSucces = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/subscription/verify-subscription",
        {
          paymentIntentId: paymentIntentId,
          product_id: product_id,
          stripeSubscriptionId: stripeSubscriptionId,
        }
      );
      if (data?.success) {
        navigation("/subscription-new", { state: { modal: true } });
      } else {
        navigation("/subscription-new", {
          state: { modal: false, product_id: product_id },
        });
        ErrorToast(data?.message);
      }
    } catch (err) {
      ErrorToast(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paymentIntentId && stripeSubscriptionId && product_id) {
      handleSucces();
    } else {
      console.error("Missing required data.");
    }
  }, [paymentIntentId, stripeSubscriptionId, product_id]);

  return (
    <div className="bg-slate-200 p-3">
      <div className="grid grid-cols-12 py-4 h-screen">
        <div className="col-span-12 md:col-span-4 hidden md:flex justify-center auth-bg rounded-l-[20px]"></div>
        <div className="col-span-12 md:col-span-8 flex justify-center rounded lg:rounded-r-[20px] items-center bg-white pb-4 relative overflow-hidden">
          <div className="w-full max-w-md p-7">
            <div className="flex justify-center mb-6">
              <img
                src={TickIcon}
                alt="OTP Illustration"
                className="h-[120px] w-[120px]"
              />
            </div>
            <h2 className="text-[32px] text-[#000000] font-[600] leading-[43.2px] text-center mb-2">
              Success
            </h2>
            <p className="text-center text-gray-600 mb-4">
              {/* Payment Intent ID: {paymentIntentId} */}
            </p>
            <div className="flex justify-center items-center">
              <div className="mt-5 w-[164px]">
                {/* Uncomment and customize the button */}
                {/* <AuthSubmitBtn
                  text={"Continue"}
                  handleSubmit={() => navigation("/subscriptionplans")}
                /> */}
              </div>
            </div>
          </div>
          <img
            src={BgAuth}
            alt="logo"
            className="absolute -bottom-8 -right-8 w-[30%]"
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
