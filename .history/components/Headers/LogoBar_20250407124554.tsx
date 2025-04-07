"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import Logo from "./Logo";
import { Button } from "../ui/button";

const LogoBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside both the modal and the search button
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    // Add event listener when the modal is open
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <div className="relative flex items-center justify-between px-4 py-3 bg-white">
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
          ref={searchButtonRef}
          onClick={handleSearchClick}
          className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Search"
        >
          <FaSearch className="text-xl" />
        </button>

        {/* Search Modal */}
        {isSearchOpen && (
          <div
            ref={modalRef}
            className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10"
          >
            <form onSubmit={handleSearchSubmit} className="p-2">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#c14600]"
                  autoFocus
                />
                <Button type="submit" className="text-white">
                  Search
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoBar;
