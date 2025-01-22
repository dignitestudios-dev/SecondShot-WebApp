import React from "react";

const SupportPeople = () => {
  return (
    <div>
      <div className="mt-8 grid grid-cols-2 gap-4">
        {["Support Person ", "Support Person "].map((supportTitle, index) => (
          <div key={index} className="bg-white rounded-[22px]  p-6">
            <h2 className="font-semibold text-lg text-gray-800">
              {supportTitle}{" "}
              <span className="text-[#56EC17]">(0{index + 1})</span>
            </h2>
            <div className="mt-4 grid grid-cols-3 gap-x-4">
              <p className="text-sm border-r border-gray-300 pr-4 grid grid-cols-1">
                <strong>Full Name:</strong>
                <span> {index === 0 ? "Emma Ava" : "John Doe"} </span>
              </p>
              <p className="text-sm border-r border-gray-300 pr-4">
                <strong>Email Address:</strong>{" "}
                {index === 0 ? "emmaava@gmail.com" : "johndoe@gmail.com"}
              </p>
              <p className="text-sm grid grid-cols-1">
                <strong>Phone Number:</strong>
                <span> +1000 0000 0000</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportPeople;
