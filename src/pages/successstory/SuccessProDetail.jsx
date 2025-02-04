import React from "react";

import { FaYoutube } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Backbutton from "../../components/Global/Backbutton";
import { Profileimage } from "../../assets/export";

function SuccessProDetail() {
  const location = useLocation();
  const succesname = location.state?.item;


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
                src={succesname?.profile_img}
                alt="Profile"
                className="h-24 w-24 rounded-full shadow-md"
              />
              <div className="ml-6">
                <h2 className="text-2xl font-semibold text-[#011225]">
                  {succesname?.name}
                </h2>
                <p className="text-[#0081FF] font-[600] ">{succesname?.degree}</p>
              </div>
              <button className="ml-auto bg-[#FF0000] text-white font-semibold rounded-md px-4 py-2 flex items-center justify-center">
                <FaYoutube className="mr-2 text-md" />
                YouTube
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-[#011225]">
                  Current Profession
                </h3>
                <p className="text-black">
                  Lorem ipsum dolor sit amet consectetur. Tortor mi imperdiet
                  dictum mattis. Nisl dictum senectus non morbi. Lorem ipsum
                  dolor sit amet consectetur. Enim ultricies in sed nisl nisl
                  proin. Nulla euismod massa diam egestas tellus urna mattis
                  aliquam sit. Condimentum viverra ut nunc auctor. Sit
                  consectetur vitae vestibulum lacinia. Nunc nibh vel est
                  tincidunt bibendum felis quisque nib. Nulla euismod massa diam
                  egestas tellus urna mattis aliquam sit.{" "}
                </p>
              </div>
              <hr class="h-px my-8 bg-gray-300 border-0" />

              <div>
                <h3 className="text-xl font-semibold text-[#011225]">
                  Education
                </h3>
                <p className="text-black">
                  Lorem ipsum dolor sit amet consectetur. Tortor mi imperdiet
                  dictum mattis. Nisl dictum senectus non morbi. Lorem ipsum
                  dolor sit amet consectetur. Enim ultricies in sed nisl nisl
                  proin. Nulla euismod massa diam egestas tellus urna mattis
                  aliquam sit. Condimentum viverra ut nunc auctor. Sit
                  consectetur vitae vestibulum lacinia. Nunc nibh vel est
                  tincidunt bibendum felis quisque nib. Nulla euismod massa diam
                  egestas tellus urna mattis aliquam sit.{" "}
                </p>
              </div>
              <hr class="h-px my-8 bg-gray-300 border-0" />

              <div>
                <h3 className="text-xl font-semibold text-[#011225]">
                  Experience
                </h3>
                <p className="text-black">
                  Lorem ipsum dolor sit amet consectetur. Tortor mi imperdiet
                  dictum mattis. Nisl dictum senectus non morbi. Lorem ipsum
                  dolor sit amet consectetur. Enim ultricies in sed nisl nisl
                  proin. Nulla euismod massa diam egestas tellus urna mattis
                  aliquam sit. Condimentum viverra ut nunc auctor. Sit
                  consectetur vitae vestibulum lacinia. Nunc nibh vel est
                  tincidunt bibendum felis quisque nib. Nulla euismod massa diam
                  egestas tellus urna mattis aliquam sit.{" "}
                </p>
              </div>
              <div>
                <p className="text-black">
                  Lorem ipsum dolor sit amet consectetur. Tortor mi imperdiet
                  dictum mattis. Nisl dictum senectus non morbi. Lorem ipsum
                  dolor sit amet consectetur. Enim ultricies in sed nisl nisl
                  proin. Nulla euismod massa diam egestas tellus urna mattis
                  aliquam sit. Condimentum viverra ut nunc auctor. Sit
                  consectetur vitae vestibulum lacinia. Nunc nibh vel est
                  tincidunt bibendum felis quisque nib. Nulla euismod massa diam
                  egestas tellus urna mattis aliquam sit.{" "}
                </p>
              </div>
              <hr class="h-px my-8 bg-gray-300 border-0" />

              <div>
                <h3 className="text-xl font-semibold text-[#011225]">
                  Can you identify your most valuable transferable skill, and
                  how have you seen it manifest in different areas of your life?
                </h3>
                <p className="text-black mt-3">
                  Think about the skills you've developed that can be applied
                  across different areas of life and work. Whether it's
                  communication, problem-solving, or adaptability, these
                  transferable skills are often the foundation of success. How
                  has this skill shaped your interactions, improved your
                  efficiency, or opened up new opportunities? Reflect on how it
                  continues to influence both your personal and professional
                  growth.
                </p>
              </div>
              <hr class="h-px my-8 bg-gray-300 border-0" />

              <div>
                <h3 className="text-xl font-semibold text-[#011225]">
                  If you could give one piece of advice to your younger self,
                  what would it be, and why?
                </h3>
                <p className="text-black mt-3">
                  Reflecting on your journey, think about the wisdom and lessons
                  you’ve gained over time. What insights would you share with
                  your younger self to help navigate challenges, embrace
                  opportunities, or avoid mistakes? Whether it’s about trusting
                  your instincts, being patient, or taking more risks, this is a
                  moment to look back and offer guidance that could have made a
                  difference.
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
