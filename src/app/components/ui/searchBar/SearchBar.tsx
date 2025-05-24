"use client";

import { useState } from "react";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div
      data-animate
      data-animate-delay="1.5"
      className="flex justify-center mt-8 opacity-0"
    >
      <div className="relative w-10/12 lg:w-full max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search Pokémon..."
          className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors duration-200 bg-white shadow-sm"
        />
      </div>
    </div>
  );
};
