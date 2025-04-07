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
    <Carousel className="w-full py-32">
      opts=
      {{
        align: "start",
        loop: true,
      }}
      plugins=
      {[
        Autoplay({
          delay: 4000,
        }),
      ]}
      <CarouselContent>
        {events.map((event) => (
          <CarouselItem key={event.id} className="basis-1/3 px-2">
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
  );
};

export default EventsCarousel;
