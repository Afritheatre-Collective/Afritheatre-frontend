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
      <div className="flex items-center pl-9 pt-12 md:pl-0">
        <h2 className="text-xl font-bold">Upcoming Events</h2>
        <div className="ml-4 flex items-center space-x-1">
          <div className="h-3 w-1 bg-[#247373]"></div>
          <div className="h-4 w-1 bg-[#247373]"></div>
          <div className="h-5 w-1 bg-[#247373]"></div>
          <div className="h-4 w-1 bg-[#247373]"></div>
          <div className="h-3 w-1 bg-[#247373]"></div>
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
