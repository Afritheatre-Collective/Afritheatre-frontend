"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
import Logo from "./Logo";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MobileNav } from "./MobileNav";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* LogoBar */}
      <LogoBar />

      {/* Divider line */}
      <div className="border-t border-gray-200 max-w-7xl mx-auto"></div>

      {/* Navigation Links - Desktop */}
      <nav className="hidden md:block px-4 py-2">
        <NavLinks />
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-center py-2">
        <MobileNav />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-inner">
          <MobileNavLinks />
        </div>
      )}
    </header>
  );
};

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
    console.log("Searching for:", searchQuery);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <div className="relative flex items-center max-w-6xl mx-auto justify-between px-4 py-3 bg-white">
      {/* Left side - Account (hidden on mobile) */}
      <div className="hidden md:flex cursor-pointer items-center space-x-2">
        <FaUserCircle className="text-2xl text-gray-600" />
        <span className="text-sm font-medium">My Account</span>
      </div>

      {/* Center - Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Logo />
      </div>

      {/* Right side - Search (hidden on mobile) */}
      <div className="hidden md:block relative">
        <button
          ref={searchButtonRef}
          onClick={handleSearchClick}
          className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Search"
        >
          <FaSearch className="text-xl cursor-pointer" />
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
                <Button type="submit" className="text-white cursor-pointer">
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

const NavLinks = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/events" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Events
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/resources" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Resources
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/stories" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Stories
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const MobileNavLinks = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Link href="/" className="px-4 py-2 hover:bg-gray-100 rounded">
        Home
      </Link>
      <Link href="/about" className="px-4 py-2 hover:bg-gray-100 rounded">
        About
      </Link>
      <Link href="/events" className="px-4 py-2 hover:bg-gray-100 rounded">
        Events
      </Link>
      <Link href="/resources" className="px-4 py-2 hover:bg-gray-100 rounded">
        Resources
      </Link>
      <Link href="/stories" className="px-4 py-2 hover:bg-gray-100 rounded">
        Stories
      </Link>
      <Link href="/contact" className="px-4 py-2 hover:bg-gray-100 rounded">
        Contact
      </Link>
    </div>
  );
};

export default Header;
