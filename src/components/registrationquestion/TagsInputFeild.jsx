import React, { useEffect, useState } from "react";

import { RiDeleteBin5Line } from "react-icons/ri";
import TagsModal from "./TagsModal";

const TagsInputField = ({
  availableTags,
  heading,
  tagsError,
  tags,
  setTags,
  selectedTags,
  setSelectedTags,
  formData,
  setFormData,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleTagClick = (tag) => {
    if (selectedTags?.value === tag?.value) {
      setSelectedTags(null);
    } else {
      setSelectedTags(tag);
    }
  };

  const saveTags = () => {
    if (selectedTags) {
      setTags([selectedTags]);
    } else {
      setTags([]);
    }
    closeModal();
  };

  const removeTag = () => {
    setTags([]);
    setSelectedTags(null);
  };

  return (
    <div
      className={`flex items-end border ${
        tagsError && (tags?.length === 0 || tags === null)
          ? "border-red-500"
          : "border-gray-400"
      } text-sm rounded-lg overflow-hidden p-[1px]`}
    >
      <div className="flex flex-wrap p-0.5 w-[80%]  ">
        {tags?.length > 0 ? (
          tags?.map((tag) => {
            return (
              <span
                key={tag}
                className="flex items-center bg-tagsBg text-gray-700 px-3 py-2 rounded-lg mr-1 mb-0.5"
              >
                {tag?.label}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-red-500 focus:outline-none"
                >
                  <RiDeleteBin5Line />
                </button>
              </span>
            );
          })
        ) : (
          <span className="text-gray-700 flex items-center ml-2 pb-2">
            Select your answer
          </span>
        )}
      </div>
      <div className="flex items-start h-full justify-end w-[20%] ">
        <button
          type="button"
          onClick={openModal}
          className="bg-[#012C57] text-white p-2 rounded-lg"
        >
          <svg
            className="h-6 w-6 mb-[1px] p-[2px]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 5a1 1 0 00-1 1v3H6a1 1 0 000 2h3v3a1 1 0 002 0V11h3a1 1 0 100-2h-3V6a1 1 0 00-1-1z" />
          </svg>
        </button>
      </div>
      <TagsModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        saveTags={saveTags}
        tags={tags}
        handleTagClick={handleTagClick}
        availableTags={availableTags}
        heading={heading}
        selectedTags={selectedTags}
      />
    </div>
  );
};

export default TagsInputField;
