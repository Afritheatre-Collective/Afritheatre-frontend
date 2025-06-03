"use client";
import React, { useEffect, useState } from "react";

interface Venue {
  _id: string;
  county: string;
  subCounty?: string;
  area?: string;
  name: string;
  capacity: number;
  mapLink?: string;
}

const PublicVenues = () => {
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Public Venues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {venues.map((venue) => (
          <div key={venue._id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{venue.name}</h2>
            <p className="text-gray-600">{venue.county}</p>
            {venue.subCounty && <p>Sub-County: {venue.subCounty}</p>}
            {venue.area && <p>Area: {venue.area}</p>}
            <p>Capacity: {venue.capacity.toLocaleString()}</p>
            {venue.mapLink && (
              <a
                href={venue.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View on Map
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicVenues;
