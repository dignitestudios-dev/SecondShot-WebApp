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

  const filteredTags = availableTags.filter((tag) =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-h-[680px] w-1/3 p-4 relative">
        <button
          type="button"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <RxCross2 className="w-5 h-5 text-gray-700" />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">{heading}</h2>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="w-[96%] text-sm border border-gray-400 px-4 py-2 my-2 rounded-xl outline-none placeholder-gray-900"
        />
        <div className="max-h-[540px] overflow-auto scrollbar-custom">
          <div className="flex flex-wrap">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <div
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`w-auto cursor-pointer px-3 py-2 border rounded-lg m-1 text-center ${
                    selectedTags.includes(tag)
                      ? "bg-[#56EC17] text-black"
                      : "bg-tagsBg text-gray-700"
                  }`}
                >
                  <span>{tag}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-[100px]">
            <p className="text-gray-500 text-center">No tags found</p>
          </div>
            )}
          </div>
          <div className="mt-4 flex justify-center">
            <div className="w-full">
              <AuthSubmitBtn text={"Save"} handleSubmit={() => saveTags()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsModal;
