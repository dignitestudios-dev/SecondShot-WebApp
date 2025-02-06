import React from "react";

import { FaYoutube } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Backbutton from "../../components/Global/Backbutton";
import { Profileimage } from "../../assets/export";

function SuccessProDetail() {
  const location = useLocation();
  const succesname = location.state;

  console.log(succesname, "succesname");
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="">
        <div className=" ">
          <Backbutton />
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Profile Detail
          </h1>

          <div className="bg-white rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <img
                src={succesname?.data?.profile_img}
                alt="Profile"
                className="h-24 w-24 rounded-full shadow-md"
              />
              <div className="ml-6">
                <h2 className="text-2xl font-semibold text-[#011225]">
                  {succesname?.data?.name}
                </h2>
                <p className="text-[#0081FF] font-[600] ">
                  {succesname?.data?.profession}
                </p>
              </div>
              <button className="ml-auto bg-[#FF0000] text-white font-semibold rounded-md px-4 py-2 flex items-center justify-center">
                <FaYoutube className="mr-2 text-md" />
                <a href={`${succesname?.data?.youtube_link}`} target="_blank">YouTube</a>
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-[#011225]">
                  Current Profession
                </h3>
                <p className="text-black">
                  {succesname?.data?.current_profession}
                </p>
              </div>
              <hr class="h-px my-8 bg-gray-300 border-0" />

              <div>
                <h3 className="text-xl font-semibold text-[#011225]">
                  Education
                </h3>
                <p className="text-black">{succesname?.data?.education}</p>
              </div>
              <hr class="h-px my-8 bg-gray-300 border-0" />

              <div>
                <h3 className="text-xl font-semibold text-[#011225]">
                  Experience
                </h3>
                <p className="text-black">{succesname?.data?.experience}</p>
              </div>

              <hr class="h-px my-8 bg-gray-300 border-0" />

              <div>
                <h3 className="text-xl font-semibold text-[#011225]">
                  Can you identify your most valuable transferable skill, and
                  how have you seen it manifest in different areas of your life?
                </h3>
                <p className="text-black mt-3">
                  {succesname?.data?.most_valuable_transferable_skill}
                </p>
              </div>
              <hr class="h-px my-8 bg-gray-300 border-0" />

              <div>
                <h3 className="text-xl font-semibold text-[#011225]">
                  If you could give one piece of advice to your younger self,
                  what would it be, and why?
                </h3>
                <p className="text-black mt-3">
                  {succesname?.data?.piece_of_advice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessProDetail;
