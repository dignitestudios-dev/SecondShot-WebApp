import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const TagsModal = ({
  isOpen,
  onClose,
  saveTags,
  availableTags,
  handleTagClick,
  selectedTags,
  heading,
}) => {
  if (!isOpen) return null;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTags = availableTags.filter((tag) => {
    const label = tag?.label;
    return label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg h-[720px] w-1/3 p-4 relative flex flex-col">
        <button
          type="button"
          className="text-end flex justify-end mb-4 top-2 right-2"
          onClick={onClose}
        >
          <RxCross2 className="w-5 h-5 text-gray-700" />
        </button>
        {/* <h2 className="text-xl font-semibold mb-4 text-center">{heading}</h2> */}
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="w-full text-sm border border-gray-400 px-4 py-2 mb-4 rounded-xl outline-none placeholder-gray-900"
        />
        <div className="flex-grow overflow-auto scrollbar-custom mb-4">
          <div className="flex flex-wrap">
            {filteredTags.length > 0 ? (
              filteredTags?.map((tag) => {
                const label = tag?.label;
                return (
                  <div
                    key={label}
                    onClick={() => handleTagClick(tag)}
                    className={`cursor-pointer px-3 py-2 border rounded-lg m-1 text-center ${
                      selectedTags?.label?.includes(label)
                        ? "bg-[#56EC17] text-black"
                        : "bg-tagsBg text-gray-700"
                    }`}
                  >
                    <span>{label}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No tags found</p>
            )}
          </div>
        </div>
        <div className="absolute flex justify-center bottom-0 left-0 w-full bg-white py-4 shadow-md">
          <div className="flex justify-center w-[450px]">
            <AuthSubmitBtn text={"Save"} handleSubmit={() => saveTags()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsModal;
