"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FaHouseUser, FaMapLocationDot } from "react-icons/fa6";

interface Venue {
  _id: string;
  county: string;
  subCounty?: string;
  area?: string;
  name: string;
  capacity: number;
  mapLink?: string;
}

type VenuesCardProps = {
  name: string;
  county: string;
  subCounty?: string;
  area?: string;
  capacity: number;
  mapLink?: string;
};

const VenuesCard = ({
  name,
  county,
  subCounty,
  area,
  capacity,
  mapLink,
}: VenuesCardProps) => {
  return (
    <Card className="w-full overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <CardDescription className="flex items-center gap-2">
          <FaMapLocationDot />
          {county}
          {subCounty && `, ${subCounty}`}
          {area && `, ${area}`}
        </CardDescription>
        <CardDescription className="flex items-center gap-2">
          <FaHouseUser />
          Capacity: {capacity.toLocaleString()} people
        </CardDescription>
        {mapLink && (
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center gap-2"
          >
            <FaMapLocationDot />
            View on Map
          </a>
        )}
      </CardContent>
    </Card>
  );
};

const VenuesPage = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicVenues = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/venues/public");
        const data = await res.json();
        setVenues(data);
      } catch (err) {
        console.error("Error fetching public venues:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicVenues();
  }, []);

  if (loading) return <div className="p-4">Loading public venues...</div>;
  return (
    <div className=" my-16 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
          <Link href="/add-venue">Add Venue</Link>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {venues.map((venue) => (
            <VenuesCard
              key={venue._id}
              name={venue.name}
              county={venue.county}
              subCounty={venue.subCounty}
              area={venue.area}
              capacity={venue.capacity}
              mapLink={venue.mapLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenuesPage;
