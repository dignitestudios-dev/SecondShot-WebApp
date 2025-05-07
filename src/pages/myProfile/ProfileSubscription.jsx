import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { Tick } from "../../assets/export";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import { AuthContext } from "../../context/AuthContext";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";

const ProfileSubscription = ({ handleIsTrue, selected, setSelected }) => {
  const navigation = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const [loading, setloading] = useState(false);
  const [myplane, setMyplane] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [cardShow, setCardShow] = useState(false);
  const { subscriptionpaid } = useContext(AuthContext);
  const handleToggle = (option) => {
    setSelected(option);
  };

  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const [showCardModal, setShowCardModal] = useState(false);
  const handleCardModal = () => {
    setShowCardModal(!showCardModal);
  };

  const getmyPlan = async () => {
    setloading(true);
    try {
      const response = await axios.get(
        "/api/subscription/my-subscription-plan"
      );
      if (response.status === 200) {
        setMyplane(response?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  const [loader, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        "/api/subscription/cancel-subscription"
      );

      if (response.status === 200) {
        SuccessToast("Subscription Cancel Successfully");
        navigation("/home");
      }
    } catch (err) {
      ErrorToast("Subscription Already Cancel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getmyPlan();
  }, []);
  return (
    <>
      <div className="text-[40px] mt-5 text-center leading-[54px] font-[500] text-[#181818] ">
        Subscription Plan
      </div>
      <div className=" text-[16px] leading-[21.6px] text-center w-full flex justify-center items-center ">
        <p className=" w-[639px] mt-5">
          Choose from our subscription plans to suit your needs. Whether basic
          or premium, we have the right plan for you. For assistance contact{" "}
          <a href="mailto:help@yoursecondshot.com" className="underline">
            help@yoursecondshot.com
          </a>
        </p>
      </div>
      <div className="flex flex-col mt-5 lg:flex-row items-center justify-center gap-8 w-full max-w-6xl">
        <div>
          {subscriptionpaid ? (
            loading ? (
              <div className="bg-gray-200 rounded-[22px] h-[459px]  p-6 w-[400px] max-w-sm flex flex-col justify-between">
                <div className="bg-gray-300 h-[40px] w-[60%] rounded-[10px] mb-4"></div>
                <div className="bg-gray-300 h-[30px] w-[80%] rounded-[10px] mb-2"></div>
                <div className="bg-gray-300 h-[20px] w-[90%] rounded-[10px] mb-2"></div>
                <div className="bg-gray-300 h-[50px] w-[100%] rounded-[10px] mb-2"></div>
              </div>
            ) : myplane?.status === "cancelled" ? (
              <div>No Plan Found</div>
            ) : (
              <div className="  bg-white rounded-[22px]  md:h-full  shadow-lg   p-2 w-full max-w-sm">
                <div className="flex justify-between items-center  mt-3 ">
                  <h2 className="text-[24px] px-3 font-[500] text-[#000000] leading-[32.4px] ">
                    {myplane?.subscriptionProduct?.subscription_duration ===
                    "monthly"
                      ? "Monthly "
                      : myplane?.subscriptionProduct?.subscription_duration ||
                        myplane?.subscriptionProduct?.subscription_duration ===
                          "yearly"
                      ? "Yearly"
                      : myplane?.subscriptionProduct?.subscription_duration}
                  </h2>
                  <h2 className="text-[32px] font-[600] pe-3 leading-[43.2px] text-[#012C57]">
                    {myplane?.subscriptionProduct?.price}
                  </h2>
                </div>
                <div>
                  <hr className="bg-[#000000]  mt-3" />
                </div>

                <div className="p-3">
                  {/* <div className="text-[22px] font-[600] text-gray-900 ">
                    {myplane?.subscriptionProduct?.product_name ===
                    "yearly_plan"
                      ? "Yearly Plan"
                      : myplane?.subscriptionProduct?.product_name ||
                        myplane?.subscriptionProduct?.product_name ===
                          "quarterly_plan"
                      ? "Quarterly Plan"
                      : myplane?.subscriptionProduct?.product_name}
                  </div> */}
                  <ul className="space-y-3 text-gray-700">
                    {Object.values(
                      myplane?.subscriptionProduct?.description || {}
                    ).map((feature, index) => (
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
                    ))}
                  </ul>
                  {myplane?.platform === "stripe" ? (
                    <div className="flex justify-center mt-5">
                      <button
                        className="bg-red-500 p-2 w-[180px] text-center rounded-md text-white font-[600] flex justify-center items-center"
                        onClick={handleDelete}
                      >
                        {loader ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                        ) : (
                          "Cancel Subscription"
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="text-center bg-red-400 p-3 rounded-md mt-3 text-white">
                      This subscription was purchased through the mobile app.
                      Please use the app to view or manage your subscription.
                    </div>
                  )}
                </div>
              </div>
            )
          ) : (
            <div className="bg-white rounded-[22px] h-[400px] shadow-sm p-6 w-full max-w-sm flex flex-col">
              <div className="h-[400px]">
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
              <div>
                <AuthSubmitBtn
                  text={"Upgrade Plan"}
                  type={"button"}
                  handleSubmit={() => {
                    navigation("/subscriptionplans", {
                      state: { cardShow: true },
                    });
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileSubscription;
