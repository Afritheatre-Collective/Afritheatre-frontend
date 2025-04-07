"use client";
import React, { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import Logo from "./Logo";
import { Button } from "../ui/button";

const LogoBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative flex items-center justify-between px-4 py-3 bg-white shadow-md">
      {/* Left side - Account */}
      <div className="flex items-center space-x-2">
        <FaUserCircle className="text-2xl text-gray-600" />
        <span className="text-sm font-medium">My Account</span>
      </div>

      {/* Center - Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Logo />
      </div>

      {/* Right side - Search */}
      <div className="relative">
        <button
          onClick={handleSearchClick}
          className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Search"
        >
          <FaSearch className="text-xl" />
        </button>

        {/* Search Modal */}
        {isSearchOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
            <form onSubmit={handleSearchSubmit} className="p-2">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
                <Button type="submit">Search</Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoBar;
