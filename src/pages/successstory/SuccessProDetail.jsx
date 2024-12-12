import React from "react";

import { FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Backbutton from "../../components/Global/Backbutton";
import { Profileimage } from "../../assets/export";

function SuccessProDetail() {
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
                src={Profileimage}
                alt="Profile"
                className="h-24 w-24 rounded-full shadow-md"
              />
              <div className="ml-6">
                <h2 className="text-2xl font-semibold text-[#011225]">
                  Benjamin James
                </h2>
                <p className="text-[#0081FF]">Marketing Manager</p>
                <p className="text-[#8F92A1]">Toronto, Canada</p>
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
            </div>
          </div>
          <div className="p-6 bg-white rounded-2xl mt-4">
              <h3 className="text-xl font-semibold text-[#011225] mb-4">Achievements</h3>
              <div className="grid grid-cols-2 gap-4 text-[#011225]">
                <ol className="pl-1 space-y-2 border-r-2">
                  <li>1. Lorem ipsum dolor sit amet consectetur. Nunc aliquet diam quam vitae non tincidunt turpis.</li>
                  <hr class="h-px my-8 bg-gray-300 border-0 mr-6"/>

                  <li>2. Lorem ipsum dolor sit amet consectetur. Nunc aliquet diam quam vitae non tincidunt turpis.</li>
                  
                </ol>
                <ol className=" pl-5 space-y-2">
                  <li>3. Lorem ipsum dolor sit amet consectetur. Nunc aliquet diam quam vitae non tincidunt turpis.</li>
                  <hr class="h-px my-8 bg-gray-300 border-0"/>

                  <li>4. Lorem ipsum dolor sit amet consectetur. Nunc aliquet diam quam vitae non tincidunt turpis.</li>
                 
                </ol>
              </div>
            </div>  
        </div>
      </div>
    </div>
  );
}

export default SuccessProDetail;
