"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import EventCard from "./EventCard"; // Import your EventCard component

const EventsCarousel = () => {
  // Sample event data
  const events = [
    {
      id: 1,
      imageUrl: "/test-poster.jpeg",
      imageAlt: "Tech conference",
      eventTitle: "Annual Tech Conference",
    },
    {
      id: 2,
      imageUrl: "/test-poster.jpeg",
      imageAlt: "Music festival",
      eventTitle: "Summer Music Festival",
    },
    {
      id: 3,
      imageUrl: "/test-poster.jpeg",
      imageAlt: "Art exhibition",
      eventTitle: "Modern Art Exhibition",
    },
    {
      id: 4,
      imageUrl: "/test-poster.jpeg",
      imageAlt: "Food fair",
      eventTitle: "International Food Fair",
    },
    {
      id: 5,
      imageUrl: "/test-poster.jpeg",
      imageAlt: "Sports tournament",
      eventTitle: "Community Sports Tournament",
    },
    {
      id: 6,
      imageUrl: "/test-poster.jpeg",
      imageAlt: "Book fair",
      eventTitle: "Literary Book Fair",
    },
    {
      id: 7,
      imageUrl: "/test-poster.jpeg",
      imageAlt: "Film premiere",
      eventTitle: "Independent Film Premiere",
    },
  ];

  return (
    <div className=" max-w-7xl mx-auto justify-center items-center">
      <div className="relative">
        <div className="flex items-center">
          {/* African theatre pattern */}
          <div className="hidden md:block w-24 h-16 mr-4">
            <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20,10 Q50,-10 80,10 Q90,30 75,50 Q50,60 25,50 Q10,30 20,10 Z"
                fill="#247373"
                opacity="0.8"
              />

              <path
                d="M30,20 L40,15 L50,25 L60,15 L70,20"
                stroke="#c14600"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="50" cy="35" r="5" fill="#c14600" />
              <path
                d="M35,45 L45,40 L55,50 L65,40"
                stroke="#247373"
                strokeWidth="2"
                fill="none"
              />

              <path d="M15,25 L25,35 L15,45" stroke="#c14600" strokeWidth="2" />
              <path d="M85,25 L75,35 L85,45" stroke="#c14600" strokeWidth="2" />
            </svg>
          </div>

          <h2 className="text-xl font-bold pl-9 pt-12 md:pl-0">
            Upcoming Events
          </h2>

          <div className="md:hidden absolute left-0 top-12 w-8 h-8">
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M5,5 L15,5 L10,15 Z" fill="#247373" opacity="0.6" />
              <circle cx="10" cy="5" r="2" fill="#c14600" />
            </svg>
          </div>
        </div>
      </div>
      <Carousel
        className="w-full py-3 px-4"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 7000,
          }),
        ]}
      >
        <CarouselContent>
          {events.map((event) => (
            <CarouselItem key={event.id} className="basis-1/4 px-2">
              <EventCard
                imageUrl={event.imageUrl}
                imageAlt={event.imageAlt}
                eventTitle={event.eventTitle}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default EventsCarousel;
