import VenuesData from "@/components/Venues/VenuesData";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { Input } from "@/components/ui/input";

const VenuesPage = () => {
  return (
    <div className="my-7 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Venues Recorded</h1>
          <p className="mt-2 text-sm text-gray-600 max-w-lg">
            Discover our beautiful event spaces perfect for any occasion. From
            intimate gatherings to large celebrations, we have the perfect venue
            for you.
          </p>
        </div>
        <Button className=" text-white">
          <Link href="/venues/add">Add Venue</Link>
        </Button>
      </div>

      {/* Search Bar Section */}
      <div className="mb-8 p-1 bg-white rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-[#247373] focus-within:border-transparent transition-all duration-200">
        <div className="flex flex-col md:flex-row items-center">
          {/* Combined Input Fields */}
          <div className="flex flex-1 w-full divide-x divide-gray-200">
            {/* Search Name Field */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-[#247373]" />
              </div>
              <Input
                type="text"
                placeholder="Search by venue name..."
                className="pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none"
              />
            </div>

            {/* Search Location Field */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="h-5 w-5 text-[#247373]" />
              </div>
              <Input
                type="text"
                placeholder="Search by location..."
                className="pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-l-none"
              />
            </div>
          </div>

          {/* Search Button */}
          <Button className="bg-[#247373] hover:bg-[#1A5F5F] text-white h-full rounded-l-none">
            <FiSearch className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Venues Data Section */}
      <div className="my-7">
        <VenuesData />
      </div>
    </div>
  );
};

export default VenuesPage;
