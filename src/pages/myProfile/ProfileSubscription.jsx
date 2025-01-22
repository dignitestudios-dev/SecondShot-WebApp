import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubscriptionStripeCard from "../../components/subscriptions/SubscriptionStripeCard";
import SubriptionCardPath from "../../components/subscriptions/SubriptionCardPath";
import SubscriptionCardModal from "../../components/Modal/SubscriptionCardModal";
import SubscriptionModal from "../../components/Modal/SubscriptionModal";
import SubscirtionProfile from "../../components/subscriptions/SubscirtionProfile";
const ProfileSubscription = ({ handleIsTrue, selected, setSelected }) => {
  const navigation = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [showAdded, setShowAdded] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

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

  return (
    <>
      <div className="text-[40px] mt-5 text-center leading-[54px] font-[500] text-[#181818] ">
        Subscription Plans
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
      <div className="grid grid-cols-2 gap-6  mt-11 px-32">
        <SubscirtionProfile />
        <SubscriptionStripeCard selected={selected} handleModal={handleModal} />
        <SubscriptionCardModal
          showModal={showCardModal}
          onclick={handleCardModal}
          setShowAdded={setShowAdded}
          setShowNew={setShowNew}
        />
        <SubscriptionModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          handleClick={() => navigation("/profiledetail")}
        />
      </div>
    </>
  );
};

export default ProfileSubscription;
