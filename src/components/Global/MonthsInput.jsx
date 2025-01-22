import React from "react";

const MonthsInput = ({ value, label, options, onChange, name, id }) => {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        className="w-full border rounded-xl px-3 py-3 text-sm bg-transparent border-[#9A9A9A] focus:ring-gray-700 focus:border-gray-700 outline-gray-700"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthsInput;
