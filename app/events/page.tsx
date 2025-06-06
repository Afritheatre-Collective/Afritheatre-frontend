"use client";

import React, { useEffect, useState } from "react";
import EventCard from "@/components/Events/EventCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { Input } from "@/components/ui/input";

interface TheatreActivity {
  _id: string;
  isPublic: boolean;
  date: Date;
  companyName: string;
  sector: "public" | "private";
  companyStatus: "new" | "existing";
  activityType: "performance" | "capacity" | "outreach";
  nature:
    | "frequent-regular"
    | "frequent-irregular"
    | "infrequent-regular"
    | "infrequent-irregular";
  eventName: string;
  county: string;
  venue: string;
  newVenue: string;
  poster?: string;
  totalSessions: string;
  jobsCreated: string;
  indirectJobs: string;
  directJobs: string;
  entryType: "free" | "paid";
  bookingPlatform: string;
  newBookingPlatform: string;
  paymentMethods: string[];
  language: string;
  otherLanguage: string;
  contactPerson: string;
  email: string;
  phone: string;
  notes: string;
}

const PublicVenues = () => {
  const [activities, setActivities] = useState<TheatreActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchPublicActivities = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/theatre-activities/public"
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch data");

        setActivities(data.data || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPublicActivities();
  }, []);

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.companyName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      activity.county.toLowerCase().includes(locationTerm.toLowerCase()) ||
      activity.venue.toLowerCase().includes(locationTerm.toLowerCase());

    const matchesDate = dateFilter
      ? new Date(activity.date).toISOString().split("T")[0] === dateFilter
      : true;

    return matchesSearch && matchesLocation && matchesDate;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled by the useEffect and filteredActivities
  };

  if (loading) return <div className="my-16">Loading events...</div>;
  if (error) return <div className="my-16 text-red-600">Error: {error}</div>;

  return (
    <div className="my-16 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Upcoming Theatre Events
          </h1>
          <p className="mt-2 text-sm text-gray-600 max-w-lg">
            Discover exciting theatre performances, workshops, and cultural
            events happening across the country. From classic plays to
            contemporary productions, find your next theatrical experience here.
          </p>
        </div>
        <Button className="text-white">
          <Link href="/data-collection">Add Event</Link>
        </Button>
      </div>

      {/* Search Bar Section */}
      <form
        onSubmit={handleSearch}
        className="mb-8 p-1 bg-white rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-[#247373] focus-within:border-transparent transition-all duration-200"
      >
        <div className="flex flex-col md:flex-row items-center">
          {/* Combined Input Fields */}
          <div className="flex flex-1 w-full divide-x divide-gray-200">
            {/* Search Event Field */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-[#247373]" />
              </div>
              <Input
                type="text"
                placeholder="Search by event or company..."
                className="pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Search Location Field */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="h-5 w-5 text-[#247373]" />
              </div>
              <Input
                type="text"
                placeholder="Search by location or venue..."
                className="pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Search Button */}
          <Button type="submit" className=" text-white h-full rounded-l-none">
            <FiSearch className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </form>

      {/* Events Data Section */}
      <div className="my-7">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm || locationTerm || dateFilter
                ? "No events match your search criteria"
                : "No upcoming events at the moment. Please check back later."}
            </p>
            {(searchTerm || locationTerm || dateFilter) && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setLocationTerm("");
                  setDateFilter("");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => (
              <EventCard key={activity._id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicVenues;
