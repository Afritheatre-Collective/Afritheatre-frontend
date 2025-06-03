import React from "react";
import VenuesCard from "./VenuesCard"; // Adjust the import path as needed

const VenuesData = () => {
  // Dummy venues data
  const venues = [
    {
      id: 1,
      imageUrl: "/venues/nairobi-cinema.svg",
      title: "Grand Ballroom",
      capacity: 500,
      location: "123 Main St, New York",
    },
    {
      id: 2,
      imageUrl: "/venues/nairobi-cinema.svg",
      title: "Ocean View Terrace",
      capacity: 200,
      location: "456 Beach Blvd, Miami",
    },
    {
      id: 3,
      imageUrl: "/venues/nairobi-cinema.svg",
      title: "Mountain Lodge",
      capacity: 150,
      location: "789 Forest Rd, Denver",
    },
    {
      id: 4,
      imageUrl: "/venues/nairobi-cinema.svg",
      title: "Urban Loft",
      capacity: 100,
      location: "321 Downtown Ave, Chicago",
    },
    {
      id: 5,
      imageUrl: "/venues/nairobi-cinema.svg",
      title: "Garden Pavilion",
      capacity: 300,
      location: "654 Park Lane, Austin",
    },
    {
      id: 6,
      imageUrl: "/venues/nairobi-cinema.svg",
      title: "Rooftop Lounge",
      capacity: 80,
      location: "987 Skyline Dr, Los Angeles",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <VenuesCard
            key={venue.id}
            imageUrl={venue.imageUrl}
            title={venue.title}
            capacity={venue.capacity}
            location={venue.location}
          />
        ))}
      </div>
    </div>
  );
};

export default VenuesData;
