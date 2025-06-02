"use client";

import React, { useEffect, useState } from "react";
import LandingPageStatsCard from "./LandingPageStatsCard";
import {
  FaMapMarkerAlt,
  FaTheaterMasks,
  FaFileAlt,
  FaBlog,
} from "react-icons/fa";

interface TheatreActivity {
  _id: string;
  companyName: string;
  county?: string;
  jobsCreated?: string;
  eventName: string;
}

interface Venue {
  _id: string;
  county: string;
  name: string;
  capacity: number;
}

const LandingPageStats = () => {
  const [theatreData, setTheatreData] = useState<TheatreActivity[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [theatreRes, venuesRes] = await Promise.all([
          fetch("http://localhost:5000/api/theatre-activities"),
          fetch("http://localhost:5000/api/venues"),
        ]);

        const theatreJson = await theatreRes.json();
        const venuesJson = await venuesRes.json();

        if (!theatreRes.ok)
          throw new Error(theatreJson.message || "Failed to fetch events");
        if (!venuesRes.ok)
          throw new Error(venuesJson.message || "Failed to fetch venues");

        setTheatreData(theatreJson.data || []);
        setVenues(Array.isArray(venuesJson) ? venuesJson : []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Fetch error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4">Loading statistics...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  const totalVenues = venues.length;
  const totalEvents = theatreData.length;
  const totalBlogs = 24; // Placeholder
  const totalReports = 15; // Placeholder

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center">
          <div className="relative w-5 h-5 mr-1.5">
            <div className="absolute w-full h-full border-2 border-[#247373] rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#c14600] rounded-full"></div>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-4 bg-[#247373] transform skew-x-12"></div>
            <div className="w-1.5 h-4 bg-[#c14600] transform -skew-x-12"></div>
            <div className="w-1.5 h-4 bg-[#247373] transform skew-x-12"></div>
          </div>
        </div>
        <h2 className="text-xl font-bold text-[#247373]">Live Statistics</h2>
      </div>

      {/* Uniform Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <LandingPageStatsCard
          icon={FaMapMarkerAlt}
          iconColor="text-green-600"
          title="Venues Registered"
          value={totalVenues}
        />
        <LandingPageStatsCard
          icon={FaTheaterMasks}
          iconColor="text-purple-600"
          title="Events Recorded"
          value={totalEvents}
        />
        <LandingPageStatsCard
          icon={FaFileAlt}
          iconColor="text-orange-600"
          title="Reports Generated"
          value={totalReports}
        />
        <LandingPageStatsCard
          icon={FaBlog}
          iconColor="text-blue-600"
          title="Blog Posts"
          value={totalBlogs}
        />
      </div>
    </div>
  );
};

export default LandingPageStats;
