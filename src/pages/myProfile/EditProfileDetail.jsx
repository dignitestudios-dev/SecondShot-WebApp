import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BgAuth, Cameraicon, logo } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import PhoneInputs from "../../components/onboarding/PhoneInputs";
import SelectInput from "../../components/onboarding/SelectInput";
import GrayBtn from "../../components/onboarding/grayBtn";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";

const EditProfileDetails = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleNavigate = () => {
    navigate("/reg-questions");
  };
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleSelectChangeCity = (e) => {
    setSelectedCity(e.target.value);
  };
  const handleSelectChangeCountry = (e) => {
    setSelectedCountry(e.target.value);
  };
  return (
    <div className=" bg-transparent lg:h-screen h-full px-6 py-4">
      <div className="grid grid-cols-12 gap-2 md:gap-8 bg-white rounded-xl lg:px-32 lg:h-full h-screen relative">
        <div className="col-span-12 md:col-span-12 pt-8">
          <div className="mb-3">
            <h1 className="text-[40px] font-[600] leading-[54px] text-center">
              Edit Profile Details
            </h1>
          
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 gap-y-4 px-12 md:px-36 md:-mr-32 lg:px-28 lg:-mr-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative flex items-center justify-center w-[89px] h-[89px] border border-[#1F3A52] rounded-full">
                <img src={Cameraicon} alt="" className="w-[28px] h-[28px]" />
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-[16px] font-[500] text-[#181818] leading-[20.4px] ">
                Profile Picture
              </p>
            </div>
            <button className="text-[#0E73D0] hover:text-blue-700 font-medium relative">
              <input
                type="file"
                className="absolute mt-2 w-12 h-8 inset-0 opacity-0 cursor-pointer"
              />
              Upload
            </button>
          </div>
          <div className="mt-3">
            <AuthInput type={"text"} placeholder={"First Name"} />
          </div>
          <div className="mt-3">
            <AuthInput type={"text"} placeholder={"Last Name"} />
          </div>
          <div className="mt-3">
            <AuthInput type={"email"} placeholder={"Email"} />
          </div>
        </div>
        <div className="hidden md:block w-[1px] h-[70%] bg-gray-200 -ml-4 mt-10"></div>
        <div className="col-span-12 md:col-span-5 gap-y-4 px-12 md:px-36 md:-ml-52 lg:px-28 lg:-ml-48">
          <div className="mb-7  mt-5">
            <PhoneInputs />
          </div>
          <div className="relative w-full mt-1.5 mb-1">
            <SelectInput
              name="Country"
              id="Country"
              value={selectedCountry}
              onChange={handleSelectChangeCountry}
              options={[
                { value: "", label: "Select State" },
                { value: "London", label: "London" },
              ]}
            />
          </div>
          <div className="relative w-full mt-4 mb-1">
            <SelectInput
              name="City"
              id="City"
              value={selectedCity}
              onChange={handleSelectChangeCity}
              options={[
                { value: "", label: "Select City" },
                { value: "Europe ", label: "Europe " },
              ]}
            />
          </div>
          <div className="mt-4">
            <AuthInput type={"text"} placeholder={"Address"} />
          </div>
        </div>
        <div className="col-span-12">
          <div className=" flex justify-center space-x-2 mb-6">
            <div className="w-[169px] h-[49px]">
              <GrayBtn text={"Skip Now"} />
            </div>
            <div className="w-[169px]">
              <AuthSubmitBtn
                text={"Save"}
                handleSubmit={() => navigation("/my-profile")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileDetails;
