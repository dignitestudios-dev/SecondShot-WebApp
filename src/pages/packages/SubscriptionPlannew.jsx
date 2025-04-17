import React, { useContext, useEffect, useState } from "react";
import { Bgsubscription, Tick } from "../../assets/export";
import SubscriptionModal from "../../components/Modal/SubscriptionModal";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useFormik } from "formik";
import { accessCodeSchema } from "../../Schema/accesscodeschema";
import { accessCode } from "../../data/authentication";
import BackBtn from "../../components/onboarding/BackBtn";
import Backbutton from "../../components/Global/Backbutton";
import { AuthContext } from "../../context/AuthContext";
import { FiLoader } from "react-icons/fi";

const SubscriptionPlannew = () => {
  const navigation = useNavigate("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [subscription, setSubscription] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const cardShow = location?.state?.cardShow;
  const { profileCompleted, registrationQuestion } = useContext(AuthContext);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: accessCode,
      validationSchema: accessCodeSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async () => {
        setLoading(true);
        try {
          const response = await axios.post(
            "/api/subscription/verify-access-code",
            {
              code: values.accesscode,
            }
          );

          if (response.status === 200) {
            if (!profileCompleted) {
              navigation("/profiledetail");
            } else if (!registrationQuestion) {
              navigation("/registration-question");
            } else {
              navigation("/home");
            }
            SuccessToast(response?.data?.message);
            // navigation("/profiledetail");
          }
        } catch (err) {
          console.log(err?.response?.data?.message);
          ErrorToast(err?.response?.data?.message);
        } finally {
          setLoading(false);
        }
      },
    });

  const getsubscriptionDetail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/subscription/subscription-products`
      );

      if (response.status === 200) {
        setSubscription(response?.data?.data);
      }
    } catch (err) {
      console.error("Error fetching subscription details:", err);
      ErrorToast(
        err?.response?.data?.message || "Failed to fetch subscription details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getsubscriptionDetail();
  }, []);

  return (
    <div
      className="min-h-screen bg_subscription flex flex-col items-center py-10 px-4"
      style={{
        backgroundImage: `url(${Bgsubscription})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        backgroundSize: "cover",
      }}
    >
      <div className="text-center ">
        <h1 className="text-[40px] font-[600] text-gray-900">
          Explore Our Subscription Plans
        </h1>
        <p className="text-[#181818] font-[500] mt-2 text-[16px] leading-[21.6px]">
          Choose from one of our subscription plans to suit your needs. <br />{" "}
          For assistance contact{" "}
          <a href="mailto:help@yoursecondshot.com" className="underline">
            help@yoursecondshot.com
          </a>
        </p>
      </div>
      {!cardShow && (
        <div className="mt-3 mb-3 flex justify-center w-[171px]">
          <AuthSubmitBtn
            text={"Try it for free"}
            handleSubmit={() => navigation("/profiledetail")}
          />
        </div>
)}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full max-w-6xl">
        <div className="w-full max-w-6xl">
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <form onSubmit={handleSubmit}>
                <div className="bg-gradient-to-b from-[#012C57] to-[#061523] text-white rounded-[22px] h-[659px] shadow-lg p-6 w-full max-w-sm flex flex-col">
                  <h2 className="text-[24px] font-semibold ">
                    Have an access code?
                  </h2>
                  <div className="opacity-[20%]">
                    <hr className="bg-[#FFFFFF] mt-5 mb-5" />
                  </div>
                  <p className="text-[20px] leading-[27px] font-[600]">
                    Unlock immediate access to <br /> Your Career Toolbox.
                  </p>
                  <div className="space-y-4 mt-9 h-[261px]">
                    <label className="text-[16px] text-[#56EC17] leading-[21.6px] font-[500] mb-1">
                      Use Access Code
                    </label>
                    <input
                      type="text"
                      id="accesscode"
                      name="accesscode"
                      placeholder="Access Code"
                      value={values.accesscode}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, "");
                        handleChange({
                          target: { name: "accesscode", value: numericValue },
                        });
                      }}
                      onBlur={handleBlur}
                      maxLength={6}
                      className="w-full bg-transparent border border-[#395E81] px-4 py-2 rounded-[15px] text-[16px] text-[white] focus:outline-none focus:ring-2 focus:ring-[#55C9FA]"
                    />
                    {errors.accesscode && touched.accesscode ? (
                      <span className="text-red-700 mx-2 text-sm font-medium">
                        {errors.accesscode}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-auto">
                    <button
                      className="bg-white text-[#1E384F] text-[16px] font-[500] w-[171px] h-[45px] rounded-[12px]"
                      type="submit"
                    >
                      <div className="flex items-center justify-center">
                        <span className="mr-1">Submit</span>
                        {loading && (
                          <FiLoader className="animate-spin text-lg" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </SwiperSlide>
            {/* {!cardShow && (
              <SwiperSlide>
                <div className="bg-white rounded-[22px] h-[659px]  p-6 w-full max-w-sm flex flex-col">
                  <div>
                    <div className="flex justify-between items-center">
                      <h2 className="text-[24px] font-[500] text-[#000000] leading-[32.4px]">
                        Basic
                      </h2>
                      <h2 className="text-[32px] font-[600] leading-[43.2px] text-[#56EC17]">
                        Free
                      </h2>
                    </div>
                    <hr className="bg-[#000000] mb-4 mt-3" />
                    <div className="text-[22px] font-[600] text-gray-900">
                      Basic Plan
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center space-x-2 space-y-3 mt-3">
                        <img
                          src={Tick}
                          className="h-[10.5px] mt-3 w-[13.5px]"
                          alt=""
                        />
                        <span className="text-[17px] leading-[22.95px] font-[500] text-[#181818]">
                          Discover Your Transferable Skills
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-auto w-[171px]">
                    <AuthSubmitBtn
                      text={"Try it for free"}
                      handleSubmit={() => navigation("/profiledetail")}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )} */}

            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-gray-200 rounded-[22px] h-[659px]  p-6 w-full max-w-sm flex flex-col justify-between">
                      <div className="bg-gray-300 h-[40px] w-[60%] rounded-[10px] mb-4"></div>
                      <div className="bg-gray-300 h-[30px] w-[80%] rounded-[10px] mb-2"></div>
                      <div className="bg-gray-300 h-[20px] w-[90%] rounded-[10px] mb-2"></div>
                      <div className="bg-gray-300 h-[50px] w-[100%] rounded-[10px] mb-2"></div>
                    </div>
                  </SwiperSlide>
                ))
              : subscription?.slice(0, 3)?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white rounded-[22px] h-[659px]  p-6 w-full max-w-sm flex flex-col">
                      <div>
                        <div className="flex justify-between items-center">
                          <h2 className="text-[24px] font-[500] text-[#000000] leading-[32.4px]">
                            {item?.subscription_duration === "3-month" ? "Quarterly " : item?.subscription_duration || item?.subscription_duration === "yearly" ? "Yearly" : item?.subscription_duration }
                          </h2>
                          <h2 className="text-[32px] font-[600] leading-[43.2px] text-[#56EC17]">
                            {item?.price || "0.00"}
                          </h2>
                        </div>
                        <hr className="bg-[#000000] mb-4 mt-3" />
                        <div className="text-[22px] font-[600] text-gray-900">
                          {/* {item?.product_name || "No Product Name"} */}
                        </div>
                        <ul className="space-y-2 text-gray-700">
                          {Object.values(item?.description || {}).map(
                            (feature, index) => (
                              <li
                                key={index}
                                className="flex items-center space-x-2 mt-3"
                              >
                                <img
                                  src={Tick}
                                  className="h-[10.5px] w-[13.5px]"
                                  alt=""
                                />
                                <span className="text-[17px] leading-[22.95px] font-[500] text-[#181818]">
                                  {feature}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="mt-auto w-[171px]">
                        <AuthSubmitBtn
                          text={"Buy Now"}
                          handleSubmit={() =>
                            navigation("/subscription-new", {
                              state: { cardsubdata: item },
                            })
                          }
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
          <div className="relative bottom-[340px] ">
            <button className="swiper-button-prev text-2xl  bg-gray-100 h-[20px] w-[10px] rounded-full p-6"></button>
            <button className="swiper-button-next text-2xl  bg-gray-100 h-[20px] w-[10px] rounded-full p-6"></button>
          </div>
        </div>
      </div>

      <footer className="mt-24 text-gray-600 text-sm text-center">
        Copyright © 2023 second shot
      </footer>
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        handleClick={() => navigation("/profiledetail")}
      />
    </div>
  );
};

export default SubscriptionPlannew;
