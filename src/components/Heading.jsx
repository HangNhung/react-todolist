import React, { useState } from "react";
import { VscSearch } from "react-icons/vsc";
import { FiX } from "react-icons/fi";

const Heading = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-blue-600 flex justify-between h-12 items-center px-8 py-4">
      <p className="font-bold text-white">To Do</p>
      <div className="h-8 w-96 flex items-center rounded bg-white">
        <VscSearch className="mx-2" />
        <input
          className="flex-1 "
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
        />
        {searchQuery && (
          <FiX className="mx-2 cursor-pointer" onClick={clearSearchQuery} />
        )}
      </div>
      <div className="w-12"></div>
    </div>
  );
};

export default Heading;
