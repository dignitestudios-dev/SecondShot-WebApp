import React, { useState } from "react";
import SubscriptionCardModal from "../Modal/SubscriptionCardModal";
import SubscriptionModal from "../Modal/SubscriptionModal";
import { useNavigate } from "react-router-dom";
import SubriptionCardPath from "./SubriptionCardPath";
import SubscriptionStripeCard from "./SubscriptionStripeCard";
const SubscriptionBuy = ({ handleIsTrue, selected, setSelected,cardsubdata }) => {

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-1 xl:px-80 lg:px-50 md:px-30 px-16">
       <SubriptionCardPath selected={selected} cardsubdata={cardsubdata} />
       <SubscriptionStripeCard selected={selected} handleModal={handleModal} cardsubdata={cardsubdata} />
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

export default SubscriptionBuy;
