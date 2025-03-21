import React from "react";
import { useNavigate } from "react-router-dom";
import { Assesmentmodal } from "../../assets/export";

const AssessmentModal = ({ showModal, step, setShowModal, carrerId }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/careerdetails/${carrerId}`);
  };

  return (
    showModal && (
      <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-[#FCFCFC] bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-custom-shadow w-[500px] z-10 p-4 relative">
          <div className="flex justify-center mt-6">
            <img
              src={Assesmentmodal}
              alt="logo"
              className="object-cover w-[18%]"
            />
          </div>
          <div className="px-4 pt-2 pb-2">
            <h2 className="text-[24px] font-semibold mb-4 text-center">
              You have successfully <br /> completed the assessment
            </h2>
            <div className="w-[419px] ">
              <p className="text-[18px] font-[500] mt-2 text-black text-center leading-[24.3px]  ">
                You’ve been matched with five potential careers! Take a moment
                to click through each one and explore sample job titles, career
                pathways, and recommended education.
              </p>
              <p className="text-[18px] font-[500] mt-2 text-black text-center leading-[24.3px] ">
                Be sure to mark your favorites so you can save them in your
                library. This way, you’ll have easy access to revisit and review
                them later.
              </p>
              <p className="text-[18px]   font-[500] mt-2 text-black text-center leading-[24.3px] ">
                If you’re interested in exploring even more career options, you
                can always retake the assessment for additional matches.
              </p>
            </div>
            <div className=" mt-4 flex justify-center">
              <button
                onClick={handleNavigation}
                className=" bg-gradient-to-r  from-[#061523] to-[#012C57] text-white px-4 py-2 rounded-lg w-full hover:bg-[#012C57] disabled:cursor-not-allowed"
              >
                Explore Career Recommendations
              </button>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  setShowModal(false);
                  step(1);
                }}
                className="bg-[#E5EAED] text-[#012C57] font-medium px-4 py-2 rounded-lg w-full"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AssessmentModal;
